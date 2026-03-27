import React from 'react'
import GlobalHeader from './GlobalHeader'
import GlobalFooter from './GlobalFooter'

export default function CandidateLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <GlobalHeader />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <GlobalFooter />
    </div>
  )
}
