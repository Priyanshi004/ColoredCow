import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function JobDetail() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.get(`/api/job-openings/${id}`).then(res => {
      setJob(res.data)
      setLoading(false)
    }).catch(() => navigate('/apply'))
  }, [id])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: 'var(--muted)', fontWeight: '700', letterSpacing: '2px' }}>LOADING JOB DETAILS...</div>
    </div>
  )

  return (
    <div style={{ padding: '80px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div className="glass animate-fade-in" style={{ padding: '48px', borderRadius: '32px' }}>
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <span style={{ 
                padding: '6px 12px', borderRadius: '8px', background: 'rgba(16,185,129,0.1)', 
                color: 'var(--accent2)', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase' 
              }}>{job.department}</span>
              <span style={{ 
                padding: '6px 12px', borderRadius: '8px', background: 'var(--surface2)', 
                color: 'var(--muted)', fontSize: '12px', fontWeight: '800' 
              }}>{job.location}</span>
            </div>
            <h1 style={{ fontSize: '40px', fontWeight: '900', color: 'var(--text)', margin: '0 0 8px', letterSpacing: '-1.5px' }}>{job.title}</h1>
            <div style={{ color: 'var(--muted)', fontWeight: '700', fontSize: '16px' }}>
              Salary: {job.salary_range}
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ color: 'var(--text)', fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>Overview</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '16px' }}>{job.description}</p>
          </div>

          <div style={{ marginBottom: '48px' }}>
            <h3 style={{ color: 'var(--text)', fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>Requirements</h3>
            <div style={{ 
              background: 'var(--surface2)', padding: '24px', borderRadius: '16px',
              color: 'var(--muted)', lineHeight: 1.8, fontSize: '15px', whiteSpace: 'pre-line'
            }}>
              {job.requirements || 'No specific requirements mentioned.'}
            </div>
          </div>

          <button onClick={() => navigate(`/apply-form?jobId=${job.id}`)} className="hover-glow" style={{ 
            width: '100%', padding: '20px', borderRadius: '16px', background: 'var(--accent2)', 
            border: 'none', color: 'white', fontWeight: '800', fontSize: '16px', cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(16, 185, 129, 0.2)'
          }}>Apply for this position</button>
        </div>
      </div>
    </div>
  )
}
