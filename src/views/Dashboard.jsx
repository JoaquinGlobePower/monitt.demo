import { Cpu, AlertTriangle, Calendar, Sparkles, ChevronRight, Activity } from 'lucide-react'

function StatusDot({ status }) {
  const colors = { online: '#30BF12', warning: '#F59E0B', critical: '#EF4444', offline: '#6B7280' }
  const color = colors[status] || colors.offline
  return (
    <span style={{
      display: 'inline-block', width: '8px', height: '8px',
      borderRadius: '50%', background: color, flexShrink: 0,
    }} />
  )
}

function HealthBar({ score, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ width: '80px', height: '4px', background: 'var(--bg-elevated)', borderRadius: '2px', overflow: 'hidden' }}>
        <div className="health-bar" style={{ height: '100%', width: `${score}%`, background: color, borderRadius: '2px' }} />
      </div>
      <span style={{ fontSize: '13px', fontWeight: 600, color }}>{score}</span>
    </div>
  )
}

function KpiCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <Icon size={14} style={{ color: 'var(--text-muted)' }} />
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{label}</span>
      </div>
      <div style={{ fontSize: '32px', fontWeight: 700, color: color || 'var(--text-primary)', lineHeight: 1, marginBottom: '6px' }}>{value}</div>
      {sub && <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{sub}</div>}
    </div>
  )
}

function GenRow({ name, location, status, statusLabel, score, scoreColor, lastTest, action, btnLabel, btnVariant, onBtn, highlight, last }) {
  const statusColor = { online: '#30BF12', warning: '#F59E0B', critical: '#EF4444' }[status] || '#6B7280'
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '2fr 1.4fr 1.2fr 1.2fr 2fr 140px',
      padding: '14px 20px',
      borderBottom: last ? 'none' : '1px solid var(--border)',
      gap: '12px',
      alignItems: 'center',
      background: highlight ? 'rgba(245,158,11,0.03)' : 'transparent',
    }}>
      <div>
        <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', margin: '0 0 2px' }}>{name}</p>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{location}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <StatusDot status={status} />
        <span style={{ fontSize: '12px', color: statusColor }}>{statusLabel}</span>
      </div>
      <HealthBar score={score} color={scoreColor} />
      <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{lastTest}</span>
      <span style={{ fontSize: '13px', color: highlight ? '#F59E0B' : 'var(--text-secondary)' }}>{action}</span>
      <button onClick={onBtn} style={{
        padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 500,
        cursor: 'pointer', fontFamily: 'inherit', transition: 'all 150ms',
        ...(btnVariant === 'filled'
          ? { background: 'var(--green-500)', border: '1px solid var(--green-500)', color: '#fff' }
          : { background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)' }),
      }}>
        {btnLabel}
      </button>
    </div>
  )
}

export default function Dashboard({ navigate, orderCompleted, showToast }) {
  const gen002Status  = orderCompleted ? 'online'  : 'warning'
  const gen002Score   = orderCompleted ? 89        : 58
  const gen002Action  = orderCompleted ? 'Revisión programada en 90 días' : 'Anomalía detectada — acción recomendada'
  const fleetScore    = orderCompleted ? 89        : 74
  const alertCount    = orderCompleted ? 0         : 1
  const gen002Color   = orderCompleted ? '#30BF12' : '#F59E0B'
  const gen002Label   = orderCompleted ? 'Operativo' : 'Atención requerida'

  const comingSoon = () => showToast('Vista de detalle no disponible en esta demo.')

  return (
    <div style={{ padding: '32px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px' }}>
          Buenos días, Rob.
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
          Martes, 25 de mayo de 2026
        </p>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        <KpiCard icon={Cpu}           label="Activos en línea"  value="3/3"   color="#30BF12" />
        <KpiCard icon={Activity}      label="Score de flota"    value={`${fleetScore}/100`}
          color={fleetScore < 80 ? '#F59E0B' : '#30BF12'}
          sub={fleetScore < 80 ? 'Un activo requiere atención' : 'Todos los activos normalizados'} />
        <KpiCard icon={AlertTriangle} label="Alertas activas"   value={alertCount}
          color={alertCount > 0 ? '#F59E0B' : '#30BF12'}
          sub={alertCount > 0 ? 'GEN-002 — lubricación' : 'Sin alertas activas'} />
        <KpiCard icon={Calendar}      label="Próxima mantención" value="12 días" sub="GEN-001 — Bodega Norte" />
      </div>

      {/* Fleet table */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>
            Flota de generadores
          </h2>
        </div>
        {/* Header row */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.4fr 1.2fr 1.2fr 2fr 140px', padding: '10px 20px', borderBottom: '1px solid var(--border)', gap: '12px' }}>
          {['Activo', 'Estado', 'Health score', 'Último test', 'Próxima acción', ''].map(h => (
            <span key={h} style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</span>
          ))}
        </div>
        <GenRow name="GEN-001" location="Bodega Norte — Quilicura"    status="online"       statusLabel="Operativo"        score={91} scoreColor="#30BF12" lastTest="18 may 2026" action="Revisión programada en 28 días"           btnLabel="Ver detalle" btnVariant="outline" onBtn={comingSoon} />
        <GenRow name="GEN-002" location="Bodega Sur — San Bernardo"  status={gen002Status} statusLabel={gen002Label}      score={gen002Score} scoreColor={gen002Color} lastTest="02 may 2026" action={gen002Action} btnLabel={orderCompleted ? 'Ver detalle' : 'Ver alerta'} btnVariant={orderCompleted ? 'outline' : 'filled'} onBtn={() => orderCompleted ? comingSoon() : navigate('activo-gen002')} highlight={!orderCompleted} />
        <GenRow name="GEN-003" location="Bodega Sur — San Bernardo"  status="online"       statusLabel="Operativo"        score={87} scoreColor="#30BF12" lastTest="15 may 2026" action="Revisión programada en 45 días"           btnLabel="Ver detalle" btnVariant="outline" onBtn={comingSoon} last />
      </div>

      {/* AI insight / completion banner */}
      {!orderCompleted ? (
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderLeft: '3px solid var(--green-500)', borderRadius: '10px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <Sparkles size={18} style={{ color: 'var(--green-500)', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <p style={{ fontSize: '14px', color: 'var(--text-primary)', margin: '0 0 10px', lineHeight: 1.7 }}>
              La IA detectó una tendencia anómala en GEN-002 hace 5 días. Patrones similares precedieron fallas de lubricación en flotas comparables con 14 días de anticipación.
            </p>
            <button onClick={() => navigate('activo-gen002')} style={{
              background: 'none', border: 'none', color: 'var(--green-500)', fontSize: '13px', fontWeight: 500,
              cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'inherit',
            }}>
              Ver análisis completo <ChevronRight size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderLeft: '3px solid var(--green-500)', borderRadius: '10px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(48,191,18,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8.5l3 3 7-7" stroke="#30BF12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-primary)', margin: 0 }}>
            GEN-002 normalizado exitosamente. Health score restaurado a{' '}
            <strong style={{ color: '#30BF12' }}>89/100</strong>. Próxima revisión:{' '}
            <strong>24 ago 2026</strong>.
          </p>
        </div>
      )}
    </div>
  )
}
