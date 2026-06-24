import { CheckCircle, MapPin, Clock, Sparkles, ChevronRight, AlertTriangle } from 'lucide-react'

const CHECKLIST = [
  'Verificar nivel de aceite en varilla medidora',
  'Inspeccionar filtro de aceite (posible obstrucción)',
  'Revisar bomba de aceite — buscar fugas o desgaste',
  'Verificar mangueras y conexiones del sistema',
  'Ejecutar prueba de arranque post-inspección',
  'Registrar lectura de presión post-intervención',
]

const STATUS_STEPS = [
  { label: 'Solicitud enviada',   done: true  },
  { label: 'Técnico asignado',    done: true  },
  { label: 'En camino',           done: true, active: true },
  { label: 'Intervención',        done: false },
  { label: 'Cierre',              done: false },
]

export default function TechnicianView({ navigate }) {
  return (
    <div style={{ padding: '32px', maxWidth: '820px', margin: '0 auto' }}>

      {/* Confirmation banner */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '14px',
        background: 'rgba(48,191,18,0.06)', border: '1px solid rgba(48,191,18,0.2)',
        borderRadius: '10px', padding: '16px 20px', marginBottom: '28px',
      }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'rgba(48,191,18,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <CheckCircle size={18} style={{ color: 'var(--green-500)' }} />
        </div>
        <div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 2px' }}>
            Solicitud enviada correctamente
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            Monitt recibió tu solicitud y asignó al técnico Luis Ponce. Te notificaremos cuando complete la visita.
          </p>
        </div>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px' }}>
          Resumen del caso
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Orden de servicio #001 · GEN-002</p>
      </div>

      {/* Two-column: case info + status */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>

        {/* Case summary */}
        <div style={{
          background: 'var(--bg-surface)', border: '1px solid var(--border)',
          borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px',
        }}>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Detalle del caso</p>

          <div>
            <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 2px' }}>GEN-002 — Generador Diésel 350 kVA</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={11} style={{ color: 'var(--text-muted)' }} />
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Bodega Sur — San Bernardo</span>
            </div>
          </div>

          <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Motivo',      value: 'Anomalía en sistema de lubricación' },
              { label: 'Prioridad',   value: 'Alta', red: true },
              { label: 'Técnico',     value: 'Luis Ponce (asignado por Monitt)' },
              { label: 'Solicitado',  value: '25 may 2026, 09:41' },
            ].map(({ label, value, red }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', flexShrink: 0 }}>{label}</span>
                <span style={{ fontSize: '12px', fontWeight: 500, color: red ? '#EF4444' : 'var(--text-secondary)', textAlign: 'right' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status tracker */}
        <div style={{
          background: 'var(--bg-surface)', border: '1px solid var(--border)',
          borderRadius: '10px', padding: '20px',
        }}>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0 0 18px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Estado de la orden</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {STATUS_STEPS.map((step, i) => {
              const isLast = i === STATUS_STEPS.length - 1
              return (
                <div key={step.label} style={{ display: 'flex', gap: '12px' }}>
                  {/* Line + dot */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                      background: step.done ? (step.active ? 'var(--green-500)' : 'var(--bg-elevated)') : 'var(--bg-elevated)',
                      border: step.done ? (step.active ? '2px solid var(--green-500)' : '2px solid var(--green-500)') : '2px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {step.done && !step.active && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green-500)' }} />}
                      {step.active && (
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff' }} />
                      )}
                    </div>
                    {!isLast && (
                      <div style={{ width: '2px', flex: 1, minHeight: '20px', background: step.done ? 'var(--green-500)' : 'var(--border)', margin: '3px 0' }} />
                    )}
                  </div>
                  {/* Label */}
                  <div style={{ paddingBottom: isLast ? 0 : '16px' }}>
                    <p style={{
                      fontSize: '13px', fontWeight: step.active ? 600 : 400, margin: '1px 0 0',
                      color: step.done ? 'var(--text-primary)' : 'var(--text-muted)',
                    }}>
                      {step.label}
                      {step.active && (
                        <span style={{ marginLeft: '8px', fontSize: '11px', color: 'var(--green-500)', fontWeight: 400 }}>· en curso</span>
                      )}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* AI checklist — read-only, for client info */}
      <div style={{
        background: 'var(--bg-surface)', border: '1px solid var(--border)',
        borderRadius: '10px', padding: '20px', marginBottom: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '6px',
            background: 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Sparkles size={13} style={{ color: '#8B5CF6' }} />
          </div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Lista de inspección asignada al técnico</p>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>Generada por IA · Luis Ponce la completará durante la visita</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {CHECKLIST.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '8px 10px', borderRadius: '6px', background: 'var(--bg-elevated)' }}>
              <div style={{
                width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0,
                border: '1.5px solid var(--border)', background: 'transparent',
              }} />
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Demo CTA */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--bg-surface)', border: '1px solid var(--border)',
        borderRadius: '10px', padding: '16px 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Clock size={14} style={{ color: 'var(--text-muted)' }} />
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            <span style={{ fontSize: '10px', fontWeight: 600, background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '4px', padding: '2px 6px', marginRight: '8px', color: 'var(--text-muted)', letterSpacing: '0.3px' }}>DEMO</span>
            Simular que el técnico completó la visita y registró el cierre
          </p>
        </div>
        <button
          onClick={() => navigate('cierre-orden001')}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'var(--green-500)', border: 'none', borderRadius: '7px',
            padding: '8px 16px', color: '#fff', fontSize: '13px', fontWeight: 500,
            cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
          }}
        >
          Ver cierre de orden <ChevronRight size={13} />
        </button>
      </div>
    </div>
  )
}
