import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCredentials } from '../store/authSlice'
import { useToast } from '../components/Toast'
import api from '../api/axios'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.get('/sanctum/csrf-cookie')
      const res = await api.post('/api/login', form)
      dispatch(setCredentials(res.data))
      showToast('Successfully authenticated')
      navigate('/dashboard')
    } catch {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '8px',
    background: 'var(--surface2)', border: '1px solid var(--border)',
    color: 'var(--text)', fontSize: '14px', outline: 'none',
    boxSizing: 'border-box', transition: 'border-color 0.15s',
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Dynamic Background Blobs */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124, 114, 255, 0.15) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', left: '-5%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 242, 195, 0.1) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div className="glass animate-fade-in" style={{
        borderRadius: '32px', padding: '56px 48px', width: '100%', maxWidth: '420px',
        position: 'relative', zIndex: 1, boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="hover-glow" style={{
            width: '64px', height: '64px', borderRadius: '18px',
            background: 'linear-gradient(135deg, var(--accent), #a78bfa)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', fontWeight: '800', color: 'white',
            margin: '0 auto 20px', boxShadow: '0 8px 16px rgba(124, 114, 255, 0.4)',
          }}>C</div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text)', margin: '0 0 8px', letterSpacing: '-1px' }}>Admin Login</h1>
          <p style={{ color: 'var(--muted)', fontSize: '15px', margin: 0, fontWeight: '500' }}>Enter your credentials to continue</p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(255,94,125,0.1)', border: '1px solid rgba(255,94,125,0.2)',
            borderRadius: '12px', padding: '12px 16px', marginBottom: '24px',
            color: 'var(--danger)', fontSize: '13px', fontWeight: '600', textAlign: 'center',
          }}>{error}</div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginBottom: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Corporate Email</label>
            <input
              type="email" placeholder="admin@coloredcow.com"
              style={inputStyle} className="hover-glow" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginBottom: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Secure Password</label>
            <input
              type="password" placeholder="••••••••"
              style={inputStyle} className="hover-glow" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="hover-glow" style={{
            marginTop: '12px', padding: '16px', borderRadius: '16px',
            background: 'linear-gradient(135deg, var(--accent), #9333ea)',
            border: 'none', color: 'white', fontWeight: '800', fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(124, 114, 255, 0.3)',
          }}>
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
          </button>
        </form>

        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '500' }}>
            Authorized HR Access Only
          </p>
        </div>
      </div>
    </div>
  )
}