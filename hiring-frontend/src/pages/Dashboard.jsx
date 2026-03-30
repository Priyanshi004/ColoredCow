import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import StatCard from '../components/StatCard'

const statusColors = {
  pending: '#f59e0b',
  reviewed: '#8b5cf6',
  approved: '#10b981',
  rejected: '#ef4444',
}

const tableHeaderStyle = { padding: '20px 40px', textAlign: 'left', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '2.5px', borderBottom: '1px solid var(--border)' }

export default function Dashboard() {
  const [data, setData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/api/dashboard').then((res) => setData(res.data))
  }, [])

  if (!data) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
        <div style={{ color: 'var(--muted)', fontSize: '14px', fontWeight: '600', letterSpacing: '1px' }}>INITIALIZING V2 SUITE...</div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  )

  return (
    <div className="animate-fade-in">
      <div className="mobile-stack" style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(28px, 6vw, 40px)', fontWeight: '900', margin: '0 0 12px', letterSpacing: '-1.5px' }}>
            Welcome back, admin
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '16px', margin: 0, fontWeight: '500' }}>Here is what's happening in your hiring pipeline today.</p>
        </div>
        <div className="glass mobile-hide" style={{ padding: '12px 24px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--surface)' }}>
          <span style={{ fontSize: '20px' }}>󰃭</span>
          <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)' }}>{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>
 
      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '56px' }}>
        <StatCard title="Total Applications" value={data.stats.total_applications} subtitle="Overall volume" accent="var(--accent)" />
        <StatCard title="Active Cycle" value={data.stats.last_30_days} subtitle="Last 30 days" accent="var(--accent2)" />
        <StatCard title="Pending Review" value={data.stats.pending} subtitle="Action required" accent="var(--warn)" />
        <StatCard title="Approved" value={data.stats.approved} subtitle="Ready for offer" accent="var(--accent2)" />
      </div>
 
      {/* Recent applications */}
      <div className="glass" style={{ borderRadius: '32px', overflow: 'hidden', padding: '8px', background: 'var(--surface)' }}>
        <div className="mobile-stack" style={{ padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text)', margin: '0 0 4px' }}>Recent Candidates</h2>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Latest submissions from the last 24 hours</p>
          </div>
          <button onClick={() => navigate('/applications')} className="hover-glow" style={{
            background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)',
            padding: '12px 24px', borderRadius: '14px', cursor: 'pointer', fontSize: '14px', fontWeight: '700',
            transition: 'all 0.3s', width: window.innerWidth < 768 ? '100%' : 'auto'
          }}>Deep tracking →</button>
        </div>
        
        <div className="hide-scrollbar" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: '900px', borderCollapse: 'separate', borderSpacing: '0 4px' }}>
            <thead>
              <tr style={{ background: 'var(--surface2)' }}>
                {['Candidate', 'Applied For', 'City', 'Status', 'Applied Date'].map(h => (
                  <th key={h} style={tableHeaderStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.recent_applications.map((app) => (
                <tr key={app.id} onClick={() => navigate(`/applications/${app.id}`)}
                  style={{ cursor: 'pointer', transition: 'all 0.3s', borderBottom: '1px solid var(--border)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '24px 40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--glass-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px', color: 'var(--accent)' }}>
                        {app.full_name[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '15px', color: 'var(--text)' }}>{app.full_name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>{app.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '24px 40px' }}>
                    <div style={{ fontSize: '14px', color: 'var(--text)', fontWeight: '600' }}>{app.job_opening?.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>Permanent Role</div>
                  </td>
                  <td style={{ padding: '24px 40px', fontSize: '14px', color: 'var(--muted)', fontWeight: '500' }}>{app.city || 'Remote'}</td>
                  <td style={{ padding: '24px 40px' }}>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      padding: '8px 16px', borderRadius: '12px', fontSize: '11px', fontWeight: '800',
                      background: `${statusColors[app.status]}25`, color: statusColors[app.status],
                      textTransform: 'uppercase', letterSpacing: '1px', border: `1px solid ${statusColors[app.status]}44`,
                      boxShadow: `0 0 10px ${statusColors[app.status]}22`,
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusColors[app.status] }}></span>
                      {app.status}
                    </div>
                  </td>
                  <td style={{ padding: '24px 40px', fontSize: '14px', color: 'var(--muted)', fontWeight: '600' }}>
                    {new Date(app.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}