import { Sparkles, Users, Building2, UserCog, ChevronRight, Clock } from 'lucide-react'
import {
  EMPRESAS, TECNICOS, PRIORITY_CONFIG, TEC_STATUS,
  empresaById, tecnicoById,
} from '../../data/adminData'

function KpiCard({ label, value, sub, color, icon: Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'var(--bg-surface)', border: '1px solid var(--border)',
        borderRadius: '10px', padding: '18px 20px', textAlign: 'left',
        cursor: onClick ? 'pointer' : 'default', fontFamily: 'inherit',
        display: 'flex', flexDirection: 'column', gap: '10px',
        transition: 'border-color 150ms',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{label}</span>
        <Icon size={15} style={{ color: 'var(--text-muted)' }} />
      </div>
      <span style={{ fontSize: '30px', fontWeight: 700, color: color || 'var(--text-primary)', lineHeight: 1 }}>{value}</span>
      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{sub}</span>
    </button>
  )
}

export default function AdminDashboard({ solicitudes, navigate }) {
  const autoCount = solicitudes.filter(s => s.assignment === 'auto').length
  const inProgress = solicitudes.filter(s => s.status === 'in-progress')
  const available = TECNICOS.filter(t => t.status === 'available')
  const totalAlerts = EMPRESAS.reduce((s, e) => s + e.activeAlerts, 0)

  // Recent requests, high priority first (all are already auto-assigned)
  const recent = [...solicitudes]
    .sort((a, b) => {
      if (a.priority === 'alta' && b.priority !== 'alta') return -1
      if (a.priority !== 'alta' && b.priority === 'alta') return 1
      return 0
    })
    .slice(0, 4)

  return (
    <div style={{ padding: '32px', maxWidth: '1180px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 4px' }}>Panel interno · Monitt.io</p>
        <h1 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Resumen operativo</h1>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        <KpiCard
          label="Asignación automática" value={`${autoCount}/${solicitudes.length}`}
          sub="Asignadas por el sistema"
          color="#8B5CF6"
          icon={Sparkles} onClick={() => navigate('solicitudes')}
        />
        <KpiCard
          label="En intervención" value={inProgress.length}
          sub="Técnicos en terreno" color="#F59E0B" icon={Clock}
          onClick={() => navigate('solicitudes')}
        />
        <KpiCard
          label="Técnicos disponibles" value={available.length}
          sub={`de ${TECNICOS.length} en total`} color="#30BF12" icon={Users}
          onClick={() => navigate('tecnicos-admin')}
        />
        <KpiCard
          label="Empresas activas" value={EMPRESAS.length}
          sub={`${totalAlerts} alertas activas`} color="var(--text-primary)" icon={Building2}
          onClick={() => navigate('empresas')}
        />
      </div>

      {/* Two columns: attention queue + technician availability */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '16px' }}>

        {/* Attention queue */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Solicitudes recientes</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Asignadas automáticamente por Monitt</p>
            </div>
            <button
              onClick={() => navigate('solicitudes')}
              style={{
                display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none',
                color: 'var(--green-500)', fontSize: '12px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Ver bandeja <ChevronRight size={13} />
            </button>
          </div>
          <div>
            {recent.map((sol, i) => {
              const emp = empresaById(sol.company)
              const prio = PRIORITY_CONFIG[sol.priority]
              const tec = tecnicoById(sol.assignedTo)
              const isAuto = sol.assignment === 'auto'
              return (
                <div key={sol.id} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '14px 20px', borderBottom: i === recent.length - 1 ? 'none' : '1px solid var(--border)',
                }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '6px', flexShrink: 0,
                    background: `${emp.accent}1f`, color: emp.accent,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700,
                  }}>
                    {emp.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', margin: '0 0 2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sol.reason}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>{emp.short} · {sol.asset}</p>
                  </div>
                  <span style={{
                    fontSize: '11px', fontWeight: 600, color: prio.color, background: prio.bg,
                    padding: '3px 8px', borderRadius: '4px', flexShrink: 0,
                  }}>{prio.label}</span>
                  <div style={{ width: '130px', flexShrink: 0, textAlign: 'right' }}>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tec ? tec.name : '—'}</p>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '10px', fontWeight: 500,
                      color: isAuto ? '#8B5CF6' : 'var(--text-muted)',
                    }}>
                      {isAuto ? <Sparkles size={9} /> : <UserCog size={9} />}
                      {isAuto ? 'Auto' : 'Manual'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Technician availability */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Disponibilidad</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Estado del equipo</p>
            </div>
            <button
              onClick={() => navigate('tecnicos-admin')}
              style={{
                display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none',
                color: 'var(--green-500)', fontSize: '12px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Ver todos <ChevronRight size={13} />
            </button>
          </div>
          <div style={{ padding: '8px 12px' }}>
            {TECNICOS.map((tec, i) => {
              const st = TEC_STATUS[tec.status]
              const emp = empresaById(tec.company)
              return (
                <div key={tec.id} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '9px 8px', borderBottom: i === TECNICOS.length - 1 ? 'none' : '1px solid var(--border)',
                }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                    background: 'var(--green-700)', color: 'var(--green-400)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700,
                  }}>
                    {tec.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tec.name}</p>
                    <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: 0 }}>{emp ? emp.short : 'Pool general'}</p>
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: st.color, flexShrink: 0 }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: st.color }} />
                    {st.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
