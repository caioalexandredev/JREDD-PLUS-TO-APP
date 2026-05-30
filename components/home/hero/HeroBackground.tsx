export default function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-mesh pointer-events-none" />
      <div className="absolute -top-40 -right-40 h-160 w-160 rounded-full bg-leaf/20 blur-3xl animate-float-slow" />
      <div className="absolute -bottom-40 -left-20 h-144 w-xl rounded-full bg-ocean/20 blur-3xl animate-float-slow" style={{ animationDelay: "-7s" }} />
    </>
  )
}