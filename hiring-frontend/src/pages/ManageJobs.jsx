import { useEffect, useState } from 'react'
import api from '../api/axios'
import { useToast } from '../components/Toast'

const statusColors = {
  pending: '#f59e0b',
  reviewed: '#8b5cf6',
  approved: '#10b981',
  rejected: '#ef4444',
}

export default function ManageJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ title: '', department: '', location: '', salary_range: '', description: '', requirements: '' })
  const { showToast } = useToast()

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const res = await api.get('/api/job-openings')
      setJobs(res.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchJobs() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/api/job-openings', form)
      showToast('Position added successfully!', 'success')
      setShowModal(false)
      setForm({ title: '', department: '', location: '', salary_range: '', description: '', requirements: '' })
      fetchJobs()
    } catch (err) {
      showToast('Failed to add position.', 'error')
    }
  }

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'open' ? 'closed' : 'open'
    try {
      await api.patch(`/api/job-openings/${id}/status`, { status: newStatus })
      showToast(`Position ${newStatus === 'open' ? 'reopened' : 'closed'} successfully!`, 'success')
      fetchJobs()
    } catch (err) {
      showToast('Failed to update position status.', 'error')
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'var(--surface2)',
    border: '1px solid var(--border)', color: 'var(--text)', fontSize: '14px', outline: 'none'
  }

  const tableHeaderStyle = { padding: '20px 24px', color: 'var(--muted)', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid var(--border)' }

  return (
    <div className="animate-fade-in">
      <div className="mobile-stack" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(24px, 6vw, 28px)', fontWeight: '800', color: 'var(--text)', margin: '0 0 4px' }}>Job Management</h1>
          <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Manage active openings and recruit new talent.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="hover-glow" style={{ 
          background: 'var(--accent)', color: 'white', border: 'none', padding: '12px 24px', 
          borderRadius: '14px', fontWeight: '700', cursor: 'pointer', width: window.innerWidth < 768 ? '100%' : 'auto'
        }}>+ Add New Position</button>
      </div>

      <div className="glass hide-scrollbar" style={{ borderRadius: '24px', overflowX: 'auto', background: 'var(--surface)' }}>
        <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--surface2)' }}>
              <th style={tableHeaderStyle}>Position</th>
              <th style={tableHeaderStyle}>Department</th>
              <th style={tableHeaderStyle}>Location</th>
               <th style={tableHeaderStyle}>Salary</th>
              <th style={tableHeaderStyle}>Status</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ color: 'var(--text)', fontWeight: '700' }}>{job.title}</div>
                </td>
                <td style={{ padding: '20px 24px', color: 'var(--muted)', fontSize: '14px' }}>{job.department}</td>
                <td style={{ padding: '20px 24px', color: 'var(--muted)', fontSize: '14px' }}>{job.location}</td>
                <td style={{ padding: '20px 24px', color: 'var(--text)', fontSize: '14px', fontWeight: '600' }}>{job.salary_range}</td>
                 <td style={{ padding: '20px 24px' }}>
                  <span style={{ 
                    padding: '4px 10px', borderRadius: '6px', 
                    background: job.status === 'open' ? `${statusColors.approved}25` : 'var(--surface2)', 
                    color: job.status === 'open' ? 'var(--accent2)' : 'var(--muted)', 
                    fontSize: '11px', fontWeight: '800', border: job.status === 'open' ? `1px solid ${statusColors.approved}44` : '1px solid var(--border)'
                  }}>{job.status.toUpperCase()}</span>
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <button 
                    onClick={() => handleToggleStatus(job.id, job.status)}
                    className="hover-glow" 
                    style={{ 
                      background: job.status === 'open' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                      color: job.status === 'open' ? 'var(--danger)' : 'var(--accent2)',
                      border: 'none', padding: '8px 16px', borderRadius: '10px',
                      fontSize: '11px', fontWeight: '800', cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {job.status === 'open' ? 'Close Position' : 'Reopen Position'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>Loading...</div>}
        {!loading && jobs.length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>No jobs found.</div>}
      </div>

      {showModal && (
        <div style={{ 
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 
        }}>
          <div className="glass shadow-premium" style={{ width: '100%', maxWidth: '600px', padding: '40px', borderRadius: '32px', background: 'var(--surface2)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', marginBottom: '24px' }}>Add New Position</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px', fontWeight: '700' }}>Title</label>
                  <input style={inputStyle} value={form.title} onChange={e => setForm({...form, title: e.target.value})} required placeholder="Software Engineer" />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px', fontWeight: '700' }}>Department</label>
                  <input style={inputStyle} value={form.department} onChange={e => setForm({...form, department: e.target.value})} required placeholder="Engineering" />
                </div>
              </div>
              <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px', fontWeight: '700' }}>Location</label>
                  <input style={inputStyle} value={form.location} onChange={e => setForm({...form, location: e.target.value})} required placeholder="Remote / On-site" />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px', fontWeight: '700' }}>Salary (use ₹ symbol)</label>
                  <input style={inputStyle} value={form.salary_range} onChange={e => setForm({...form, salary_range: e.target.value})} placeholder="₹80k - ₹120k" />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px', fontWeight: '700' }}>Description</label>
                <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'none' }} value={form.description} onChange={e => setForm({...form, description: e.target.value})} required placeholder="Overview of the role..." />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px', fontWeight: '700' }}>Requirements (bullet points)</label>
                <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'none' }} value={form.requirements} onChange={e => setForm({...form, requirements: e.target.value})} placeholder="• 3+ years experience..." />
              </div>
              <div className="mobile-stack" style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ 
                  flex: 1, padding: '14px', borderRadius: '12px', background: 'var(--surface)', 
                  border: '1px solid var(--border)', color: 'var(--text)', fontWeight: '700', cursor: 'pointer' 
                }}>Cancel</button>
                <button type="submit" className="hover-glow" style={{ 
                  flex: 2, padding: '14px', borderRadius: '12px', background: 'var(--accent)', 
                  border: 'none', color: 'white', fontWeight: '700', cursor: 'pointer' 
                }}>Post Position</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
