import { useState } from 'react'
import { Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react'
import Logo from '../components/Logo'

// Credentials are intentionally NOT shown in the UI.
const ACCOUNTS = [
  { role: 'cliente', user: 'cbravo@transandina.cl', pass: 'Monitt2026' },
  { role: 'admin',   user: 'admin@monitt.io',       pass: 'Admin2026' },
]

export default function Login({ onLogin, theme }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError]       = useState(false)
  const [loading, setLoading]   = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(false)
    setLoading(true)
    setTimeout(() => {
      const match = ACCOUNTS.find(a => a.user === email.trim() && a.pass === password)
      if (match) {
        onLogin(match.role)
      } else {
        setError(true)
        setLoading(false)
      }
    }, 700)
  }

  const inputStyle = (focused) => ({
    width: '100%',
    background: 'var(--bg-elevated)',
    border: `1px solid ${focused ? 'var(--green-500)' : 'var(--border)'}`,
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '14px',
    color: 'var(--text-primary)',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    transition: 'border-color 150ms',
  })

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-page)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Dot grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, var(--grid-dot) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        opacity: 0.6,
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(48,191,18,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Card */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '400px',
        margin: '24px',
        animation: 'loginEnter 350ms ease-out forwards',
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <Logo height={40} />
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'var(--bg-elevated)', border: '1px solid var(--border)',
            borderRadius: '20px', padding: '4px 12px',
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#30BF12' }} />
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Plataforma de monitoreo predictivo
            </span>
          </div>
        </div>

        {/* Form card */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '32px',
          boxShadow: '0 24px 48px rgba(0,0,0,0.3)',
        }}>
          <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 6px' }}>
            Bienvenido
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 28px' }}>
            Ingresa tus credenciales para continuar
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Email */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Usuario
              </label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(false) }}
                placeholder="correo@empresa.cl"
                required
                style={inputStyle(false)}
                onFocus={e => e.target.style.borderColor = 'var(--green-500)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Contraseña
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(false) }}
                  placeholder="••••••••"
                  required
                  style={{ ...inputStyle(false), paddingRight: '42px' }}
                  onFocus={e => e.target.style.borderColor = 'var(--green-500)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--text-muted)', padding: 0, display: 'flex', alignItems: 'center',
                  }}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
                borderRadius: '7px', padding: '10px 12px',
              }}>
                <AlertCircle size={14} style={{ color: '#EF4444', flexShrink: 0 }} />
                <span style={{ fontSize: '12px', color: '#EF4444' }}>
                  Credenciales incorrectas. Intenta de nuevo.
                </span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '11px',
                background: loading ? 'var(--green-600)' : 'var(--green-500)',
                border: 'none', borderRadius: '8px',
                color: '#fff', fontSize: '14px', fontWeight: 600,
                cursor: loading ? 'default' : 'pointer',
                fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'background 150ms',
                marginTop: '4px',
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: '14px', height: '14px', borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff',
                    display: 'inline-block',
                    animation: 'spin 600ms linear infinite',
                  }} />
                  Verificando…
                </>
              ) : (
                <>Ingresar <ArrowRight size={15} /></>
              )}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', marginTop: '24px' }}>
          monitt.io · Plataforma de monitoreo predictivo v0.1 demo
        </p>
      </div>

      <style>{`
        @keyframes loginEnter {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        :root      { --grid-dot: rgba(48,191,18,0.18); }
        :root.light { --grid-dot: rgba(0,0,0,0.08); }
      `}</style>
    </div>
  )
}
