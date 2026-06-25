import { SignIn, SignUp } from '@clerk/clerk-react'
import Logo from '../components/Logo'

// "Ventana especial" de inicio de sesión: el shell visual de Monitt envuelve
// el <SignIn/> de Clerk, que aporta Google y email/contraseña (con ver/ocultar)
// y recuperación de contraseña. (MFA queda fuera del MVP: es plan de pago en Clerk.)
// La pantalla es siempre oscura, independiente del tema de la plataforma.
export default function SignInView() {
  // Si la URL trae el ticket de invitación de Clerk, mostramos el alta (fijar contraseña / Google).
  const invited = new URLSearchParams(window.location.search).has('__clerk_ticket')
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#111113',
      position: 'relative',
      overflow: 'hidden',
      padding: '24px',
    }}>
      {/* Grilla de puntos de fondo */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(48,191,18,0.18) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        opacity: 0.6,
      }} />

      {/* Resplandor ambiental */}
      <div style={{
        position: 'absolute', top: '28%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '680px', height: '460px',
        background: 'radial-gradient(ellipse, rgba(48,191,18,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '420px',
        animation: 'loginEnter 350ms ease-out forwards',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Logo + insignia. Forzamos el logo en blanco con --logo-ink. */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', marginBottom: '16px', ['--logo-ink']: '#FFFFFF' }}>
            <Logo height={38} />
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            background: '#1A1A1E', border: '1px solid #2C2C34',
            borderRadius: '20px', padding: '4px 12px',
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#30BF12' }} />
            <span style={{ fontSize: '12px', color: '#9898A6', fontWeight: 500 }}>
              {invited ? 'Activa tu acceso · invitación de Monitt.io' : 'Plataforma de monitoreo predictivo'}
            </span>
          </div>
        </div>

        {/* Sin sesión: con invitación → alta de cuenta; si no → inicio de sesión (sin registro público) */}
        {invited
          ? <SignUp routing="virtual" />
          : <SignIn routing="virtual" appearance={{ elements: { footerAction: { display: 'none' } } }} />
        }

        <p style={{ textAlign: 'center', fontSize: '11px', color: '#5A5A6E', marginTop: '20px' }}>
          monitt.io · Plataforma de monitoreo predictivo
        </p>
      </div>

      <style>{`
        @keyframes loginEnter {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
