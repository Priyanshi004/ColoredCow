import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useToast } from '../components/Toast'
import api from '../api/axios'

export default function PublicForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const preSelectedJobId = queryParams.get('jobId')

  const [step, setStep] = useState(1)
  const [jobs, setJobs] = useState([])
  const [form, setForm] = useState({ 
    job_opening_id: preSelectedJobId || '', 
    full_name: '', email: '', phone: '', city: '', 
    address: '', linkedin_url: '', portfolio_url: '',
    college: '', graduation_year: '', degree: '', cgpa: '',
    experience: '', company: '', experience_details: '',
    cover_letter: '' 
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

  const validateStep = () => {
    if (step === 1) {
      if (!form.full_name || !form.email || !form.phone || !form.city || !form.address || !form.job_opening_id) {
        showToast('Please fill all mandatory fields', 'error')
        return false
      }
    } else if (step === 2) {
      if (!form.college || !form.degree || !form.graduation_year) {
        showToast('Please fill all mandatory fields', 'error')
        return false
      }
    } else if (step === 4) {
      if (!resume) {
        showToast('Please upload your resume', 'error')
        return false
      }
    }
    return true
  }

  const handleNext = () => {
    if (validateStep()) setStep(step + 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep()) return
    setError('')
    setLoading(true)
    try {
      const formData = new FormData()
      
      // Basic fields
      const basicFields = [
        'job_opening_id', 'full_name', 'email', 'phone', 'city', 'address', 
        'cover_letter', 'linkedin_url', 'portfolio_url'
      ]
      basicFields.forEach(k => {
        if (form[k]) formData.append(k, form[k])
      })

      // Combined fields
      const education = `${form.degree} from ${form.college} (Class of ${form.graduation_year}). CGPA: ${form.cgpa || 'N/A'}`
      const experience = `${form.experience} at ${form.company}. Tasks: ${form.experience_details || 'N/A'}`
      
      formData.append('education', education)
      formData.append('experience', experience)
      formData.append('college', form.college)
      formData.append('graduation_year', form.graduation_year)

      if (resume) formData.append('resume', resume)

      await api.post('/api/apply', formData, { 
        headers: { 'Content-Type': 'multipart/form-data' } 
      })
      
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
    background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)',
    fontSize: '14px', outline: 'none', transition: 'all 0.2s', fontFamily: 'inherit',
  }

  const Label = ({ children }) => (
    <label style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginBottom: '8px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>{children}</label>
  )

  return (
    <div style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '640px' }}>

        <div className="glass animate-fade-in" style={{ padding: '48px', borderRadius: '32px' }}>          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
              {[1, 2, 3, 4].map(s => (
                <div key={s} style={{ 
                  width: '40px', height: '4px', borderRadius: '2px', 
                  background: s <= step ? 'var(--accent2)' : 'var(--border)',
                  transition: 'all 0.4s'
                }} />
              ))}
            </div>
            <h1 className="text-gradient" style={{ fontSize: '32px', fontWeight: '900', margin: '0 0 12px', letterSpacing: '-1px' }}>
              {step === 1 && 'Personal Information'}
              {step === 2 && 'Education Background'}
              {step === 3 && 'Professional Experience'}
              {step === 4 && 'Final Documents'}
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '15px', margin: 0 }}>
              Step {step} of 4 • {step === 1 && 'Tell us who you are'}
              {step === 2 && 'Your academic journey'}
              {step === 3 && 'What you have built so far'}
              {step === 4 && 'Almost there!'}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {step === 1 && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <Label>Target Position <span style={{ color: 'var(--danger)' }}>*</span></Label>
                  <select style={inputStyle} value={form.job_opening_id} onChange={e => setForm({ ...form, job_opening_id: e.target.value })} required disabled={!!preSelectedJobId}>
                    <option value="" style={{ background: 'var(--bg)' }}>Select a position</option>
                    {jobs.map(job => <option key={job.id} value={job.id} style={{ background: 'var(--bg)' }}>{job.title}</option>)}
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <Label>Full Name <span style={{ color: 'var(--danger)' }}>*</span></Label>
                    <input style={inputStyle} placeholder="Jane Doe" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} required />
                  </div>
                  <div>
                    <Label>Email Address <span style={{ color: 'var(--danger)' }}>*</span></Label>
                    <input type="email" style={inputStyle} placeholder="jane@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <Label>Phone Number <span style={{ color: 'var(--danger)' }}>*</span></Label>
                    <input style={inputStyle} placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
                  </div>
                  <div>
                    <Label>Current City <span style={{ color: 'var(--danger)' }}>*</span></Label>
                    <input style={inputStyle} placeholder="Mumbai, MH" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} required />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <Label>LinkedIn URL</Label>
                    <input style={inputStyle} placeholder="https://linkedin.com/in/..." value={form.linkedin_url} onChange={e => setForm({ ...form, linkedin_url: e.target.value })} />
                  </div>
                  <div>
                    <Label>GitHub / Portfolio URL</Label>
                    <input style={inputStyle} placeholder="https://github.com/..." value={form.portfolio_url} onChange={e => setForm({ ...form, portfolio_url: e.target.value })} />
                  </div>
                </div>
                <div>
                  <Label>Full Address <span style={{ color: 'var(--danger)' }}>*</span></Label>
                  <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'none' }} placeholder="Your residential address..." value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <Label>College / University <span style={{ color: 'var(--danger)' }}>*</span></Label>
                  <input style={inputStyle} placeholder="IIT Bombay / Delhi University" value={form.college} onChange={e => setForm({ ...form, college: e.target.value })} required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                  <div>
                    <Label>Degree / Specification <span style={{ color: 'var(--danger)' }}>*</span></Label>
                    <input style={inputStyle} placeholder="B.Tech Computer Science" value={form.degree} onChange={e => setForm({ ...form, degree: e.target.value })} required />
                  </div>
                  <div>
                    <Label>Grad Year <span style={{ color: 'var(--danger)' }}>*</span></Label>
                    <input style={inputStyle} placeholder="2024" value={form.graduation_year} onChange={e => setForm({ ...form, graduation_year: e.target.value })} required />
                  </div>
                </div>
                <div>
                  <Label>CGPA / Percentage</Label>
                  <input style={inputStyle} placeholder="e.g. 8.5 or 85%" value={form.cgpa} onChange={e => setForm({ ...form, cgpa: e.target.value })} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <Label>Recent Company</Label>
                    <input style={inputStyle} placeholder="Where did you work last?" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                  </div>
                  <div>
                    <Label>Total Experience</Label>
                    <input style={inputStyle} placeholder="e.g. 2 Years" value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} />
                  </div>
                </div>
                <div>
                  <Label>Key Projects / Roles</Label>
                  <textarea style={{ ...inputStyle, minHeight: '120px', resize: 'none' }} placeholder="Briefly describe your responsibilities and achievements..." value={form.experience_details}
                    onChange={e => setForm({ ...form, experience_details: e.target.value })} />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <Label>Resume Attachment (PDF/DOCX) <span style={{ color: 'var(--danger)' }}>*</span></Label>
                  <input type="file" accept=".pdf,.doc,.docx" id="resume" style={{ display: 'none' }} onChange={e => setResume(e.target.files[0])} />
                  <label htmlFor="resume" style={{ 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                    padding: '24px', borderRadius: '14px', background: 'var(--surface2)', border: '1px dashed var(--border)',
                    cursor: 'pointer', fontSize: '14px', color: resume ? 'var(--accent2)' : 'var(--text)', transition: 'all 0.2s', fontWeight: resume ? '800' : '600'
                  }}>
                    {resume ? `󰄬 ${resume.name}` : '󰈙 Click to upload your resume'}
                  </label>
                </div>
                <div>
                  <Label>Cover Letter / Statement of Purpose</Label>
                  <textarea style={{ ...inputStyle, resize: 'none', minHeight: '120px' }} placeholder="Tell us why you're a great fit..." value={form.cover_letter}
                    onChange={e => setForm({ ...form, cover_letter: e.target.value })} />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
              {step > 1 && (
                <button type="button" onClick={() => setStep(step - 1)} style={{
                  flex: 1, padding: '16px', borderRadius: '16px',
                  background: 'var(--surface2)', border: '1px solid var(--border)',
                  color: 'var(--text)', fontWeight: '700', cursor: 'pointer', transition: 'all 0.3s'
                }}>PREVIOUS</button>
              )}
              
              {step < 4 ? (
                <button type="button" onClick={handleNext} className="hover-glow" style={{
                  flex: 2, padding: '16px', borderRadius: '16px',
                  background: 'var(--accent)', border: 'none',
                  color: 'white', fontWeight: '800', cursor: 'pointer', transition: 'all 0.3s'
                }}>CONTINUE →</button>
              ) : (
                <button type="submit" disabled={loading} className="hover-glow" style={{
                  flex: 2, padding: '16px', borderRadius: '16px',
                  background: 'var(--accent2)', border: 'none',
                  color: 'white', fontWeight: '800', cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1, transition: 'all 0.3s'
                }}>
                  {loading ? 'POSTING...' : 'FINISH APPLICATION →'}
                </button>
              )}
            </div>
          </form>  
        </div>
      </div>
    </div>
  )
}