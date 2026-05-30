type Props = {
  loading?: boolean;
  text: string
}

export default function Button({
  loading = false,
  text
}: Props) {
  return <button
    type="submit"
    disabled={loading}
    className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-hero text-primary-foreground px-5 py-3.5 text-sm font-medium shadow-glow hover:shadow-elevated transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
  >
    {loading ? (
      <>
        <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
        Autenticando…
      </>
    ) : (
      <>
        {text}
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </>
    )}
  </button>
}