import { useState, useEffect } from 'react'
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
import Login from './views/Login'
import AdminDashboard from './views/admin/AdminDashboard'
import Solicitudes from './views/admin/Solicitudes'
import TecnicosAdmin from './views/admin/TecnicosAdmin'
import Empresas from './views/admin/Empresas'
import { SOLICITUDES } from './data/adminData'

const DEFAULT_VIEW = { cliente: 'dashboard', admin: 'admin-dashboard' }

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('monitt-theme') || 'dark')
  const [role, setRole] = useState(null) // null | 'cliente' | 'admin'
  const [currentView, setCurrentView] = useState('dashboard')
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [toast, setToast] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [solicitudes, setSolicitudes] = useState(SOLICITUDES)

  useEffect(() => {
    const html = document.documentElement
    theme === 'light' ? html.classList.add('light') : html.classList.remove('light')
    localStorage.setItem('monitt-theme', theme)
  }, [theme])

  const navigate = (view) => {
    setCurrentView(view)
    window.scrollTo(0, 0)
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const completeOrder = () => setOrderCompleted(true)

  const login = (loginRole) => {
    setRole(loginRole)
    setCurrentView(DEFAULT_VIEW[loginRole])
  }

  const logout = () => {
    setRole(null)
    setCurrentView('dashboard')
    setSidebarCollapsed(false)
  }

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
      case 'dashboard':       return <Dashboard navigate={navigate} orderCompleted={orderCompleted} showToast={showToast} />
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
        : <Dashboard navigate={navigate} orderCompleted={orderCompleted} showToast={showToast} />
    }
  }

  if (!role) {
    return <Login onLogin={login} theme={theme} />
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg-page)', color: 'var(--text-primary)' }}>
      <Sidebar
        role={role}
        currentView={currentView}
        navigate={navigate}
        theme={theme}
        setTheme={setTheme}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        orderCompleted={orderCompleted}
        onLogout={logout}
      />
      <main key={currentView} style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <div className="page-fade">
          {renderView()}
        </div>
      </main>
      {toast && <Toast message={toast} />}
    </div>
  )
}

export default App
