import { ShieldCheck, LogOut } from 'lucide-react'
import Logo from '../components/Logo'

// Pantalla para usuarios autenticados que AÚN NO están habilitados por Monitt.io.
// El acceso real se activa cuando Monitt da de alta al cliente (companyId en Clerk).
export default function PendingActivation({ user, onLogout }) {
  const email = user?.primaryEmailAddress?.emailAddress || 'tu cuenta'
  const AMBER = '#F59E0B'
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111113', position: 'relative', overflow: 'hidden', padding: '24px' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, rgba(245,158,11,0.12) 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.5 }} />
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: '640px', height: '420px', background: 'radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', width: '100%', maxWidth: '440px', animation: 'loginEnter 350ms ease-out forwards' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'inline-flex', ['--logo-ink']: '#FFFFFF' }}><Logo height={34} /></div>
        </div>

        <div style={{ background: '#1A1A1E', border: '1px solid #2C2C34', borderRadius: '14px', padding: '32px', boxShadow: '0 24px 48px rgba(0,0,0,0.35)', textAlign: 'center' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(245,158,11,0.14)', border: '1px solid rgba(245,158,11,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
            <ShieldCheck size={24} style={{ color: AMBER }} />
          </div>

          <h1 style={{ fontSize: '19px', fontWeight: 700, color: '#fff', margin: '0 0 10px' }}>Cuenta pendiente de habilitación</h1>
          <p style={{ fontSize: '13px', color: '#9898A6', lineHeight: 1.6, margin: '0 0 8px' }}>
            Iniciaste sesión como <strong style={{ color: '#fff' }}>{email}</strong>, pero tu acceso a la plataforma aún no está habilitado por Monitt.io.
          </p>
          <p style={{ fontSize: '13px', color: '#9898A6', lineHeight: 1.6, margin: '0 0 24px' }}>
            El acceso se activa cuando instalamos y vinculamos tu hardware. Si ya lo tienes y crees que es un error, contacta a tu ejecutivo de Monitt.io.
          </p>

          <button onClick={onLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'transparent', border: '1px solid #2C2C34', color: '#9898A6', borderRadius: '8px', padding: '11px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            <LogOut size={15} /> Cerrar sesión
          </button>
        </div>

        <p style={{ textAlign: 'center', fontSize: '11px', color: '#5A5A6E', marginTop: '18px' }}>monitt.io · acceso exclusivo para clientes habilitados</p>
      </div>

      <style>{`@keyframes loginEnter { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  )
}
