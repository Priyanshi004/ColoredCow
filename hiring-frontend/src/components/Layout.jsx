import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'
import { logout } from '../store/authSlice'
import api from '../api/axios'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '󰕒' },
  { to: '/applications', label: 'Applications', icon: '󰈙' },
  { to: '/jobs-manage', label: 'Manage Jobs', icon: '󰕓' },
  { to: '/reports', label: 'Reports', icon: '󰦕' },
]

export default function Layout({ children }) {
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

      {/* Sidebar */}
      <aside className="glass" style={{
        width: '280px', minHeight: '100vh', zIndex: 20,
        display: 'flex', flexDirection: 'column', flexShrink: 0,
        background: 'rgba(10, 10, 20, 0.4)',
        backdropFilter: 'blur(20px) saturate(160%)',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      }}>
        {/* Logo Section */}
        <div style={{ padding: '40px 28px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--accent), #a78bfa)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px', fontWeight: '900', color: 'white',
              boxShadow: '0 8px 16px rgba(139, 92, 246, 0.4)',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}>C</div>
            <div>
              <div style={{ fontWeight: '800', fontSize: '18px', color: 'white', letterSpacing: '-0.8px', lineHeight: 1.1 }}>ColoredCow</div>
              <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>Hiring Suite</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '24px 16px', flex: 1 }}>
          <div style={{ paddingLeft: '16px', marginBottom: '16px', fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '2px' }}>Main Menu</div>
          {navItems.map(({ to, label, icon }) => (
            <NavLink key={to} to={to} style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '14px 20px', borderRadius: '16px', marginBottom: '8px',
              textDecoration: 'none', fontSize: '15px', fontWeight: '600',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              background: isActive ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
              color: isActive ? 'white' : 'var(--muted)',
              border: isActive ? '1px solid rgba(139, 92, 246, 0.2)' : '1px solid transparent',
              boxShadow: isActive ? '0 10px 20px -10px rgba(139, 92, 246, 0.3)' : 'none',
            })}>
              {({ isActive }) => (
                <>
                  <span style={{ fontSize: '20px', opacity: isActive ? 1 : 0.6, transform: isActive ? 'scale(1.1)' : 'none' }}>{icon}</span>
                  <span style={{ letterSpacing: isActive ? '0.2px' : '0' }}>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Footer */}
        <div style={{ padding: '24px 16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            padding: '16px', borderRadius: '20px', background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #10b981, #34d399)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', fontWeight: '800', color: 'white', flexShrink: 0,
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
            }}>{user?.name ? user.name[0].toUpperCase() : 'A'}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name || 'Recruiter'}</div>
              <div style={{ fontSize: '11px', color: 'var(--accent2)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent2)', boxShadow: '0 0 10px var(--accent2)' }}></span>
                Online
              </div>
            </div>
            <button onClick={handleLogout} className="hover-glow" style={{
              background: 'rgba(239, 68, 68, 0.1)', border: 'none', cursor: 'pointer',
              color: 'var(--danger)', fontSize: '18px', padding: '8px', borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}>󰗽</button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="animate-fade-in" style={{ flex: 1, overflowY: 'auto', padding: '48px 60px', position: 'relative', zIndex: 10 }}>
        {children}
      </main>
    </div>
  )
}