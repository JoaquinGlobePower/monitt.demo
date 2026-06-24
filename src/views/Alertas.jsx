import { AlertTriangle, CheckCircle, Clock, Filter, Bell, ChevronRight, Sparkles, Activity, ClipboardCheck } from 'lucide-react'
import { useState } from 'react'

const ALERTS = [
  {
    id: 'ALT-025',
    type: 'operational',
    severity: 'critical',
    asset: 'GEN-003',
    title: 'Nivel de aceite bajo — requiere intervención',
    description: 'Sensor de nivel de aceite registra 18% — umbral crítico es 25%. El generador no puede operar de forma segura. Se requiere técnico para reposición inmediata.',
    location: 'Bodega Sur — San Bernardo',
    time: 'Hace 2 horas',
    date: '25 may 2026',
    status: 'active',
    assignee: null,
    orderId: null,
    demoTarget: null,
  },
  {
    id: 'ALT-024',
    type: 'operational',
    severity: 'warning',
    asset: 'GEN-002',
    title: 'Anomalía en sistema de lubricación',
    description: 'Sensor de presión de aceite registra valores fuera del rango nominal desde hace 5 días. El modelo predictivo estima 73% de probabilidad de falla en los próximos 7 días.',
    location: 'Bodega Sur — San Bernardo',
    time: 'Hace 5 días',
    date: '20 may 2026',
    status: 'active',
    assignee: 'Carlos Méndez',
    orderId: 'ORD-001',
    demoTarget: 'alerta-gen002',
  },
  {
    id: 'ALT-023',
    type: 'predictive',
    severity: 'info',
    asset: 'GEN-001',
    title: 'Mantención preventiva recomendada por IA',
    description: 'El modelo predictivo estima un 81% de probabilidad de falla menor en los próximos 45 días si no se realiza mantención. El activo se encuentra dentro del rango operativo.',
    location: 'Bodega Norte — Quilicura',
    time: 'Hace 3 días',
    date: '22 may 2026',
    status: 'active',
    assignee: null,
    orderId: null,
    demoTarget: null,
  },
  {
    id: 'ALT-022',
    type: 'operational',
    severity: 'warning',
    asset: 'GEN-003',
    title: 'Temperatura de refrigerante elevada',
    description: 'Registro temporal de temperatura alta durante período de alta carga. Volvió a rango normal de forma autónoma.',
    location: 'Bodega Sur — San Bernardo',
    time: 'Hace 12 días',
    date: '13 may 2026',
    status: 'resolved',
    assignee: 'Luis Torres',
    orderId: 'ORD-000',
    demoTarget: null,
  },
  {
    id: 'ALT-021',
    type: 'post-revision',
    severity: 'critical',
    asset: 'GEN-001',
    title: 'Desgaste crítico detectado post-revisión',
    description: 'Técnico Carlos Méndez detectó desgaste severo en cojinetes del alternador durante visita de mantención ORD-999. El activo requería intervención mayor no anticipada.',
    location: 'Bodega Norte — Quilicura',
    time: 'Hace 18 días',
    date: '07 may 2026',
    status: 'resolved',
    assignee: 'Carlos Méndez',
    orderId: 'ORD-999',
    demoTarget: null,
  },
]

