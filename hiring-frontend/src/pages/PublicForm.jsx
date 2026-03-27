import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useToast } from '../components/Toast'
import api from '../api/axios'

export default function PublicForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const preSelectedJobId = queryParams.get('jobId')

  const [jobs, setJobs] = useState([])
  const [form, setForm] = useState({ 
    job_opening_id: preSelectedJobId || '', 
    full_name: '', email: '', phone: '', city: '', college: '', graduation_year: '', cover_letter: '' 
  })
  const [resume, setResume] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    const init = async () => {
      try {
        await api.get('/sanctum/csrf-cookie')
        const res = await api.get('/api/job-openings')
        setJobs(res.data)
        if (preSelectedJobId) {
          setForm(prev => ({ ...prev, job_opening_id: preSelectedJobId }))
        }
      } catch (err) {
        console.error('Initialization failed', err)
      }
    }
    init()
  }, [preSelectedJobId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([k, v]) => formData.append(k, v))
      if (resume) formData.append('resume', resume)
      await api.post('/api/apply', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      showToast('Application submitted successfully!', 'success')
      navigate('/thank-you')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '14px 18px', borderRadius: '14px', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'white',
    fontSize: '14px', outline: 'none', transition: 'all 0.2s', fontFamily: 'inherit',
  }

  const Label = ({ children }) => (
    <label style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginBottom: '8px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>{children}</label>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }} />
      
      <div style={{ width: '100%', maxWidth: '640px', position: 'relative', zIndex: 1 }}>
        <button onClick={() => navigate(preSelectedJobId ? `/jobs/${preSelectedJobId}` : '/apply')} style={{ 
          background: 'none', border: 'none', color: 'var(--accent2)', cursor: 'pointer', 
          display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontWeight: '700', fontSize: '14px' 
        }}>← Back</button>

        <div className="glass animate-fade-in" style={{ padding: '48px', borderRadius: '32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 className="text-gradient" style={{ fontSize: '32px', fontWeight: '900', margin: '0 0 12px', letterSpacing: '-1px' }}>Complete Your Application</h1>
            <p style={{ color: 'var(--muted)', fontSize: '15px', margin: 0 }}>Please provide your details to proceed with your candidacy.</p>
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', padding: '14px 18px', marginBottom: '24px', color: '#ef4444', fontSize: '13px', fontWeight: '600' }}>{error}</div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <Label>Target Position *</Label>
              <select style={inputStyle} value={form.job_opening_id} onChange={e => setForm({ ...form, job_opening_id: e.target.value })} required disabled={!!preSelectedJobId}>
                <option value="" style={{ background: '#1a1d21' }}>Select a position</option>
                {jobs.map(job => <option key={job.id} value={job.id} style={{ background: '#1a1d21' }}>{job.title}</option>)}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div>
                <Label>Full Name *</Label>
                <input style={inputStyle} placeholder="Full Name" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} required />
              </div>
              <div>
                <Label>Email Address *</Label>
                <input type="email" style={inputStyle} placeholder="email@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div>
                <Label>Phone Number</Label>
                <input style={inputStyle} placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <Label>Current City</Label>
                <input style={inputStyle} placeholder="London, UK" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
              <div>
                <Label>College / University</Label>
                <input style={inputStyle} placeholder="University Name" value={form.college} onChange={e => setForm({ ...form, college: e.target.value })} />
              </div>
              <div>
                <Label>Grad Year</Label>
                <input style={inputStyle} placeholder="2024" value={form.graduation_year} onChange={e => setForm({ ...form, graduation_year: e.target.value })} />
              </div>
            </div>

            <div>
              <Label>Cover Letter / Statement of Purpose</Label>
              <textarea style={{ ...inputStyle, resize: 'none', minHeight: '120px' }} placeholder="Tell us why you're a great fit..." value={form.cover_letter}
                onChange={e => setForm({ ...form, cover_letter: e.target.value })} />
            </div>

            <div>
              <Label>Resume Attachment (PDF/DOCX)</Label>
              <div style={{ position: 'relative' }}>
                <input type="file" accept=".pdf,.doc,.docx" id="resume" style={{ display: 'none' }} onChange={e => setResume(e.target.files[0])} />
                <label htmlFor="resume" style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                  padding: '16px', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.2)',
                  cursor: 'pointer', fontSize: '14px', color: resume ? 'var(--accent2)' : 'white', transition: 'all 0.2s', fontWeight: resume ? '800' : '500'
                }}>
                  {resume ? `󰄬 ${resume.name}` : '󰈙 Click to upload your resume'}
                </label>
              </div>
            </div>

            <button type="submit" disabled={loading} className="hover-glow" style={{
              marginTop: '12px', padding: '18px', borderRadius: '16px',
              background: 'var(--accent2)', border: 'none',
              color: 'white', fontWeight: '800', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1, transition: 'all 0.3s'
            }}>
              {loading ? 'PROCESSING...' : 'SUBMIT APPLICATION →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}