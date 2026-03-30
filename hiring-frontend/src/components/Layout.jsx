import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'
import { logout } from '../store/authSlice'
import api from '../api/axios'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '󰕒' },
  { to: '/applications', label: 'Applications', icon: '󰈙' },
  { to: '/jobs-manage', label: 'Manage Jobs', icon: '󰕓' },
  { to: '/reports', label: 'Reports', icon: '󰦕' },
]

import GlobalHeader from './GlobalHeader'
import GlobalFooter from './GlobalFooter'

export default function Layout({ children }) {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth?.user) || {}

  const handleLogout = async () => {
    try { await api.post('/api/logout') } catch (e) { console.error(e) }
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)', position: 'relative', overflow: 'hidden', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Mesh Background Blobs */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: '35vw', height: '35vw', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '15%', right: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', top: '40%', right: '5%', width: '25vw', height: '25vw', background: 'radial-gradient(circle, rgba(124, 114, 255, 0.06) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }}></div>

      {/* Sidebar - Hidden on Mobile */}
      <aside className="glass mobile-hide" style={{
        width: isCollapsed ? '88px' : '280px', minHeight: '100vh', zIndex: 20,
        display: 'flex', flexDirection: 'column', flexShrink: 0,
        background: 'var(--sidebar-bg)',
        backdropFilter: 'blur(20px) saturate(160%)',
        borderRight: '1px solid var(--sidebar-border)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {/* Logo Section */}
        <div style={{ padding: '32px 24px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: isCollapsed ? 'center' : 'flex-start' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--accent), #a78bfa)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px', fontWeight: '900', color: 'white',
              boxShadow: '0 8px 16px rgba(139, 92, 246, 0.3)',
              flexShrink: 0,
            }}>C</div>
            {!isCollapsed && (
              <div className="animate-fade-in" style={{ overflow: 'hidden' }}>
                <div style={{ fontWeight: '800', fontSize: '18px', color: 'var(--sidebar-text)', letterSpacing: '-0.8px', lineHeight: 1.1, whiteSpace: 'nowrap' }}>ColoredCow</div>
                <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px', whiteSpace: 'nowrap' }}>Hiring Suite</div>
              </div>
            )}
          </div>
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: isCollapsed ? 'center' : 'center', alignItems: 'center' }}>
            {isCollapsed ? (
               <button 
               onClick={() => setIsCollapsed(false)}
               style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '20px' }}
               title="Expand Sidebar"
             >󰍜</button>
            ) : (
              <button 
                onClick={() => setIsCollapsed(true)}
                style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}
                title="Collapse Sidebar"
              >󰅖 <span style={{ fontSize: '11px', fontWeight: '800' }}>COLLAPSE</span></button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '24px 16px', flex: 1 }}>
          {!isCollapsed && <div className="animate-fade-in" style={{ paddingLeft: '16px', marginBottom: '16px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '2px' }}>Main Menu</div>}
          {navItems.map(({ to, label, icon }) => (
            <NavLink key={to} to={to} style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: isCollapsed ? '0' : '16px',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              padding: '14px', borderRadius: '16px', marginBottom: '8px',
              textDecoration: 'none', fontSize: '15px', fontWeight: '600',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              background: isActive ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
              color: isActive ? 'var(--accent)' : 'var(--muted)',
              border: isActive ? '1px solid rgba(139, 92, 246, 0.2)' : '1px solid transparent',
              boxShadow: isActive ? '0 10px 20px -10px rgba(139, 92, 246, 0.3)' : 'none',
            })}>
              {({ isActive }) => (
                <>
                   <span style={{ fontSize: '20px', opacity: isActive ? 1 : 0.6, transform: isActive ? 'scale(1.1)' : 'none' }}>{icon}</span>
                  {!isCollapsed && <span className="animate-fade-in" style={{ letterSpacing: isActive ? '0.2px' : '0', whiteSpace: 'nowrap' }}>{label}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Footer (Simplified) */}
        {!isCollapsed && (
          <div style={{ padding: '24px 16px', borderTop: '1px solid var(--sidebar-border)' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              padding: '12px', borderRadius: '20px', background: 'rgba(124, 114, 255, 0.05)',
              border: '1px solid var(--sidebar-border)',
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #10b981, #34d399)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', fontWeight: '800', color: 'white', flexShrink: 0,
              }}>{user?.name ? user.name[0].toUpperCase() : 'A'}</div>
              <div className="animate-fade-in" style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--sidebar-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name || 'Recruiter'}</div>
                <div style={{ fontSize: '11px', color: 'var(--accent2)', fontWeight: '700' }}>Online</div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area with Header */}
      <main className="animate-fade-in" style={{ 
        flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 10 
      }}>
        <GlobalHeader showLogout={true} onLogout={handleLogout} />
        <div className="mobile-padding" style={{ flex: 1, padding: '48px 60px' }}>
          {children}
        </div>
        <GlobalFooter />
      </main>
    </div>
  )
}