const SEVERITY_CONFIG = {
  critical: { color: '#EF4444', bg: 'rgba(239,68,68,0.08)', label: 'Crítica', icon: AlertTriangle },
  warning:  { color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', label: 'Atención', icon: AlertTriangle },
  info:     { color: '#3B82F6', bg: 'rgba(59,130,246,0.08)', label: 'Info', icon: Bell },
}

const TYPE_CONFIG = {
  predictive:      { label: 'IA Predictiva',  icon: Sparkles,       color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)' },
  operational:     { label: 'Operacional',    icon: Activity,       color: '#0EA5E9', bg: 'rgba(14,165,233,0.1)' },
  'post-revision': { label: 'Post-revisión',  icon: ClipboardCheck, color: '#F97316', bg: 'rgba(249,115,22,0.1)' },
}

function TypeLegend() {
  const items = [
    {
      ...TYPE_CONFIG.predictive,
      key: 'predictive',
      desc: 'El modelo de IA detecta un patrón de riesgo antes de que ocurra la falla. La acción es preventiva.',
    },
    {
      ...TYPE_CONFIG.operational,
      key: 'operational',
      desc: 'Un sensor superó un umbral crítico en tiempo real. Requiere acción inmediata del técnico.',
    },
    {
      ...TYPE_CONFIG['post-revision'],
      key: 'post-revision',
      desc: 'El técnico encontró una condición grave durante la visita. Nace después de la revisión presencial.',
    },
  ]

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px',
    }}>
      {items.map(({ key, label, icon: Icon, color, bg, desc }) => (
        <div key={key} style={{
          background: 'var(--bg-surface)', border: `1px solid var(--border)`,
          borderLeft: `3px solid ${color}`,
          borderRadius: '10px', padding: '14px 16px',
          display: 'flex', flexDirection: 'column', gap: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '26px', height: '26px', borderRadius: '6px', background: bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon size={13} style={{ color }} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{label}</span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{desc}</p>
        </div>
      ))}
    </div>
  )
}

function AlertRow({ alert, showToast, navigate, last }) {
  const cfg = SEVERITY_CONFIG[alert.severity]
  const tcfg = TYPE_CONFIG[alert.type]
  const Icon = cfg.icon
  const TypeIcon = tcfg.icon
  const isActive = alert.status === 'active'

  const iconColor  = isActive ? cfg.color : 'var(--text-muted)'
  const iconBg     = isActive ? cfg.bg    : 'var(--bg-elevated)'
  const badgeColor = isActive ? cfg.color : 'var(--text-muted)'
  const badgeBg    = isActive ? cfg.bg    : 'var(--bg-elevated)'
  const rowBg      = isActive && alert.severity !== 'info' ? cfg.bg : 'transparent'
  const titleColor = isActive ? 'var(--text-primary)' : 'var(--text-secondary)'

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '32px 1fr 140px 120px 130px 110px',
      alignItems: 'center',
      gap: '16px',
      padding: '14px 20px',
      borderBottom: last ? 'none' : '1px solid var(--border)',
      background: rowBg,
      opacity: isActive ? 1 : 0.6,
    }}>
      {/* Severity icon */}
      <div style={{
        width: '28px', height: '28px', borderRadius: '6px', background: iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Icon size={14} style={{ color: iconColor }} />
      </div>

      {/* Description */}
      <div>
        <p style={{ fontSize: '13px', fontWeight: 500, color: titleColor, margin: '0 0 3px' }}>{alert.title}</p>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 5px', lineHeight: 1.4 }}>
          {alert.asset} · {alert.location}
        </p>
        {/* Type chip */}
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '4px',
          fontSize: '11px', fontWeight: 500,
          color: isActive ? tcfg.color : 'var(--text-muted)',
          background: isActive ? tcfg.bg : 'var(--bg-elevated)',
          padding: '2px 7px', borderRadius: '4px',
        }}>
          <TypeIcon size={10} />
          {tcfg.label}
        </span>
      </div>

      {/* Severity badge */}
      <span style={{
        fontSize: '11px', fontWeight: 600, color: badgeColor,
        background: badgeBg, padding: '3px 8px', borderRadius: '4px', width: 'fit-content',
      }}>
        {cfg.label}
      </span>

      {/* Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {isActive
          ? <Clock size={12} style={{ color: '#F59E0B' }} />
          : <CheckCircle size={12} style={{ color: 'var(--text-muted)' }} />
        }
        <span style={{ fontSize: '12px', color: isActive ? '#F59E0B' : 'var(--text-muted)' }}>
          {isActive ? 'Activa' : 'Resuelta'}
        </span>
      </div>

      {/* Time */}
      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{alert.time}</span>

      {/* Action */}
      <button
        onClick={() => alert.demoTarget ? navigate(alert.demoTarget) : showToast('Vista de detalle no disponible en esta demo.')}
        style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          background: 'none',
          border: `1px solid ${isActive && alert.demoTarget ? cfg.color : 'var(--border)'}`,
          borderRadius: '6px', padding: '5px 10px',
          color: isActive && alert.demoTarget ? cfg.color : 'var(--text-muted)',
          fontSize: '12px', fontWeight: isActive && alert.demoTarget ? 600 : 400,
          cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
        }}
      >
        {alert.demoTarget ? 'Gestionar' : 'Ver detalle'} <ChevronRight size={11} />
      </button>
    </div>
  )
}

