import React from 'react'
import CandidateLayout from '../components/CandidateLayout'

export default function About() {
  return (
    <CandidateLayout>
      <div style={{ padding: '80px 40px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="text-gradient" style={{ fontSize: '48px', fontWeight: '900', marginBottom: '24px' }}>About Coloured Cow</h1>
        <div className="glass" style={{ padding: '40px', borderRadius: '24px', lineHeight: '1.8', color: 'var(--text)' }}>
          <p style={{ fontSize: '18px', marginBottom: '24px' }}>
            We are a forward-thinking organization dedicated to technology, creativity, and human-centric solutions.
          </p>
          <p>
            The Coloured Cow Hiring Portal is designed to streamline our recruitment process and ensure that every candidate has a fair, transparent, and engaging experience. We believe in potential, passion, and the power of diverse perspectives.
          </p>
          <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ padding: '24px', border: '1px solid var(--border)', borderRadius: '16px' }}>
              <h3 style={{ margin: '0 0 8px', color: 'var(--accent)' }}>Our Vision</h3>
              <p style={{ fontSize: '14px', margin: 0, color: 'var(--muted)' }}>To build a world where talent meets opportunity seamlessly.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid var(--border)', borderRadius: '16px' }}>
              <h3 style={{ margin: '0 0 8px', color: 'var(--accent2)' }}>Our Culture</h3>
              <p style={{ fontSize: '14px', margin: 0, color: 'var(--muted)' }}>Innovation driven by empathy and a love for excellence.</p>
            </div>
          </div>
        </div>
      </div>
    </CandidateLayout>
  )
}
