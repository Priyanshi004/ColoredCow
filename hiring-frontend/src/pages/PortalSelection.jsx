import { useNavigate } from 'react-router-dom'

export default function PortalSelection() {
  const navigate = useNavigate()

  return (
    <div style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
      position: 'relative', overflow: 'hidden', padding: '80px 20px'
    }}>
      {/* Background Blobs */}
      <div style={{ position: 'absolute', top: '15%', left: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '15%', right: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0 }}></div>

      <div className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '60px', zIndex: 10 }}>
        <h1 className="text-gradient" style={{ fontSize: '56px', fontWeight: '900', margin: '0 0 16px', letterSpacing: '-2px' }}>
          Choose Your Portal
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', fontWeight: '500', maxWidth: '500px', margin: '0 auto' }}>
          Welcome back. Select the appropriate portal to continue your journey.
        </p>
      </div>

      <div style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '32px', width: '100%', maxWidth: '900px', zIndex: 10 
      }}>
        {/* Candidate Portal */}
        <div className="glass hover-glow animate-fade-in" onClick={() => navigate('/apply')} style={{ 
          padding: '48px 40px', borderRadius: '32px', cursor: 'pointer', textAlign: 'center'
        }}>
          <div style={{ 
            fontSize: '48px', marginBottom: '24px', display: 'inline-block',
            padding: '20px', borderRadius: '24px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent2)'
          }}>󰈙</div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', marginBottom: '16px' }}>Candidate Portal</h2>
          <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '32px' }}>
            Looking for your next big challenge? Browse our open positions and submit your application today.
          </p>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', 
            background: 'var(--accent2)', color: 'white', padding: '12px 24px', borderRadius: '14px', fontWeight: '700' 
          }}>Apply Now →</div>
        </div>

        {/* HR Suite */}
        <div className="glass hover-glow animate-fade-in" onClick={() => navigate('/login')} style={{ 
          padding: '48px 40px', borderRadius: '32px', cursor: 'pointer', textAlign: 'center'
        }}>
          <div style={{ 
            fontSize: '48px', marginBottom: '24px', display: 'inline-block',
            padding: '20px', borderRadius: '24px', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent)'
          }}>󰕒</div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', marginBottom: '16px' }}>HR Management</h2>
          <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '32px' }}>
            Access the hiring dashboard to track applications, review candidates, and manage the pipeline.
          </p>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', 
            background: 'var(--accent)', color: 'white', padding: '12px 24px', borderRadius: '14px', fontWeight: '700' 
          }}>Admin Login →</div>
        </div>
      </div>
    </div>
  )
}
