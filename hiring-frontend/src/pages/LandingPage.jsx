import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div style={{ 
      minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
      background: 'var(--bg)', position: 'relative', overflow: 'hidden', padding: '20px'
    }}>
      {/* Background Blobs */}
      <div style={{ position: 'absolute', top: '15%', left: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '15%', right: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0 }}></div>

      <div className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '60px', zIndex: 10 }}>
        <div style={{ 
          width: '64px', height: '64px', borderRadius: '18px', 
          background: 'linear-gradient(135deg, var(--accent), #a78bfa)', 
          margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '32px', fontWeight: '900', color: 'white',
          boxShadow: '0 12px 24px rgba(139, 92, 246, 0.4)'
        }}>C</div>
        <h1 className="text-gradient" style={{ fontSize: '48px', fontWeight: '900', margin: '0 0 12px', letterSpacing: '-2px' }}>
          ColoredCow Hiring
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', fontWeight: '500', maxWidth: '500px', margin: '0 auto' }}>
          The next generation talent acquisition and management suite. Choose your portal to begin.
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
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'white', marginBottom: '16px' }}>Candidate Portal</h2>
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
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'white', marginBottom: '16px' }}>HR Management</h2>
          <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '32px' }}>
            Access the hiring dashboard to track applications, review candidates, and manage the pipeline.
          </p>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', 
            background: 'var(--accent)', color: 'white', padding: '12px 24px', borderRadius: '14px', fontWeight: '700' 
          }}>Admin Login →</div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '40px', color: 'rgba(255,255,255,0.2)', fontSize: '12px', fontWeight: '600', letterSpacing: '1px' }}>
        © 2026 COLOREDCOW. ALL RIGHTS RESERVED.
      </div>
    </div>
  )
}
