import { LayoutDashboard, Cpu, Bell, Wrench, Settings, Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'activos',   label: 'Activos',   icon: Cpu },
  { id: 'alertas',   label: 'Alertas',   icon: Bell },
  { id: 'tecnicos',  label: 'Técnicos',  icon: Wrench },
  { id: 'config',    label: 'Configuración', icon: Settings },
]

export default function Sidebar({ currentView, navigate, theme, setTheme, collapsed, setCollapsed, orderCompleted }) {
  const alertCount = orderCompleted ? 0 : 1

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
      color: isActive ? 'var(--green-500)' : 'var(--text-secondary)',
      fontSize: '14px',
      fontWeight: isActive ? 500 : 400,
      transition: 'all 150ms',
      justifyContent: collapsed ? 'center' : 'flex-start',
      fontFamily: 'inherit',
    }),
    badge: {
      marginLeft: 'auto',
      background: '#F59E0B',
      color: '#000',
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
    themeBtn: {
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
      background: 'var(--green-700)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '11px',
      fontWeight: 700,
      color: 'var(--green-400)',
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
    if (id === 'dashboard') return currentView === 'dashboard'
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

      {/* Client name */}
      {!collapsed && (
        <div style={s.client}>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0 0 2px' }}>Cliente</p>
          <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', margin: 0 }}>
            TransAndina Logística
          </p>
        </div>
      )}

      {/* Navigation */}
      <nav style={s.nav}>
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = isActive(id)
          const showBadge = id === 'alertas' && alertCount > 0

          return (
            <button
              key={id}
              onClick={() => id === 'dashboard' ? navigate('dashboard') : null}
              style={s.navBtn(active)}
            >
              <Icon size={16} style={{ flexShrink: 0 }} />
              {!collapsed && <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>}
              {!collapsed && showBadge && <span style={s.badge}>{alertCount}</span>}
              {collapsed && showBadge && (
                <span style={{ ...s.badge, position: 'absolute', top: 4, right: 4, width: '14px', height: '14px', fontSize: '9px' }}>
                  {alertCount}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom */}
      <div style={s.bottom}>
        <button style={s.themeBtn} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          {!collapsed && <span>{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span>}
        </button>

        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', marginTop: '4px' }}>
            <div style={s.avatar}>RF</div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>Rob Fuentes</p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>v0.1 demo</p>
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
