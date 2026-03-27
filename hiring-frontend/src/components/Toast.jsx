import { useState, useEffect, createContext, useContext } from 'react'

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          background: 'rgba(20, 20, 30, 0.8)', backdropFilter: 'blur(12px)',
          border: `1px solid ${toast.type === 'error' ? 'rgba(255,94,125,0.3)' : 'rgba(0,242,195,0.3)'}`,
          borderRadius: '16px', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)', color: 'white',
          animation: 'toast-in 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards'
        }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: toast.type === 'error' ? 'var(--danger)' : 'var(--accent2)',
            boxShadow: `0 0 10px ${toast.type === 'error' ? 'var(--danger)' : 'var(--accent2)'}`
          }} />
          <span style={{ fontSize: '14px', fontWeight: '600' }}>{toast.message}</span>
          <style>{`
            @keyframes toast-in {
              from { transform: translateY(100%) scale(0.9); opacity: 0; }
              to { transform: translateY(0) scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
