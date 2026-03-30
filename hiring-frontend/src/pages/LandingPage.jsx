import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  const hiringSteps = [
    { title: 'Explore', desc: 'Find the perfect role that matches your skills.', icon: '󰈙', color: 'var(--accent2)' },
    { title: 'Apply', desc: 'Submit your application through our modern portal.', icon: '󰏫', color: 'var(--accent)' },
    { title: 'Screen', desc: 'Quick review by our expert talent acquisition team.', icon: '󰄬', color: 'var(--accent2)' },
    { title: 'Meet', desc: 'Engage in meaningful conversations with the team.', icon: '󰕒', color: 'var(--accent)' },
    { title: 'Join', desc: 'Welcome to the Coloured Cow family!', icon: '󰕔', color: 'var(--accent2)' }
  ]

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Hero Section */}
      <section style={{ 
        minHeight: '80vh', display: 'flex', flexDirection: 'column', 
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '100px 20px', position: 'relative'
      }}>
        {/* Decorative Background */}
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)', filter: 'blur(120px)', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', bottom: '0', right: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0 }}></div>

        <div className="animate-fade-in" style={{ zIndex: 10, maxWidth: '900px' }}>
          <div style={{ 
            display: 'inline-block', padding: '8px 20px', borderRadius: '100px', 
            background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent)', 
            fontSize: '13px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '32px' 
          }}>Join Our Herd</div>
          
          <h1 className="text-gradient" style={{ fontSize: 'clamp(48px, 12vw, 84px)', fontWeight: '900', margin: '0 0 24px', letterSpacing: '-4px', lineHeight: 0.9 }}>
            ColoredCow
          </h1>
          
          <p style={{ color: 'var(--muted)', fontSize: 'clamp(16px, 4vw, 22px)', fontWeight: '500', maxWidth: '650px', margin: '0 auto 48px', lineHeight: 1.5 }}>
            We're building the future of software, one exceptional talent at a time. 
            Experience a hiring process designed for creators, thinkers, and builders.
          </p>
          
          <div className="mobile-stack" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button onClick={() => navigate('/select')} className="hover-glow" style={{ 
              background: 'var(--accent)', color: 'white', border: 'none', 
              padding: '18px 40px', borderRadius: '18px', fontWeight: '800', fontSize: '16px', cursor: 'pointer', width: window.innerWidth < 768 ? '100%' : 'auto'
            }}>Get Started →</button>
            <button onClick={() => {
              document.getElementById('process').scrollIntoView({ behavior: 'smooth' })
            }} style={{ 
              background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)', 
              padding: '18px 40px', borderRadius: '18px', fontWeight: '800', fontSize: '16px', cursor: 'pointer', width: window.innerWidth < 768 ? '100%' : 'auto'
            }}>Learn More</button>
          </div>
        </div>
      </section>

      {/* Hiring Process Section */}
      <section id="process" style={{ padding: '120px 40px', background: 'var(--surface2)', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '40px', fontWeight: '900', color: 'var(--text)', marginBottom: '16px' }}>Our Hiring Journey</h2>
            <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>Transparent, human-centric, and efficient. Here's how we find our next teammates.</p>
          </div>

          <div className="mobile-grid-1" style={{ 
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '32px', position: 'relative' 
          }}>
            {/* Connecting line (hidden on mobile) */}
            <div className="mobile-hide" style={{ 
              position: 'absolute', top: '40px', left: '100px', right: '100px', height: '2px', 
              background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent2) 100%)', opacity: 0.1, zIndex: 0 
            }}></div>

            {hiringSteps.map((step, i) => (
              <div key={i} className="animate-fade-in" style={{ 
                textAlign: 'center', zIndex: 1, animationDelay: `${i * 0.1}s` 
              }}>
                <div style={{ 
                  width: '80px', height: '80px', borderRadius: '24px', 
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '32px', color: step.color, margin: '0 auto 24px',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.05)',
                  position: 'relative'
                }}>
                  {step.icon}
                  <div style={{ 
                    position: 'absolute', top: '-10px', right: '-10px', width: '28px', height: '28px',
                    borderRadius: '50%', background: step.color, color: 'white', fontSize: '12px',
                    fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>{i + 1}</div>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text)', marginBottom: '12px' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '100px 40px', textAlign: 'center' }}>
        <div className="glass" style={{ 
          maxWidth: '800px', margin: '0 auto', padding: '60px', borderRadius: '40px',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)'
        }}>
          <h2 style={{ fontSize: '36px', fontWeight: '900', color: 'var(--text)', marginBottom: '24px' }}>Ready to make an impact?</h2>
          <p style={{ color: 'var(--muted)', fontSize: '18px', marginBottom: '40px' }}>Join a team that values your growth and your unique perspective.</p>
          <button onClick={() => navigate('/select')} className="hover-glow" style={{ 
            background: 'var(--accent)', color: 'white', border: 'none', 
            padding: '18px 48px', borderRadius: '18px', fontWeight: '800', fontSize: '16px', cursor: 'pointer' 
          }}>Browse Opportunities</button>
        </div>
      </section>
    </div>
  )
}
