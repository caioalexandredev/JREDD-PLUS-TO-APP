import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import Field from "@/libs/fields/Field";
import { api, uploadDocumento, User } from "@/libs/api";
import info from "@/config/app.info";

type Option = {
  id: number;
  codigo: string;
  nome: string;
};

type DocumentoEnviado = {
  id: string;
  nomeOriginal: string;
};

type CriterioForm = {
  nome: string;
  descricao: string;
};

type FormState = {
  titulo: string;
  frenteAtuacaoId: string;
  regiaoImediataId: string;
  orgaoProponenteId: string;
  valorMinimo: string;
  valorMaximo: string;
  inicioRecebimentoPropostas: string;
  fimRecebimentoPropostas: string;
  resumo: string;
};

export default function NovoEditalModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [form, setForm] = useState<FormState>({
    titulo: "",
    frenteAtuacaoId: "",
    regiaoImediataId: "",
    orgaoProponenteId: "",
    valorMinimo: "",
    valorMaximo: "",
    inicioRecebimentoPropostas: "",
    fimRecebimentoPropostas: "",
    resumo: "",
  });
  const [frentes, setFrentes] = useState<Option[]>([]);
  const [regioes, setRegioes] = useState<Option[]>([]);
  const [orgaos, setOrgaos] = useState<Option[]>([]);
  const [avaliadores, setAvaliadores] = useState<User[]>([]);
  const [avaliadoresIds, setAvaliadoresIds] = useState<number[]>([]);
  const [criterios, setCriterios] = useState<CriterioForm[]>([
    { nome: "Impacto ambiental", descricao: "Potencial de impacto ambiental positivo do projeto." },
    { nome: "Viabilidade tecnica", descricao: "Clareza do plano de trabalho, equipe e cronograma." },
    { nome: "Transparencia", descricao: "Capacidade de comprovar a execucao com evidencias." },
  ]);
  const [documentos, setDocumentos] = useState<DocumentoEnviado[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([
      api<Option[]>("/frentes-atuacao"),
      api<Option[]>("/regioes-imediatas"),
      api<Option[]>("/orgaos-proponentes"),
      api<User[]>("/users/perfil?profile=AVALIADOR"),
    ])
      .then(([frentesData, regioesData, orgaosData, avaliadoresData]) => {
        setFrentes(frentesData);
        setRegioes(regioesData);
        setOrgaos(orgaosData);
        setAvaliadores(avaliadoresData);
        setForm((current) => ({
          ...current,
          frenteAtuacaoId: current.frenteAtuacaoId || String(frentesData[0]?.id ?? ""),
          regiaoImediataId: current.regiaoImediataId || String(regioesData[0]?.id ?? ""),
          orgaoProponenteId: current.orgaoProponenteId || String(orgaosData[0]?.id ?? ""),
        }));
      })
      .catch(() => toast.error("Nao foi possivel carregar os dados do formulario."))
      .finally(() => setLoadingOptions(false));
  }, []);

  const criteriosValidos = useMemo(
    () => criterios.filter((criterio) => criterio.nome.trim()),
    [criterios],
  );

  const update = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const updateCriterio = (index: number, key: keyof CriterioForm, value: string) =>
    setCriterios((items) => items.map((item, i) => i === index ? { ...item, [key]: value } : item));
  const addCriterio = () => setCriterios((items) => [...items, { nome: "", descricao: "" }]);
  const removeCriterio = (index: number) => setCriterios((items) => items.filter((_, i) => i !== index));

  const toggleAvaliador = (id: number) => {
    setAvaliadoresIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const uploadArquivos = async (files: FileList | null) => {
    if (!files?.length) return;
    try {
      setSubmitting(true);
      const enviados = await Promise.all(Array.from(files).map((file) => uploadDocumento(file, "EDITAL")));
      setDocumentos((current) => [...current, ...enviados.map((documento) => ({
        id: documento.id,
        nomeOriginal: documento.nomeOriginal,
      }))]);
      toast.success("Documento enviado.");
    } catch {
      toast.error("Nao foi possivel enviar o documento.");
    } finally {
      setSubmitting(false);
    }
  };

  const validate = () => {
    const valorMinimo = Number(form.valorMinimo);
    const valorMaximo = Number(form.valorMaximo);

    if (!form.titulo.trim() || !form.resumo.trim()) return "Informe titulo e resumo.";
    if (!form.frenteAtuacaoId || !form.regiaoImediataId || !form.orgaoProponenteId) return "Selecione frente, regiao e orgao proponente.";
    if (!form.inicioRecebimentoPropostas || !form.fimRecebimentoPropostas) return "Informe o periodo de inscricoes.";
    if (!valorMinimo || !valorMaximo) return "Informe valor minimo e valor maximo.";
    if (valorMinimo > valorMaximo) return "Valor minimo nao pode ser maior que o valor maximo.";
    if (form.inicioRecebimentoPropostas > form.fimRecebimentoPropostas) return "Inicio das inscricoes nao pode ser posterior ao fim.";
    if (avaliadoresIds.length === 0) return "Selecione ao menos um avaliador.";
    if (criteriosValidos.length === 0) return "Cadastre ao menos um criterio de avaliacao.";
    if (documentos.length === 0) return "Envie ao menos um documento do edital.";
    return null;
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      setSubmitting(true);
      await api("/editais", {
        method: "POST",
        body: JSON.stringify({
          titulo: form.titulo.trim(),
          frenteAtuacaoId: Number(form.frenteAtuacaoId),
          regiaoImediataId: Number(form.regiaoImediataId),
          orgaoProponenteId: Number(form.orgaoProponenteId),
          avaliadoresIds,
          criterios: criteriosValidos.map((criterio, index) => ({
            nome: criterio.nome.trim(),
            descricao: criterio.descricao.trim(),
            ordem: index + 1,
          })),
          documentosIds: documentos.map((documento) => documento.id),
          valorMinimo: Number(form.valorMinimo),
          valorMaximo: Number(form.valorMaximo),
          inicioRecebimentoPropostas: form.inicioRecebimentoPropostas,
          fimRecebimentoPropostas: form.fimRecebimentoPropostas,
          resumo: form.resumo.trim(),
        }),
      });
      toast.success("Edital cadastrado com sucesso.");
      onCreated();
    } catch {
      toast.error("Nao foi possivel cadastrar o edital.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 h-full" onClick={onClose}>
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-card border border-border rounded-3xl shadow-elevated overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-border flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-mono"><span className="text-destructive">●</span> Cadastro de edital</div>
            <h2 className="mt-2 font-display text-2xl tracking-[-0.01em]">Novo edital {info.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">Cadastre a chamada com criterios, avaliadores e documentos oficiais.</p>
          </div>
          <button onClick={onClose} className="h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-secondary transition-colors">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" /></svg>
          </button>
        </div>

        <form onSubmit={submit} className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          {loadingOptions && <div className="rounded-xl bg-secondary/50 border border-border px-4 py-3 text-sm text-muted-foreground">Carregando dados do formulario...</div>}

          <Field label="Titulo do edital">
            <input required value={form.titulo} onChange={(e) => update("titulo", e.target.value)} className={inputCls} placeholder="Ex.: Recuperacao de nascentes - Bacia do Tocantins" />
          </Field>

          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Frente de atuacao">
              <select required value={form.frenteAtuacaoId} onChange={(e) => update("frenteAtuacaoId", e.target.value)} className={inputCls}>
                {frentes.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}
              </select>
            </Field>
            <Field label="Regiao imediata">
              <select required value={form.regiaoImediataId} onChange={(e) => update("regiaoImediataId", e.target.value)} className={inputCls}>
                {regioes.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}
              </select>
            </Field>
            <Field label="Orgao proponente">
              <select required value={form.orgaoProponenteId} onChange={(e) => update("orgaoProponenteId", e.target.value)} className={inputCls}>
                {orgaos.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}
              </select>
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Field label="Valor minimo">
              <input required type="number" min="0.01" step="0.01" value={form.valorMinimo} onChange={(e) => update("valorMinimo", e.target.value)} className={inputCls} placeholder="500000" />
            </Field>
            <Field label="Valor maximo">
              <input required type="number" min="0.01" step="0.01" value={form.valorMaximo} onChange={(e) => update("valorMaximo", e.target.value)} className={inputCls} placeholder="1500000" />
            </Field>
            <Field label="Inicio das inscricoes">
              <input required type="date" value={form.inicioRecebimentoPropostas} onChange={(e) => update("inicioRecebimentoPropostas", e.target.value)} className={inputCls} />
            </Field>
            <Field label="Fim das inscricoes">
              <input required type="date" value={form.fimRecebimentoPropostas} onChange={(e) => update("fimRecebimentoPropostas", e.target.value)} className={inputCls} />
            </Field>
          </div>

          <Field label="Resumo">
            <textarea required rows={4} value={form.resumo} onChange={(e) => update("resumo", e.target.value)} className={inputCls + " resize-none"} placeholder="Breve descricao da chamada, escopo e publico-alvo." />
          </Field>

          <section className="rounded-2xl border border-border bg-secondary/25 p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Avaliadores</div>
            <div className="grid sm:grid-cols-2 gap-2">
              {avaliadores.map((avaliador) => (
                <label key={avaliador.id} className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm">
                  <input type="checkbox" checked={avaliadoresIds.includes(avaliador.id)} onChange={() => toggleAvaliador(avaliador.id)} className="h-4 w-4 accent-leaf" />
                  <span>{avaliador.nome}</span>
                </label>
              ))}
              {avaliadores.length === 0 && <div className="text-sm text-muted-foreground">Nenhum avaliador encontrado.</div>}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-secondary/25 p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Criterios de avaliacao</div>
                <p className="text-xs text-muted-foreground mt-1">Cada criterio recebera uma nota de 1 a 10 pelos avaliadores.</p>
              </div>
              <button type="button" onClick={addCriterio} className="rounded-full border border-border bg-card px-3 py-2 text-xs hover:bg-secondary transition-colors">Adicionar</button>
            </div>

            <div className="space-y-3">
              {criterios.map((criterio, index) => (
                <div key={index} className="rounded-xl border border-border bg-card p-3">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-secondary text-xs font-mono text-muted-foreground flex items-center justify-center shrink-0">{index + 1}</div>
                    <div className="grid sm:grid-cols-12 gap-3 flex-1">
                      <div className="sm:col-span-5">
                        <label className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-mono">Nome</label>
                        <input required value={criterio.nome} onChange={(e) => updateCriterio(index, "nome", e.target.value)} className={inputCls + " mt-1"} placeholder="Ex.: Impacto ambiental" />
                      </div>
                      <div className="sm:col-span-7">
                        <label className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-mono">Descricao</label>
                        <input value={criterio.descricao} onChange={(e) => updateCriterio(index, "descricao", e.target.value)} className={inputCls + " mt-1"} placeholder="O que sera observado neste criterio" />
                      </div>
                    </div>
                    {criterios.length > 1 && (
                      <button type="button" onClick={() => removeCriterio(index)} className="h-8 w-8 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors shrink-0">
                        <svg className="h-4 w-4 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" /></svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-secondary/25 p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Documentos do edital</div>
                <p className="text-xs text-muted-foreground mt-1">Envie ao menos um documento oficial.</p>
              </div>
              <input type="file" accept="application/pdf,.pdf,.doc,.docx" multiple onChange={(e) => uploadArquivos(e.target.files)} className="text-sm max-w-full" disabled={submitting} />
            </div>
            <div className="space-y-2">
              {documentos.map((documento) => (
                <div key={documento.id} className="flex items-center justify-between gap-3 rounded-xl bg-card border border-border px-3 py-2 text-sm">
                  <span className="truncate">{documento.nomeOriginal}</span>
                  <button type="button" onClick={() => setDocumentos((items) => items.filter((item) => item.id !== documento.id))} className="text-xs text-muted-foreground hover:text-foreground">Remover</button>
                </div>
              ))}
            </div>
          </section>

          <div className="p-4 border-t border-border bg-secondary/30 flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm rounded-full hover:bg-secondary transition-colors">Cancelar</button>
            <button type="submit" disabled={submitting || loadingOptions} className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2 text-sm font-medium hover:bg-foreground/90 transition-all disabled:opacity-50">
              {submitting ? "Salvando..." : "Cadastrar edital"}
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

const inputCls = "w-full px-3 py-2.5 rounded-xl bg-secondary/60 border border-transparent text-sm focus:outline-none focus:border-ocean focus:bg-card transition-all";
