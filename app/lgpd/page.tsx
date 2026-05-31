import Link from "next/link";
import Navbar from "@/components/home/navbar";
import Rodape from "@/components/home/rodape";
import info from "@/config/app.info";

export default function LgpdPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 pt-32 pb-16">
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-mono">Institucional</div>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl leading-[1.02]">
          Política de Privacidade e LGPD
        </h1>

        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
          O {info.name} trata dados pessoais com a máxima seriedade e transparência. Esta política descreve como coletamos, usamos, armazenamos e protegemos suas informações em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018).
        </p>

        <div className="mt-10 grid sm:grid-cols-3 gap-4 mb-12">
          {["Finalidade clara", "Acesso controlado", "Rastreabilidade"].map((item) => (
            <div key={item} className="rounded-2xl border border-border bg-card p-5 text-sm font-medium shadow-soft text-center flex items-center justify-center">
              {item}
            </div>
          ))}
        </div>

        <div className="space-y-10 text-muted-foreground leading-relaxed">

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">1. Quais dados coletamos?</h2>
            <p className="mb-3">Durante a utilização da nossa plataforma, seja no cadastro ou na submissão de projetos ambientais, podemos coletar os seguintes dados:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>**Dados de Identificação:** Nome completo, CPF, RG e cargo (representantes legais).</li>
              <li>**Dados de Contato:** E-mail e telefone.</li>
              <li>**Dados de Navegação:** Logs de acesso, endereço IP e cookies essenciais para o funcionamento do sistema.</li>
            </ul>
          </section>

          <hr className="border-border" />

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">2. Para que utilizamos seus dados?</h2>
            <p className="mb-4">O tratamento dos seus dados é realizado estritamente para garantir o funcionamento seguro e transparente dos processos seletivos. As principais finalidades incluem:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-border text-foreground">
                    <th className="py-3 px-4 font-medium">Finalidade</th>
                    <th className="py-3 px-4 font-medium">Base Legal (LGPD)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Cadastro, submissão e avaliação de projetos ambientais</td>
                    <td className="py-3 px-4">Execução de contrato / Procedimentos preliminares</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Auditoria, monitoramento e prestação de contas</td>
                    <td className="py-3 px-4">Cumprimento de obrigação legal ou regulatória</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Comunicação sobre o andamento dos editais</td>
                    <td className="py-3 px-4">Legítimo interesse</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <hr className="border-border" />

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">3. Compartilhamento e Transparência</h2>
            <p>
              Em regra, o {info.name} **não comercializa ou compartilha** seus dados pessoais com terceiros para fins publicitários. O compartilhamento ocorre exclusivamente com:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
              <li>Comissões de avaliação e auditorias independentes designadas para análise dos projetos.</li>
              <li>Órgãos de controle governamentais, quando exigido por lei.</li>
              <li>Plataformas de transparência (apenas dados públicos do projeto e da pessoa jurídica aprovada, resguardando informações pessoais sensíveis).</li>
            </ul>
          </section>

          <hr className="border-border" />

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">4. Segurança da Informação</h2>
            <p>
              O acesso aos painéis internos e aos dados submetidos é rigorosamente limitado. Utilizamos perfis de autorização criptografados e controle de acesso baseado em funções (Role-Based Access Control) para garantir que apenas usuários autorizados visualizem informações sensíveis. Todos os dados são armazenados em servidores seguros com tecnologias atualizadas de proteção.
            </p>
          </section>

          <hr className="border-border" />

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">5. Seus Direitos</h2>
            <p className="mb-3">Como titular dos dados, a LGPD garante a você os seguintes direitos:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>**Confirmação e Acesso:** Saber quais dados seus nós possuímos.</li>
              <li>**Retificação:** Corrigir dados incompletos, inexatos ou desatualizados.</li>
              <li>**Anonimização ou Bloqueio:** Restringir o uso de dados desnecessários.</li>
              <li>**Eliminação:** Solicitar a exclusão dos dados (exceto quando a retenção for obrigatória por lei, como em prestações de contas de projetos financiados).</li>
            </ul>
            <p className="mt-4">
              Para exercer seus direitos, entre em contato com nosso Encarregado de Proteção de Dados (DPO) através do e-mail de suporte institucional.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex items-center justify-center sm:justify-start">
          <Link
            href="/"
            className="inline-flex rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-secondary hover:text-foreground transition-colors"
          >
            Voltar ao início
          </Link>
        </div>
      </main>
      <Rodape />
    </div>
  );
}