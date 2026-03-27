import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useToast } from '../components/Toast'

const statusColors = {
  pending: '#f59e0b',
  reviewed: '#8b5cf6',
  approved: '#10b981',
  rejected: '#ef4444',
}

export default function Applications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ status: '', job_opening_id: '', city: '', college: '', graduation_year: '' })
  const [jobs, setJobs] = useState([])
  const navigate = useNavigate()
  const { showToast } = useToast()

  useEffect(() => {
    api.get('/api/job-openings').then(res => setJobs(res.data))
  }, [])

  useEffect(() => {
    setLoading(true)
    const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v))
    api.get('/api/applications', { params }).then(res => {
      setApplications(res.data)
      setLoading(false)
    })
  }, [filters])

  const handleQuickAction = async (id, status, e) => {
    e.stopPropagation()
    try {
      await api.patch(`/api/applications/${id}`, { status, notes: `Quick ${status} from list view.` })
      showToast(`Application ${status} successfully!`, 'success')
      setApplications(prev => prev.map(app => app.id === id ? { ...app, status } : app))
    } catch (err) {
      showToast('Action failed. Please try again.', 'error')
    }
  }

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '40px' }}>
        <h1 className="text-gradient" style={{ fontSize: '36px', fontWeight: '900', margin: '0 0 8px', letterSpacing: '-1.5px' }}>Application Tracking</h1>
        <p style={{ color: 'var(--muted)', fontSize: '15px' }}>Manage and filter through all submitted candidate profiles.</p>
      </div>

      {/* Filters */}
      <div className="glass" style={{ padding: '24px 32px', borderRadius: '24px', marginBottom: '32px', display: 'flex', flexWrap: 'wrap', gap: '16px', background: 'rgba(255,255,255,0.02)' }}>
        <select value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value })} 
          style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', flex: 1, minWidth: '150px', outline: 'none' }}>
          <option value="" style={{ background: '#1a1d21', color: 'white' }}>All Statuses</option>
          <option value="pending" style={{ background: '#1a1d21', color: 'white' }}>Pending</option>
          <option value="reviewed" style={{ background: '#1a1d21', color: 'white' }}>Reviewed</option>
          <option value="approved" style={{ background: '#1a1d21', color: 'white' }}>Approved</option>
          <option value="rejected" style={{ background: '#1a1d21', color: 'white' }}>Rejected</option>
        </select>
        <select value={filters.job_opening_id} onChange={e => setFilters({ ...filters, job_opening_id: e.target.value })} 
          style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', flex: 2, minWidth: '200px', outline: 'none' }}>
          <option value="" style={{ background: '#1a1d21', color: 'white' }}>All Positions</option>
          {jobs.map(j => <option key={j.id} value={j.id} style={{ background: '#1a1d21', color: 'white' }}>{j.title}</option>)}
        </select>
        <input type="text" placeholder="Filter by City..." value={filters.city} onChange={e => setFilters({ ...filters, city: e.target.value })} 
          style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', flex: 1, minWidth: '150px' }} />
        <button onClick={() => setFilters({ status: '', job_opening_id: '', city: '', college: '', graduation_year: '' })} 
          style={{ border: 'none', background: 'transparent', color: 'var(--accent)', fontWeight: '700', fontSize: '13px', cursor: 'pointer', padding: '0 10px' }}>Reset Filters</button>
      </div>

      {/* Table */}
      <div className="glass" style={{ borderRadius: '28px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                {['Candidate', 'Position', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '20px 32px', textAlign: 'left', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '2.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" style={{ padding: '60px', textAlign: 'center', color: 'var(--muted)', fontSize: '14px' }}>Loading applications...</td></tr>
              ) : applications.length === 0 ? (
                <tr><td colSpan="4" style={{ padding: '60px', textAlign: 'center', color: 'var(--muted)', fontSize: '14px' }}>No applications match your filters.</td></tr>
              ) : applications.map(app => (
                <tr key={app.id} onClick={() => navigate(`/applications/${app.id}`)} 
                  style={{ borderTop: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '20px 32px' }}>
                    <div style={{ fontWeight: '700', fontSize: '15px', color: 'white' }}>{app.full_name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>{app.email}</div>
                  </td>
                  <td style={{ padding: '20px 32px', fontSize: '14px', color: 'white', fontWeight: '600' }}>{app.job_opening?.title}</td>
                  <td style={{ padding: '20px 32px' }}>
                    <span style={{ 
                      padding: '6px 14px', borderRadius: '10px', fontSize: '11px', fontWeight: '800', 
                      background: `${statusColors[app.status]}25`, color: statusColors[app.status],
                      textTransform: 'uppercase', letterSpacing: '1px', border: `1px solid ${statusColors[app.status]}44`,
                      boxShadow: `0 0 10px ${statusColors[app.status]}22`
                    }}>{app.status}</span>
                  </td>
                  <td style={{ padding: '20px 32px' }}>
                    {['approved', 'rejected'].includes(app.status) ? (
                      <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>---</div>
                    ) : (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={e => handleQuickAction(app.id, 'approved', e)} className="hover-glow" style={{ background: 'rgba(16,185,129,0.1)', border: 'none', color: '#10b981', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '800' }}>✓ Approve</button>
                        <button onClick={e => handleQuickAction(app.id, 'rejected', e)} className="hover-glow" style={{ background: 'rgba(239,68,68,0.1)', border: 'none', color: '#ef4444', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '800' }}>✕ Reject</button>
                      </div>
                    )}
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