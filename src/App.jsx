import { useState, useEffect } from 'react'
import { SignedIn, SignedOut, useUser, useClerk } from '@clerk/clerk-react'
import Sidebar from './components/Sidebar'
import Toast from './components/Toast'
import Dashboard from './views/Dashboard'
import AssetDetail from './views/AssetDetail'
import AlertDispatch from './views/AlertDispatch'
import TechnicianView from './views/TechnicianView'
import CloseOut from './views/CloseOut'
import Activos from './views/Activos'
import ActivoDetalle from './views/ActivoDetalle'
import Alertas from './views/Alertas'
import Configuracion from './views/Configuracion'
import SignInView from './views/SignInView'
import PendingActivation from './views/PendingActivation'
import AdminDashboard from './views/admin/AdminDashboard'
import Solicitudes from './views/admin/Solicitudes'
import TecnicosAdmin from './views/admin/TecnicosAdmin'
import Empresas from './views/admin/Empresas'
import { SOLICITUDES } from './data/adminData'

const DEFAULT_VIEW = { cliente: 'dashboard', admin: 'admin-dashboard' }

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('monitt-theme') || 'dark')
  const [currentView, setCurrentView] = useState('dashboard')
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [toast, setToast] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [solicitudes, setSolicitudes] = useState(SOLICITUDES)

  const { user } = useUser()
  const clerk = useClerk()

  // El rol viene de los metadatos públicos del usuario en Clerk; por defecto, "cliente".
  // Para el panel admin, pon { "role": "admin" } en Public metadata del usuario (panel de Clerk).
  const role = user?.publicMetadata?.role === 'admin' ? 'admin' : 'cliente'

  // El cliente queda "amarrado" a su empresa: solo verá los equipos de su companyId.
  const companyId = user?.publicMetadata?.companyId

  // Solo entran a la plataforma los usuarios dados de alta por Monitt:
  // admin interno, o cliente con empresa asignada (companyId en los metadatos de Clerk).
  const isProvisioned = role === 'admin' || Boolean(companyId)

  useEffect(() => {
    const html = document.documentElement
    theme === 'light' ? html.classList.add('light') : html.classList.remove('light')
    localStorage.setItem('monitt-theme', theme)
  }, [theme])

  // Al iniciar sesión, aterriza en la vista por defecto del rol.
  useEffect(() => {
    if (user?.id) setCurrentView(DEFAULT_VIEW[role])
  }, [user?.id, role])

  const navigate = (view) => {
    setCurrentView(view)
    window.scrollTo(0, 0)
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const completeOrder = () => setOrderCompleted(true)

  // Manual reassignment by the admin (overrides the automatic assignment)
  const assignTecnico = (solId, tecId) => {
    setSolicitudes(prev => prev.map(s =>
      s.id === solId ? { ...s, assignedTo: tecId, assignment: 'manual' } : s
    ))
  }

  // Revert a manual override back to Monitt's original automatic assignment
  const reAutoAssign = (solId) => {
    setSolicitudes(prev => prev.map(s =>
      s.id === solId ? { ...s, assignedTo: s.autoTec, assignment: 'auto' } : s
    ))
  }

  const renderView = () => {
    switch (currentView) {
      // Client profile
      case 'dashboard':       return <Dashboard navigate={navigate} orderCompleted={orderCompleted} showToast={showToast} companyId={companyId} />
      case 'activo-gen002':   return <AssetDetail navigate={navigate} />
      case 'alerta-gen002':   return <AlertDispatch navigate={navigate} />
      case 'tecnico-orden001':return <TechnicianView navigate={navigate} />
      case 'cierre-orden001': return <CloseOut navigate={navigate} completeOrder={completeOrder} />
      case 'activos':         return <Activos showToast={showToast} navigate={navigate} />
      case 'activo-gen001':   return <ActivoDetalle navigate={navigate} assetId="GEN-001" />
      case 'activo-gen003':   return <ActivoDetalle navigate={navigate} assetId="GEN-003" />
      case 'alertas':         return <Alertas showToast={showToast} navigate={navigate} />
      case 'config':          return <Configuracion showToast={showToast} />

      // Super admin profile
      case 'admin-dashboard': return <AdminDashboard solicitudes={solicitudes} navigate={navigate} />
      case 'solicitudes':     return <Solicitudes solicitudes={solicitudes} assignTecnico={assignTecnico} reAutoAssign={reAutoAssign} showToast={showToast} />
      case 'tecnicos-admin':  return <TecnicosAdmin showToast={showToast} />
      case 'empresas':        return <Empresas showToast={showToast} />

      default:                return role === 'admin'
        ? <AdminDashboard solicitudes={solicitudes} navigate={navigate} />
        : <Dashboard navigate={navigate} orderCompleted={orderCompleted} showToast={showToast} companyId={companyId} />
    }
  }

  return (
    <>
      {/* Sin sesión → ventana especial de inicio de sesión (Clerk) */}
      <SignedOut>
        <SignInView />
      </SignedOut>

      {/* Con sesión → la plataforma, pero solo si Monitt ya habilitó la cuenta */}
      <SignedIn>
        {!isProvisioned ? (
          <PendingActivation user={user} onLogout={() => clerk.signOut()} />
        ) : (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg-page)', color: 'var(--text-primary)' }}>
          <Sidebar
            role={role}
            user={user}
            currentView={currentView}
            navigate={navigate}
            theme={theme}
            setTheme={setTheme}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
            orderCompleted={orderCompleted}
            onLogout={() => clerk.signOut()}
            onManageAccount={() => clerk.openUserProfile()}
          />
          <main key={currentView} style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
            <div className="page-fade">
              {renderView()}
            </div>
          </main>
          {toast && <Toast message={toast} />}
        </div>
        )}
      </SignedIn>
    </>
  )
}

export default App
