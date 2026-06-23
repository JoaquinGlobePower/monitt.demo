import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Toast from './components/Toast'
import Dashboard from './views/Dashboard'
import AssetDetail from './views/AssetDetail'
import AlertDispatch from './views/AlertDispatch'
import TechnicianView from './views/TechnicianView'
import CloseOut from './views/CloseOut'

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('monitt-theme') || 'dark')
  const [currentView, setCurrentView] = useState('dashboard')
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [toast, setToast] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

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

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':       return <Dashboard navigate={navigate} orderCompleted={orderCompleted} showToast={showToast} />
      case 'activo-gen002':   return <AssetDetail navigate={navigate} />
      case 'alerta-gen002':   return <AlertDispatch navigate={navigate} />
      case 'tecnico-orden001':return <TechnicianView navigate={navigate} />
      case 'cierre-orden001': return <CloseOut navigate={navigate} completeOrder={completeOrder} />
      default:                return <Dashboard navigate={navigate} orderCompleted={orderCompleted} showToast={showToast} />
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg-page)', color: 'var(--text-primary)' }}>
      <Sidebar
        currentView={currentView}
        navigate={navigate}
        theme={theme}
        setTheme={setTheme}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        orderCompleted={orderCompleted}
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
