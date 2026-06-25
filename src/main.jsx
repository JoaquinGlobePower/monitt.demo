import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { esES } from '@clerk/localizations'
import './index.css'
import App from './App.jsx'

// Publishable key de Clerk. Se lee desde .env.local (VITE_CLERK_PUBLISHABLE_KEY).
// Es pública (segura de exponer en el frontend); el secret key NO se usa aquí.
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// Tema de los componentes de Clerk para que combinen con la plataforma (oscuro + verde Monitt).
const clerkAppearance = {
  variables: {
    colorPrimary: '#30BF12',
    colorBackground: '#1A1A1E',
    colorInputBackground: '#222228',
    colorInputText: '#FFFFFF',
    colorText: '#FFFFFF',
    colorTextSecondary: '#9898A6',
    colorTextOnPrimaryBackground: '#FFFFFF',
    borderRadius: '8px',
    fontFamily: 'inherit',
  },
  elements: {
    card: { boxShadow: '0 24px 48px rgba(0,0,0,0.35)' },
  },
}

// Pantalla amable cuando falta la key, en vez de un error en blanco.
function MissingKey() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#111113', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: 24,
    }}>
      <div style={{ maxWidth: 460, background: '#1A1A1E', border: '1px solid #2C2C34', borderRadius: 14, padding: 28 }}>
        <h1 style={{ fontSize: 18, margin: '0 0 10px' }}>Falta la clave de Clerk</h1>
        <p style={{ fontSize: 14, color: '#9898A6', lineHeight: 1.6, margin: '0 0 14px' }}>
          Para activar el inicio de sesión, crea una cuenta gratis en{' '}
          <a href="https://dashboard.clerk.com" target="_blank" rel="noreferrer" style={{ color: '#30BF12' }}>dashboard.clerk.com</a>,
          copia tu <strong>Publishable key</strong> y pégala en el archivo <code style={{ color: '#A8E63D' }}>.env.local</code>:
        </p>
        <pre style={{ background: '#111113', border: '1px solid #2C2C34', borderRadius: 8, padding: '12px 14px', fontSize: 12, color: '#A8E63D', overflowX: 'auto', margin: 0 }}>
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...</pre>
        <p style={{ fontSize: 13, color: '#5A5A6E', margin: '14px 0 0' }}>Luego reinicia <code>npm run dev</code>.</p>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {PUBLISHABLE_KEY ? (
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        appearance={clerkAppearance}
        localization={esES}
        afterSignOutUrl="/"
      >
        <App />
      </ClerkProvider>
    ) : (
      <MissingKey />
    )}
  </StrictMode>,
)
