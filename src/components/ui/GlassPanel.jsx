function GlassPanel({ className = '', children }) {
  return (
    <div
      className={`rounded-[1.75rem] border border-white/10 bg-white/[0.05] shadow-[0_22px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl ${className}`}
    >
      {children}
    </div>
  )
}

export default GlassPanel
