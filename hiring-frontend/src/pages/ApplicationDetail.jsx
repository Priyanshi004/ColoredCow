import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useToast } from '../components/Toast'

export default function ApplicationDetail() {
  const { id } = useParams()
  const [app, setApp] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState('')
  const navigate = useNavigate()
  const { showToast } = useToast()

  useEffect(() => {
    setLoading(true)
    api.get(`/api/applications/${id}`).then(res => {
      setApp(res.data)
      setLoading(false)
    })
  }, [id])

  const handleAction = async (status) => {
    try {
      await api.patch(`/api/applications/${id}`, { status, notes })
      showToast(`Application ${status} successfully!`, 'success')
      navigate('/applications')
    } catch (err) {
      showToast('Update failed. Please try again.', 'error')
    }
  }

  if (loading) return <div style={{ padding: '60px', textAlign: 'center', color: 'var(--muted)', fontWeight: '600' }}>LOADING PROFILE...</div>

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <button onClick={() => navigate('/applications')} style={{ 
        background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', 
        display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', fontWeight: '700', fontSize: '14px' 
      }}>← Back to Tracking</button>

      <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '32px' }}>
        {/* Left Column: Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div className="glass" style={{ padding: '40px', borderRadius: '32px' }}>
            <div className="mobile-stack" style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px' }}>
              <div style={{ 
                width: '80px', height: '80px', borderRadius: '24px', 
                background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '32px', fontWeight: '800', color: 'white',
                boxShadow: '0 12px 24px rgba(139, 92, 246, 0.3)', flexShrink: 0
              }}>{app.full_name[0]}</div>
              <div>
                <h1 style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: '900', color: 'white', margin: '0 0 4px', letterSpacing: '-1px' }}>{app.full_name}</h1>
                <div className="mobile-stack" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: '600' }}>{app.email}</span>
                  <span className="mobile-hide" style={{ width: '4px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }}></span>
                  <span style={{ fontSize: '14px', color: 'var(--accent2)', fontWeight: '700' }}>{app.job_opening?.title} Candidate</span>
                </div>
              </div>
            </div>

            <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
              {[
                { label: 'Phone', value: app.phone },
                { label: 'City', value: app.city },
                { label: 'College', value: app.college },
                { label: 'Grad Year', value: app.graduation_year },
                { label: 'Status', value: app.status.toUpperCase(), isStatus: true },
                { label: 'Applied At', value: new Date(app.created_at).toLocaleDateString() },
              ].map(d => (
                <div key={d.label}>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>{d.label}</div>
                  <div style={{ 
                    fontSize: '15px', color: d.isStatus ? 'var(--accent2)' : 'white', fontWeight: '700',
                    background: d.isStatus ? 'rgba(16,185,129,0.1)' : 'transparent',
                    padding: d.isStatus ? '4px 12px' : 0, borderRadius: '8px', display: 'inline-block'
                  }}>{d.value || 'Not provided'}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '40px' }}>
              <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>Cover Letter / Bio</div>
              <div className="glass" style={{ padding: '24px', borderRadius: '16px', fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, background: 'rgba(255,255,255,0.01)' }}>
                {app.cover_letter || 'The candidate did not provide a cover letter.'}
              </div>
            </div>
            
            {app.resume_path && (
              <div style={{ marginTop: '32px' }}>
                <a href={`http://127.0.0.1:8000/storage/${app.resume_path}`} target="_blank" className="hover-glow" style={{ 
                  display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '16px 28px', 
                  background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '16px', color: 'white', textDecoration: 'none', fontWeight: '700', fontSize: '14px'
                }}>
                  <span style={{ fontSize: '18px' }}>󰈙</span> View Original Resume (PDF)
                </a>
              </div>
            )}
          </div>

          <div className="glass" style={{ padding: '40px', borderRadius: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'white', marginBottom: '24px' }}>Decision Audit Trail</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {app.history?.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent)', marginTop: '4px', zIndex: 1, boxShadow: '0 0 10px var(--accent)' }}></div>
                  {i < app.history.length - 1 && <div style={{ position: 'absolute', top: '16px', left: '5.5px', width: '1px', height: 'calc(100% + 4px)', background: 'rgba(255,255,255,0.05)' }}></div>}
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>Status changed to <span style={{ color: 'var(--accent2)' }}>{h.status}</span></div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>{new Date(h.created_at).toLocaleString()} • {h.user?.name || 'Automated System'}</div>
                    {h.notes && <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '8px', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>{h.notes}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Decisions */}
        <div style={{ position: 'sticky', top: '0' }}>
          {['approved', 'rejected'].includes(app.status) ? (
            <div className="glass" style={{ padding: '32px', borderRadius: '24px', background: 'rgba(255,255,255,0.02)', textAlign: 'center' }}>
              <div style={{ 
                width: '60px', height: '60px', borderRadius: '50%', 
                background: app.status === 'approved' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
                fontSize: '24px', color: app.status === 'approved' ? 'var(--accent2)' : 'var(--danger)',
                border: `1px solid ${app.status === 'approved' ? 'var(--accent2)' : 'var(--danger)'}33`
              }}>{app.status === 'approved' ? '✓' : '✕'}</div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'white', marginBottom: '8px' }}>Decision Finalized</h2>
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>This candidate has already been <strong>{app.status}</strong>. No further actions are required.</p>
              <button onClick={() => navigate('/applications')} className="hover-glow" style={{
                marginTop: '24px', padding: '12px 24px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '13px'
              }}>Back to Tracking</button>
            </div>
          ) : (
            <div className="glass" style={{ padding: '32px', borderRadius: '24px', background: 'rgba(255,255,255,0.02)' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'white', marginBottom: '24px' }}>Take Action</h2>
              <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '700', marginBottom: '8px' }}>INTERNAL NOTES</div>
              <textarea 
                value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="Add evaluation notes here..."
                style={{ 
                  width: '100%', height: '140px', background: 'rgba(0,0,0,0.2)', color: 'white', 
                  border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '16px',
                  fontSize: '14px', marginBottom: '24px', outline: 'none', resize: 'none'
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button onClick={() => handleAction('approved')} className="hover-glow" style={{ 
                  padding: '16px', borderRadius: '16px', background: 'var(--accent2)', border: 'none', 
                  color: 'white', fontWeight: '800', fontSize: '14px', cursor: 'pointer' 
                }}>✓ Approve Candidate</button>
                <button onClick={() => handleAction('rejected')} className="hover-glow" style={{ 
                  padding: '16px', borderRadius: '16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', 
                  color: '#ef4444', fontWeight: '800', fontSize: '14px', cursor: 'pointer' 
                }}>✕ Terminate Application</button>
                <button onClick={() => handleAction('reviewed')} className="hover-glow" style={{ 
                  padding: '16px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', 
                  color: 'white', fontWeight: '800', fontSize: '14px', cursor: 'pointer' 
                }}>󰛐 Mark as Reviewed</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}