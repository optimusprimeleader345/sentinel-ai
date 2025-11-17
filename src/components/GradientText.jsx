function GradientText({ children, className = '' }) {
  return (
    <span className={`neon-text ${className}`}>
      {children}
    </span>
  )
}

export default GradientText

