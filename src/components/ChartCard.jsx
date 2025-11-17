import Card from './Card'

function ChartCard({ title, children, className = '' }) {
  return (
    <Card className={className}>
      <h3 className="text-lg font-semibold text-slate-900 mb-6">{title}</h3>
      <div className="h-64">
        {children}
      </div>
    </Card>
  )
}

export default ChartCard

