import React from 'react'
import CandidateLayout from '../components/CandidateLayout'

export default function Help() {
  return (
    <CandidateLayout>
      <div style={{ padding: '80px 40px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="text-gradient" style={{ fontSize: '48px', fontWeight: '900', marginBottom: '24px' }}>How can we help?</h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', marginBottom: '40px' }}>Frequently asked questions and support resources.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { q: "How do I track my application?", a: "Once you submit your application, you will receive a confirmation. Our recruiters will reach out to you directly via email for further updates." },
            { q: "Can I apply for multiple positions?", a: "Yes, you can apply for any position that matches your skill set. However, we recommend focusing on the roles where you can make the most impact." },
            { q: "What should I include in my cover letter?", a: "Tell us about your passion, your unique experiences, and why you want to join Coloured Cow specifically." },
            { q: "Technical issues with the portal?", a: "If you encounter any bugs, please contact us at support@colouredcow.com or call our help desk." }
          ].map((item, i) => (
            <div key={i} className="glass" style={{ padding: '24px 32px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '18px', color: 'var(--text)' }}>{item.q}</h3>
              <p style={{ margin: 0, fontSize: '15px', color: 'var(--muted)', lineHeight: '1.6' }}>{item.a}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '56px', textAlign: 'center', padding: '40px', background: 'var(--surface2)', borderRadius: '24px' }}>
          <h2 style={{ margin: '0 0 12px', color: 'var(--text)' }}>Still have questions?</h2>
          <p style={{ color: 'var(--muted)' }}>Our team is always here to help you.</p>
          <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--accent)', marginTop: '16px' }}>+91 98765 43210</div>
        </div>
      </div>
    </CandidateLayout>
  )
}
