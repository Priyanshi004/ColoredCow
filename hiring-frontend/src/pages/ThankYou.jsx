import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function ThankYou() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { setTimeout(() => setVisible(true), 100) }, [])

  return (
    <div style={{ padding: '80px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        textAlign: 'center', maxWidth: '440px',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s ease',
      }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent2), var(--accent))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '36px', margin: '0 auto 24px', color: 'white',
          boxShadow: '0 12px 24px rgba(16, 185, 129, 0.2)',
        }}>✓</div>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--text)', margin: '0 0 12px', letterSpacing: '-1px' }}>Application Submitted!</h1>
        <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.7', margin: '0 0 32px' }}>
          Thank you for applying to Coloured Cow. We've received your application and will review it shortly. Our team will reach out to you via email.
        </p>
        <Link to="/" className="hover-glow" style={{
          display: 'inline-block', padding: '14px 32px', borderRadius: '14px',
          background: 'var(--accent)', color: 'white', textDecoration: 'none', 
          fontSize: '14px', fontWeight: '800', transition: 'all 0.3s'
        }}>Return to Home</Link>
      </div>
    </div>
  )
}