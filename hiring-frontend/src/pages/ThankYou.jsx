import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function ThankYou() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { setTimeout(() => setVisible(true), 100) }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{
        textAlign: 'center', maxWidth: '440px',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s ease',
      }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(0,212,170,0.2), rgba(108,99,255,0.2))',
          border: '2px solid rgba(0,212,170,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '36px', margin: '0 auto 24px',
        }}>✓</div>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: 'var(--text)', margin: '0 0 12px' }}>Application Submitted!</h1>
        <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.7', margin: '0 0 32px' }}>
          Thank you for applying. We've received your application and will review it shortly. Check your email for a confirmation.
        </p>
        <Link to="/" style={{
          display: 'inline-block', padding: '12px 28px', borderRadius: '8px',
          background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.3)',
          color: 'var(--accent)', textDecoration: 'none', fontSize: '14px', fontWeight: '500',
        }}>Submit Another Application</Link>
      </div>
    </div>
  )
}