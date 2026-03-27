import { useEffect, useState } from 'react'
import api from '../api/axios'
import { useToast } from '../components/Toast'

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

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)', color: 'white', fontSize: '14px', outline: 'none'
  }

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'white', margin: '0 0 4px' }}>Job Management</h1>
          <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Manage active openings and recruit new talent.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="hover-glow" style={{ 
          background: 'var(--accent)', color: 'white', border: 'none', padding: '12px 24px', 
          borderRadius: '14px', fontWeight: '700', cursor: 'pointer' 
        }}>+ Add New Position</button>
      </div>

      <div className="glass" style={{ borderRadius: '24px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
              <th style={{ padding: '20px 24px', color: 'var(--muted)', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase' }}>Position</th>
              <th style={{ padding: '20px 24px', color: 'var(--muted)', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase' }}>Department</th>
              <th style={{ padding: '20px 24px', color: 'var(--muted)', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase' }}>Location</th>
              <th style={{ padding: '20px 24px', color: 'var(--muted)', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase' }}>Salary</th>
              <th style={{ padding: '20px 24px', color: 'var(--muted)', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ color: 'white', fontWeight: '700' }}>{job.title}</div>
                </td>
                <td style={{ padding: '20px 24px', color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>{job.department}</td>
                <td style={{ padding: '20px 24px', color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>{job.location}</td>
                <td style={{ padding: '20px 24px', color: 'white', fontSize: '14px', fontWeight: '600' }}>{job.salary_range}</td>
                <td style={{ padding: '20px 24px' }}>
                  <span style={{ 
                    padding: '4px 10px', borderRadius: '6px', background: 'rgba(16,185,129,0.1)', 
                    color: 'var(--accent2)', fontSize: '11px', fontWeight: '800' 
                  }}>{job.status.toUpperCase()}</span>
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
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 
        }}>
          <div className="glass" style={{ width: '100%', maxWidth: '600px', padding: '40px', borderRadius: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'white', marginBottom: '24px' }}>Add New Position</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>Title</label>
                  <input style={inputStyle} value={form.title} onChange={e => setForm({...form, title: e.target.value})} required placeholder="Software Engineer" />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>Department</label>
                  <input style={inputStyle} value={form.department} onChange={e => setForm({...form, department: e.target.value})} required placeholder="Engineering" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>Location</label>
                  <input style={inputStyle} value={form.location} onChange={e => setForm({...form, location: e.target.value})} required placeholder="Remote / On-site" />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>Salary (use ₹ symbol)</label>
                  <input style={inputStyle} value={form.salary_range} onChange={e => setForm({...form, salary_range: e.target.value})} placeholder="₹80k - ₹120k" />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>Description</label>
                <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'none' }} value={form.description} onChange={e => setForm({...form, description: e.target.value})} required placeholder="Overview of the role..." />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>Requirements (bullet points)</label>
                <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'none' }} value={form.requirements} onChange={e => setForm({...form, requirements: e.target.value})} placeholder="• 3+ years experience..." />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ 
                  flex: 1, padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontWeight: '700', cursor: 'pointer' 
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
