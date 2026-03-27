import React from 'react'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function GlobalHeader({ showLogout = false, onLogout = null }) {
  const navigate = useNavigate()

  return (
    <header className="glass" style={{
      position: 'sticky', top: 0, zIndex: 100,
      padding: '16px 40px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: 'var(--sidebar-bg)',
      backdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: '1px solid var(--sidebar-border)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }} onClick={() => navigate('/')}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '12px',
          background: 'linear-gradient(135deg, var(--accent), #a78bfa)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px', fontWeight: '900', color: 'white',
          boxShadow: '0 8px 16px rgba(139, 92, 246, 0.3)',
        }}>C</div>
        <div>
          <div style={{ fontWeight: '800', fontSize: '20px', color: 'var(--text)', letterSpacing: '-0.8px', lineHeight: 1.1 }}>Coloured Cow</div>
          <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Hiring Portal</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <p style={{ color: 'var(--muted)', fontSize: '13px', fontWeight: '600', margin: 0, maxWidth: '300px', textAlign: 'right', display: window.innerWidth < 768 ? 'none' : 'block' }}>
          Discover opportunities that match your passion and skills.
        </p>
        <ThemeToggle />
        {showLogout && (
          <button onClick={onLogout} className="hover-glow" style={{
            background: 'var(--accent)', color: 'white', border: 'none',
            padding: '10px 24px', borderRadius: '12px', fontWeight: '800', fontSize: '13px',
            cursor: 'pointer', transition: 'all 0.3s'
          }}>LOGOUT</button>
        )}
      </div>
    </header>
  )
}
