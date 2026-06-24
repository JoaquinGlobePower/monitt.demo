import { LayoutDashboard, Cpu, Bell, Settings, Sun, Moon, ChevronLeft, ChevronRight, Inbox, Users, Building2, ShieldCheck, LogOut } from 'lucide-react'

const NAV_CLIENTE = [
  { id: 'dashboard', label: 'Dashboard',     icon: LayoutDashboard },
  { id: 'activos',   label: 'Activos',       icon: Cpu },
  { id: 'alertas',   label: 'Alertas',       icon: Bell },
  { id: 'config',    label: 'Configuración', icon: Settings },
]

const NAV_ADMIN = [
  { id: 'admin-dashboard', label: 'Resumen',     icon: LayoutDashboard },
  { id: 'solicitudes',     label: 'Solicitudes', icon: Inbox },
  { id: 'tecnicos-admin',  label: 'Técnicos',    icon: Users },
  { id: 'empresas',        label: 'Empresas',    icon: Building2 },
]

export default function Sidebar({ role, currentView, navigate, theme, setTheme, collapsed, setCollapsed, orderCompleted, onLogout }) {
  const isAdmin = role === 'admin'
  const navItems = isAdmin ? NAV_ADMIN : NAV_CLIENTE

  // Badge: client → active alerts. (Admin requests auto-assign, so no pending backlog.)
  const clientAlertCount = orderCompleted ? 0 : 1
  const badgeFor = (id) => {
    if (!isAdmin && id === 'alertas') return clientAlertCount
    return 0
  }

  const accent = isAdmin ? '#8B5CF6' : '#30BF12'

  const s = {
    aside: {
      width: collapsed ? '64px' : '240px',
      transition: 'width 200ms ease',
      background: 'var(--bg-surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      position: 'relative',
      zIndex: 10,
    },
    logo: {
      padding: collapsed ? '20px 0' : '20px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      justifyContent: collapsed ? 'center' : 'flex-start',
    },
    dot: { width: '8px', height: '8px', borderRadius: '50%', background: '#30BF12', flexShrink: 0 },
    client: { padding: '0 16px 16px', borderBottom: '1px solid var(--border)' },
    nav: { padding: '8px', flex: 1 },
    navBtn: (isActive) => ({
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px 10px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      marginBottom: '2px',
      background: isActive ? 'var(--bg-elevated)' : 'transparent',
      color: isActive ? accent : 'var(--text-secondary)',
      fontSize: '14px',
      fontWeight: isActive ? 500 : 400,
      transition: 'all 150ms',
      justifyContent: collapsed ? 'center' : 'flex-start',
      fontFamily: 'inherit',
    }),
    badge: {
      marginLeft: 'auto',
      background: isAdmin ? '#EF4444' : '#F59E0B',
      color: isAdmin ? '#fff' : '#000',
      fontSize: '11px',
      fontWeight: 700,
      width: '18px',
      height: '18px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    bottom: { padding: '12px 8px', borderTop: '1px solid var(--border)' },
    actionBtn: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px 10px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      background: 'transparent',
      color: 'var(--text-secondary)',
      fontSize: '13px',
      justifyContent: collapsed ? 'center' : 'flex-start',
      fontFamily: 'inherit',
      transition: 'color 150ms',
    },
    avatar: {
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      background: isAdmin ? 'rgba(139,92,246,0.15)' : 'var(--green-700)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '11px',
      fontWeight: 700,
      color: isAdmin ? '#8B5CF6' : 'var(--green-400)',
      flexShrink: 0,
    },
    collapseBtn: {
      position: 'absolute',
      top: '50%',
      right: '-12px',
      transform: 'translateY(-50%)',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      border: '1px solid var(--border)',
      background: 'var(--bg-surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: 'var(--text-muted)',
      zIndex: 20,
    },
  }

  const isActive = (id) => {
    if (id === 'dashboard')      return currentView === 'dashboard'
    if (id === 'activos')        return ['activos', 'activo-gen001', 'activo-gen002', 'activo-gen003'].includes(currentView)
    if (id === 'alertas')        return currentView === 'alertas' || currentView === 'alerta-gen002'
    if (id === 'config')         return currentView === 'config'
    if (id === 'admin-dashboard')return currentView === 'admin-dashboard'
    if (id === 'solicitudes')    return currentView === 'solicitudes'
    if (id === 'tecnicos-admin') return currentView === 'tecnicos-admin'
    if (id === 'empresas')       return currentView === 'empresas'
    return false
  }

  return (
    <aside style={s.aside}>
      {/* Logo */}
      <div style={s.logo}>
        <div style={s.dot} />
        {!collapsed && (
          <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>
            monitt
          </span>
        )}
      </div>

      {/* Context: client name or admin panel */}
      {!collapsed && (
        <div style={s.client}>
          {isAdmin ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '26px', height: '26px', borderRadius: '6px', flexShrink: 0,
                background: 'rgba(139,92,246,0.15)', color: '#8B5CF6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ShieldCheck size={14} />
              </div>
              <div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>Panel interno</p>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#8B5CF6', margin: 0 }}>Super admin</p>
              </div>
            </div>
          ) : (
            <>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0 0 2px' }}>Cliente</p>
              <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', margin: 0 }}>
                TransAndina Logística
              </p>
            </>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav style={s.nav}>
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = isActive(id)
          const count = badgeFor(id)
          const showBadge = count > 0

          return (
            <button key={id} onClick={() => navigate(id)} style={s.navBtn(active)}>
              <Icon size={16} style={{ flexShrink: 0 }} />
              {!collapsed && <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>}
              {!collapsed && showBadge && <span style={s.badge}>{count}</span>}
              {collapsed && showBadge && (
                <span style={{ ...s.badge, position: 'absolute', top: 4, right: 4, width: '14px', height: '14px', fontSize: '9px' }}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom */}
      <div style={s.bottom}>
        <button style={s.actionBtn} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          {!collapsed && <span>{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span>}
        </button>

        <button
          style={s.actionBtn}
          onClick={onLogout}
          onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <LogOut size={16} />
          {!collapsed && <span>Cerrar sesión</span>}
        </button>

        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', marginTop: '4px' }}>
            <div style={s.avatar}>{isAdmin ? 'MO' : 'RF'}</div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>
                {isAdmin ? 'Monitt.io' : 'Rob Fuentes'}
              </p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
                {isAdmin ? 'Super admin' : 'Supervisor'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button style={s.collapseBtn} onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  )
}
