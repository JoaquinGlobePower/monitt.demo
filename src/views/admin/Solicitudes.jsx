import { useState } from 'react'
import { Inbox, ChevronDown, ChevronUp, Check, RefreshCw, Star, Sparkles, UserCog, Wand2, AlertTriangle } from 'lucide-react'
import {
  EMPRESAS, TECNICOS, PROVEEDORES, PRIORITY_CONFIG, ALERT_TYPE_CONFIG, TEC_STATUS,
  empresaById, tecnicoById,
} from '../../data/adminData'

function CompanyChip({ companyId }) {
  const emp = empresaById(companyId)
  if (!emp) return null
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
      <div style={{
        width: '22px', height: '22px', borderRadius: '5px', flexShrink: 0,
        background: `${emp.accent}1f`, color: emp.accent,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '10px', fontWeight: 700,
      }}>
        {emp.initials}
      </div>
      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{emp.short}</span>
    </div>
  )
}

function AssignmentChip({ assignment }) {
  const isAuto = assignment === 'auto'
  const Icon = isAuto ? Sparkles : UserCog
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      fontSize: '10px', fontWeight: 500,
      color: isAuto ? '#8B5CF6' : 'var(--text-secondary)',
      background: isAuto ? 'rgba(139,92,246,0.1)' : 'var(--bg-elevated)',
      border: isAuto ? '1px solid rgba(139,92,246,0.25)' : '1px solid var(--border)',
      padding: '2px 7px', borderRadius: '4px',
    }}>
      <Icon size={10} />
      {isAuto ? 'Auto' : 'Manual'}
    </span>
  )
}

function AssignedTech({ sol }) {
  const tec = tecnicoById(sol.assignedTo)
  if (!tec) {
    return (
      <span style={{
        fontSize: '12px', fontWeight: 500, color: '#EF4444',
        background: 'rgba(239,68,68,0.1)', padding: '3px 9px', borderRadius: '5px',
        display: 'inline-flex', alignItems: 'center', gap: '5px',
      }}>
        <AlertTriangle size={11} /> Sin asignar
      </span>
    )
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{
        width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0,
        background: 'var(--green-700)', color: 'var(--green-400)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '10px', fontWeight: 700,
      }}>
        {tec.initials}
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', margin: '0 0 2px', lineHeight: 1.2 }}>{tec.name}</p>
        <AssignmentChip assignment={sol.assignment} />
      </div>
    </div>
  )
}

