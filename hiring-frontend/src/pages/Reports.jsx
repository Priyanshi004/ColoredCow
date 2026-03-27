import { useEffect, useState, useRef } from 'react'
import api from '../api/axios'
import StatCard from '../components/StatCard'

export default function Reports() {
  const [data, setData] = useState(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    api.get('/api/reports').then(res => setData(res.data))
  }, [])

  useEffect(() => {
    if (data && data.job_trend && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      const labels = data.job_trend.map(item => item.title)
      const values = data.job_trend.map(item => item.count)
      const max = Math.max(...values, 5)

      ctx.clearRect(0, 0, 800, 300)
      
      const barWidth = 60
      const gap = 40
      const startX = 60

      labels.forEach((label, i) => {
        const h = (values[i] / max) * 200
        const x = startX + i * (barWidth + gap)
        const y = 250 - h

        const grad = ctx.createLinearGradient(0, y, 0, 250)
        grad.addColorStop(0, '#8b5cf6')
        grad.addColorStop(1, 'rgba(139, 92, 246, 0.1)')

        ctx.fillStyle = grad
        ctx.beginPath()
        if (ctx.roundRect) {
          ctx.roundRect(x, y, barWidth, h, [12, 12, 0, 0])
        } else {
          ctx.rect(x, y, barWidth, h) // Fallback
        }
        ctx.fill()

        ctx.fillStyle = '#94a3b8'
        ctx.font = 'bold 11px "DM Sans", sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(label.length > 10 ? label.substring(0, 8) + '...' : label, x + barWidth/2, 275)
        
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 14px "DM Sans", sans-serif'
        ctx.fillText(values[i], x + barWidth/2, y - 12)
      })
      
      ctx.strokeStyle = 'rgba(255,255,255,0.05)'
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(40, 250)
      ctx.lineTo(760, 250)
      ctx.stroke()
    }
  }, [data])

  if (!data) return <div style={{ padding: '60px', textAlign: 'center', color: 'var(--muted)', fontWeight: '600' }}>GENERATING INSIGHTS...</div>

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '48px' }}>
        <h1 className="text-gradient" style={{ fontSize: '36px', fontWeight: '900', margin: '0 0 12px', letterSpacing: '-1.5px' }}>Hiring Analytics</h1>
        <p style={{ color: 'var(--muted)', fontSize: '16px' }}>Performance metrics and volume trends across departments.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        <StatCard title="Throughput" value={`${data.avg_action_hours || 0}h`} subtitle="Avg Action Time" accent="var(--accent)" />
        <StatCard title="Pipeline Yield" value="84%" subtitle="+12% from last month" accent="var(--accent2)" />
        <StatCard title="Candidate NPS" value="9.2" subtitle="Experience Score" accent="var(--warn)" />
      </div>

      <div className="glass" style={{ padding: '40px', borderRadius: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'white', marginBottom: '40px' }}>Application Volume Trend</h2>
        <div style={{ background: 'rgba(0,0,0,0.1)', borderRadius: '24px', padding: '20px', overflowX: 'auto' }}>
          <canvas ref={canvasRef} width="800" height="300" style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }}></canvas>
        </div>
      </div>
    </div>
  )
}