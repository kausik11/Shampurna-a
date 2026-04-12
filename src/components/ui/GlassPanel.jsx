function GlassPanel({ className = '', children, ...props }) {
  return (
    <div
      className={`rounded-[1.25rem] border border-white/12 bg-[rgba(1,0,2,0.44)] shadow-[0_22px_60px_rgba(1,0,2,0.34)] backdrop-blur-2xl sm:rounded-[1.75rem] ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default GlassPanel
