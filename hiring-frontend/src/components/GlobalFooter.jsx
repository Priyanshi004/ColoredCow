import React from 'react'
import { Link } from 'react-router-dom'

export default function GlobalFooter() {
  return (
    <footer className="glass" style={{
      marginTop: 'auto',
      padding: '40px 60px',
      background: 'var(--sidebar-bg)',
      borderTop: '1px solid var(--sidebar-border)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: '32px'
    }}>
      <div>
        <div style={{ fontWeight: '800', fontSize: '18px', color: 'var(--text)', marginBottom: '8px' }}>Coloured Cow</div>
        <p style={{ color: 'var(--muted)', fontSize: '13px', margin: 0, maxWidth: '400px' }}>
          We are committed to finding the best talent and providing an exceptional hiring experience. 
          Grow your career with us.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Support</div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)' }}>+91 9999999999</div>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/about" style={{ textDecoration: 'none', color: 'var(--accent)', fontWeight: '700', fontSize: '14px' }}>About Us</Link>
          <Link to="/help" style={{ textDecoration: 'none', color: 'var(--accent2)', fontWeight: '700', fontSize: '14px' }}>Get Help</Link>
        </div>
      </div>

      <div style={{ width: '100%', borderTop: '1px solid var(--border)', paddingTop: '20px', textAlign: 'center' }}>
        <p style={{ color: 'var(--muted)', fontSize: '11px', margin: 0 }}>© 2026 Coloured Cow. All rights reserved.</p>
      </div>
    </footer>
  )
}
