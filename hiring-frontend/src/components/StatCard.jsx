export default function StatCard({ title, value, subtitle, accent = 'var(--accent)' }) {
  return (
    <div className="glass hover-glow animate-fade-in" style={{
      borderRadius: '24px', padding: '28px',
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      minHeight: '160px',
    }}>
      {/* Decorative Blur */}
      <div style={{
        position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px',
        background: accent, filter: 'blur(40px)', opacity: 0.15, pointerEvents: 'none',
      }}></div>
      
      {/* Accent Line */}
      <div style={{
        position: 'absolute', top: '24px', left: 0, width: '4px', height: '32px',
        background: accent, borderRadius: '0 4px 4px 0',
        boxShadow: `0 0 15px ${accent}`,
      }}></div>

      <div>
        <div style={{ 
          fontSize: '11px', color: 'var(--muted)', fontWeight: '800', 
          textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px',
          paddingLeft: '4px'
        }}>{title}</div>
        <div className="text-gradient" style={{ 
          fontSize: '42px', fontWeight: '800', lineHeight: 1, 
          letterSpacing: '-1.5px' 
        }}>{value}</div>
      </div>
      
      {subtitle && (
        <div style={{ 
          fontSize: '12px', color: 'var(--muted)', marginTop: '20px', 
          fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' 
        }}>
          <span style={{ color: 'var(--accent2)' }}>↑</span> {subtitle}
        </div>
      )}
    </div>
  )
}