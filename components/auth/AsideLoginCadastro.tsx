import info from "@/config/app.info";
import pages from "@/config/pages.consts";
import DemonstrationTable, { IDemonstrationTableValues } from "@/libs/table/DemonstrationTable";
import Link from "next/link";

const INFORMATIVOS_ASIDE_LOGIN: IDemonstrationTableValues[] = [
	{ l: "Projetos ativos", v: "237" },
	{ l: "tCO₂e evitado", v: "148k" },
	{ l: "Municípios", v: "78" },
];

export default function AsideLoginCadastro() {
	return <aside className="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-hero text-primary-foreground overflow-hidden grain">
		<Link href={pages.home.path} className="relative flex items-center gap-2 w-fit">
			<span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/15 backdrop-blur">
				<svg viewBox="0 0 24 24" className="h-4 w-4 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M2 12h20" strokeLinecap="round" /></svg>
			</span>
			<span className="font-display text-2xl tracking-tight">{info.name}</span>
		</Link>

		<div className="relative">
			<div className="text-[10px] uppercase tracking-[0.22em] opacity-60 font-mono">● Programa REDD+ 2026</div>
			<h1 className="mt-6 font-display text-5xl xl:text-6xl leading-[0.95] tracking-[-0.02em]">
				Bem-vindo de volta à plataforma que <em className="bg-linear-to-r from-mist via-background to-mist bg-clip-text text-transparent not-italic">restaura o Cerrado</em>.
			</h1>
			<p className="mt-6 max-w-md text-primary-foreground/75 leading-relaxed">
				Entre para acompanhar seus projetos, submeter novas propostas e visualizar pareceres em tempo real.
			</p>

			<DemonstrationTable values={INFORMATIVOS_ASIDE_LOGIN} />
		</div>

		<div className="relative text-xs opacity-60 font-mono">
			{info.footer}
		</div>
	</aside>
}