function TecOption({ tec, isCurrent, onSelect }) {
  const st = TEC_STATUS[tec.status]
  const disabled = tec.status === 'off-duty'
  return (
    <button
      onClick={() => !disabled && onSelect(tec.id)}
      disabled={disabled}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px', width: '100%', textAlign: 'left',
        background: isCurrent ? 'rgba(48,191,18,0.06)' : 'var(--bg-elevated)',
        border: `1px solid ${isCurrent ? 'var(--green-500)' : 'var(--border)'}`,
        borderRadius: '8px', padding: '10px 12px',
        cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
        opacity: disabled ? 0.5 : 1, transition: 'all 150ms',
      }}
    >
      <div style={{
        width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
        background: 'var(--green-700)', color: 'var(--green-400)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '11px', fontWeight: 700,
      }}>
        {tec.initials}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>{tec.name}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: st.color }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: st.color }} />
            {st.label}
          </span>
        </div>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '1px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {tec.specialty}
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', margin: 0 }}>{tec.activeOrders}</p>
          <p style={{ fontSize: '9px', color: 'var(--text-muted)', margin: 0 }}>activas</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <Star size={11} style={{ color: '#F59E0B' }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>{tec.rating}</span>
        </div>
        {isCurrent
          ? <span style={{ fontSize: '11px', color: 'var(--green-500)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}><Check size={12} /> Actual</span>
          : <span style={{ fontSize: '12px', color: 'var(--green-500)', fontWeight: 600 }}>Asignar</span>
        }
      </div>
    </button>
  )
}

function ReassignPanel({ sol, onAssign, onReAuto }) {
  return (
    <div style={{ borderTop: '1px solid var(--border)', padding: '16px 20px', background: 'var(--bg-page)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '14px' }}>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, flex: 1 }}>
          Monitt asignó este técnico automáticamente. El servicio es <strong>tercerizado</strong>: puedes reasignar a cualquier técnico de los proveedores externos.
        </p>
        {sol.assignment === 'manual' && (
          <button
            onClick={onReAuto}
            style={{
              display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0,
              background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)',
              borderRadius: '6px', padding: '6px 10px', color: '#8B5CF6',
              fontSize: '12px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
            }}
          >
            <Wand2 size={12} /> Volver a automático
          </button>
        )}
      </div>

      {PROVEEDORES.map(prov => {
        const techs = TECNICOS.filter(t => t.provider === prov.id)
        if (techs.length === 0) return null
        return (
          <div key={prov.id} style={{ marginBottom: '14px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px', margin: '0 0 8px', color: prov.accent, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '2px', background: prov.accent }} />
              {prov.name}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {techs.map(t => (
                <TecOption key={t.id} tec={t} isCurrent={t.id === sol.assignedTo} onSelect={onAssign} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function SolicitudRow({ sol, expanded, onToggle, onAssign, onReAuto }) {
  const prio = PRIORITY_CONFIG[sol.priority]
  const atype = ALERT_TYPE_CONFIG[sol.alertType]

  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '150px 1fr 110px 200px 130px',
        alignItems: 'center', gap: '16px', padding: '16px 20px',
      }}>
        {/* Company */}
        <div>
          <CompanyChip companyId={sol.company} />
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '6px 0 0' }}>{sol.id} · {sol.createdAt}</p>
        </div>

        {/* Reason + asset */}
        <div>
          <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', margin: '0 0 3px' }}>{sol.reason}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{sol.asset} · {sol.location}</span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', fontSize: '10px', fontWeight: 500,
              color: atype.color, background: atype.bg, padding: '1px 7px', borderRadius: '4px',
            }}>
              {atype.label}
            </span>
          </div>
        </div>

        {/* Priority */}
        <span style={{
          fontSize: '11px', fontWeight: 600, color: prio.color, background: prio.bg,
          padding: '4px 10px', borderRadius: '5px', width: 'fit-content',
        }}>
          {prio.label}
        </span>

        {/* Assigned tech + auto/manual */}
        <AssignedTech sol={sol} />

        {/* Action — always reassign (assignment is automatic) */}
        <button
          onClick={() => onToggle(sol.id)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            background: 'none', border: '1px solid var(--border)',
            borderRadius: '7px', padding: '8px 12px',
            color: 'var(--text-secondary)',
            fontSize: '12px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
            whiteSpace: 'nowrap',
          }}
        >
          <RefreshCw size={12} /> Reasignar
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {expanded && <ReassignPanel sol={sol} onAssign={(tecId) => onAssign(sol.id, tecId)} onReAuto={() => onReAuto(sol.id)} />}
    </div>
  )
}

export default function Solicitudes({ solicitudes, assignTecnico, reAutoAssign, showToast }) {
  const [filter, setFilter] = useState('all')
  const [companyFilter, setCompanyFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(null)

  const toggle = (id) => setExpandedId(prev => prev === id ? null : id)

  const handleAssign = (solId, tecId) => {
    assignTecnico(solId, tecId)
    setExpandedId(null)
    const tec = tecnicoById(tecId)
    showToast(`Técnico reasignado: ${tec.name} → ${solId}`)
  }

  const handleReAuto = (solId) => {
    reAutoAssign(solId)
    setExpandedId(null)
    showToast(`${solId} reasignada automáticamente por Monitt`)
  }

  const filtered = solicitudes.filter(s => {
    const assignmentOk = filter === 'all' || s.assignment === filter
    const companyOk = companyFilter === 'all' || s.company === companyFilter
    return assignmentOk && companyOk
  })

  const autoCount = solicitudes.filter(s => s.assignment === 'auto').length
  const manualCount = solicitudes.filter(s => s.assignment === 'manual').length
  const inProgressCount = solicitudes.filter(s => s.status === 'in-progress').length

  const tab = (id, label, activeVal, set) => (
    <button
      key={id}
      onClick={() => set(id)}
      style={{
        padding: '6px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer',
        fontSize: '13px', fontFamily: 'inherit', fontWeight: 500,
        background: activeVal === id ? 'var(--bg-elevated)' : 'transparent',
        color: activeVal === id ? 'var(--text-primary)' : 'var(--text-muted)',
        transition: 'all 150ms',
      }}
    >
      {label}
    </button>
  )

  return (
    <div style={{ padding: '32px', maxWidth: '1180px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <Inbox size={20} style={{ color: 'var(--green-500)' }} />
          <h1 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Bandeja de solicitudes</h1>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
          Solicitudes de revisión entrantes de todos los clientes
        </p>
      </div>

      {/* Automation banner */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '14px',
        background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)',
        borderRadius: '10px', padding: '14px 18px', marginBottom: '24px',
      }}>
        <div style={{
          width: '34px', height: '34px', borderRadius: '8px', flexShrink: 0,
          background: 'rgba(139,92,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Sparkles size={16} style={{ color: '#8B5CF6' }} />
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--text-primary)' }}>Asignación automática activa.</strong>{' '}
          Cada solicitud se asigna al técnico más adecuado en el momento en que llega — sin intervención manual.
          Puedes reasignar cualquier solicitud si lo necesitas.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Total solicitudes',    value: solicitudes.length, color: 'var(--text-primary)' },
          { label: 'Asignación automática', value: autoCount, color: '#8B5CF6' },
          { label: 'Reasignadas (manual)',  value: manualCount, color: 'var(--text-secondary)' },
          { label: 'En intervención',       value: inProgressCount, color: '#F59E0B' },
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
        {/* Filters */}
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {tab('all', 'Todas', filter, setFilter)}
            {tab('auto', 'Automáticas', filter, setFilter)}
            {tab('manual', `Reasignadas${manualCount ? ` (${manualCount})` : ''}`, filter, setFilter)}
          </div>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginRight: '4px' }}>Empresa:</span>
            {tab('all', 'Todas', companyFilter, setCompanyFilter)}
            {EMPRESAS.map(e => tab(e.id, e.short, companyFilter, setCompanyFilter))}
          </div>
        </div>

        {/* Column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr 110px 200px 130px', gap: '16px', padding: '10px 20px', borderBottom: '1px solid var(--border)' }}>
          {['Empresa', 'Solicitud', 'Prioridad', 'Técnico asignado', ''].map((h, i) => (
            <span key={i} style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</span>
          ))}
        </div>

        {filtered.map(sol => (
          <SolicitudRow
            key={sol.id}
            sol={sol}
            expanded={expandedId === sol.id}
            onToggle={toggle}
            onAssign={handleAssign}
            onReAuto={handleReAuto}
          />
        ))}

        {filtered.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
            No hay solicitudes en esta categoría.
          </div>
        )}
      </div>
    </div>
  )
}