export default function Alertas({ showToast, navigate }) {
  const [filter, setFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const filtered = ALERTS.filter(a => {
    const statusOk = filter === 'all' || a.status === filter
    const typeOk   = typeFilter === 'all' || a.type === typeFilter
    return statusOk && typeOk
  })

  const activeCount      = ALERTS.filter(a => a.status === 'active').length
  const resolvedCount    = ALERTS.filter(a => a.status === 'resolved').length
  const predictiveCount  = ALERTS.filter(a => a.type === 'predictive').length
  const postRevCount     = ALERTS.filter(a => a.type === 'post-revision').length

  const tabStyle = (id, activeVal) => ({
    padding: '6px 14px', borderRadius: '6px', border: 'none',
    cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit', fontWeight: 500,
    background: activeVal === id ? 'var(--bg-elevated)' : 'transparent',
    color: activeVal === id ? 'var(--text-primary)' : 'var(--text-muted)',
    transition: 'all 150ms',
  })

  return (
    <div style={{ padding: '32px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px' }}>Alertas</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            Centro de eventos y notificaciones de la flota
          </p>
        </div>
        <button
          onClick={() => showToast('Función no disponible en esta demo.')}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'none', border: '1px solid var(--border)', borderRadius: '7px',
            padding: '7px 14px', color: 'var(--text-secondary)', fontSize: '13px',
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          <Filter size={13} /> Filtros
        </button>
      </div>

      {/* Type legend */}
      <TypeLegend />

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Activas',         value: activeCount,     color: activeCount > 0 ? '#F59E0B' : '#30BF12' },
          { label: 'Resueltas',       value: resolvedCount,   color: '#30BF12' },
          { label: 'IA Predictiva',   value: predictiveCount, color: '#8B5CF6' },
          { label: 'Post-revisión',   value: postRevCount,    color: '#F97316' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{
            background: 'var(--bg-surface)', border: '1px solid var(--border)',
            borderRadius: '10px', padding: '16px 20px',
          }}>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</p>
            <p style={{ fontSize: '28px', fontWeight: 700, color, margin: 0, lineHeight: 1 }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
        {/* Filters row */}
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[['all', 'Todas'], ['active', 'Activas'], ['resolved', 'Resueltas']].map(([id, label]) => (
              <button key={id} style={tabStyle(id, filter)} onClick={() => setFilter(id)}>{label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginRight: '4px' }}>Tipo:</span>
            {[
              ['all', 'Todos'],
              ['predictive', 'IA Predictiva'],
              ['operational', 'Operacional'],
              ['post-revision', 'Post-revisión'],
            ].map(([id, label]) => (
              <button key={id} style={{ ...tabStyle(id, typeFilter), fontSize: '12px', padding: '4px 10px' }} onClick={() => setTypeFilter(id)}>{label}</button>
            ))}
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{filtered.length} eventos</span>
        </div>

        {/* Column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr 140px 120px 130px 110px', gap: '16px', padding: '10px 20px', borderBottom: '1px solid var(--border)' }}>
          {['', 'Evento', 'Severidad', 'Estado', 'Fecha', ''].map((h, i) => (
            <span key={i} style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</span>
          ))}
        </div>

        {filtered.map((a, i) => (
          <AlertRow key={a.id} alert={a} showToast={showToast} navigate={navigate} last={i === filtered.length - 1} />
        ))}

        {filtered.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
            No hay alertas en esta categoría.
          </div>
        )}
      </div>
    </div>
  )
}
