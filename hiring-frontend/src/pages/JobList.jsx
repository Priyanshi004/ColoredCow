import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'


export default function JobList() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/api/job-openings').then(res => {
      setJobs(res.data)
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ color: 'var(--muted)', fontWeight: '700', letterSpacing: '2px' }}>LOADING OPPORTUNITIES...</div>
    </div>
  )

  return (
    <div className="mobile-padding" style={{ padding: '80px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(32px, 8vw, 48px)', fontWeight: '900', margin: '0 0 16px', letterSpacing: '-2px' }}>
            Open Positions
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '18px', fontWeight: '500' }}>
            Join our mission to build the future of software development.
          </p>
        </div>

        <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {jobs.map((job, i) => (
            <div key={job.id} className="glass hover-glow animate-fade-in" 
              style={{ padding: '32px', borderRadius: '24px', animationDelay: `${i * 0.1}s` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <span style={{ 
                  padding: '6px 12px', borderRadius: '8px', background: 'rgba(16,185,129,0.1)', 
                  color: 'var(--accent2)', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase' 
                }}>{job.department}</span>
                <span style={{ color: 'var(--muted)', fontSize: '13px', fontWeight: '600' }}>{job.location}</span>
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text)', marginBottom: '12px' }}>{job.title}</h2>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '24px', height: '44px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {job.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: 'var(--text)', fontWeight: '700', fontSize: '14px' }}>
                  {job.salary_range}
                </div>
                <button onClick={() => navigate(`/jobs/${job.id}`)} style={{ 
                  background: 'var(--accent)', color: 'white', border: 'none', 
                  padding: '10px 20px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer',
                  fontSize: '13px'
                }}>View Details →</button>
              </div>
            </div>
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="glass" style={{ padding: '60px', textAlign: 'center', borderRadius: '32px' }}>
            <p style={{ color: 'var(--muted)', fontSize: '16px', fontWeight: '600' }}>We don't have any open positions at the moment. Please check back later!</p>
          </div>
        )}
      </div>
    </div>
  )
}
