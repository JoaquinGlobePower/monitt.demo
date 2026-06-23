import { useState, useEffect } from 'react'
import { ArrowLeft, CheckSquare } from 'lucide-react'

const ACTIONS = [
  'Filtro de aceite reemplazado',
  'Sistema de lubricación purgado',
  'Prueba de arranque realizada — sin anomalías',
  'Lectura de presión: 3.8 bar — normalizada',
]

function Field({ label, value, multiline }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '5px' }}>{label}</label>
      {multiline ? (
        <textarea
          defaultValue={value}
          rows={4}
          style={{
            width: '100%', padding: '8px 12px', borderRadius: '6px',
            border: '1px solid var(--border)', background: 'var(--bg-elevated)',
            color: 'var(--text-primary)', fontSize: '13px', lineHeight: 1.6,
            fontFamily: 'inherit', resize: 'vertical',
          }}
        />
      ) : (
        <div style={{
          padding: '8px 12px', borderRadius: '6px',
          border: '1px solid var(--border)', background: 'var(--bg-elevated)',
          color: 'var(--text-primary)', fontSize: '13px',
        }}>{value}</div>
      )}
    </div>
  )
}

// Animated health score number
function AnimatedScore({ from, to, duration = 1200 }) {
  const [current, setCurrent] = useState(from)
  useEffect(() => {
    const steps = 40
    const step = (to - from) / steps
    let count = 0
    const timer = setInterval(() => {
      count++
      setCurrent(prev => {
        const next = prev + step
        return count >= steps ? to : Math.round(next)
      })
      if (count >= steps) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [from, to, duration])
  return <>{current}</>
}

export default function CloseOut({ navigate, completeOrder }) {
  const [submitted, setSubmitted] = useState(false)
  const [actions, setActions] = useState(Array(ACTIONS.length).fill(true))

  const handleSubmit = () => {
    completeOrder()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '40px', textAlign: 'center' }}>
        {/* Animated checkmark */}
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(48,191,18,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              className="draw-check"
              d="M8 20l8 8 16-16"
              stroke="#30BF12"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px' }}>
          ¡Orden cerrada exitosamente!
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '0 0 28px' }}>
          El registro ha sido actualizado y el manager notificado.
        </p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '32px' }}>
          {['Activo normalizado', 'Historial actualizado', 'Manager notificado'].map(pill => (
            <span key={pill} style={{
              padding: '5px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 500,
              background: 'rgba(48,191,18,0.1)', border: '1px solid rgba(48,191,18,0.2)', color: 'var(--green-500)',
            }}>
              {pill}
            </span>
          ))}
        </div>
        <button
          onClick={() => navigate('dashboard')}
          style={{
            padding: '12px 32px', borderRadius: '8px',
            background: 'var(--green-500)', border: 'none', color: '#fff',
            fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          Volver al dashboard →
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: '32px', maxWidth: '1000px', margin: '0 auto' }}>
      <button onClick={() => navigate('tecnico-orden001')} style={{
        display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none',
        color: 'var(--text-muted)', fontSize: '13px', cursor: 'pointer', padding: 0, marginBottom: '20px', fontFamily: 'inherit',
      }}>
        <ArrowLeft size={14} /> Volver a orden
      </button>
      <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 24px' }}>
        Cerrar orden de trabajo #001
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px', alignItems: 'start' }}>
        {/* LEFT: Form */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '24px' }}>
          <Field label="Técnico"  value="Luis Ponce" />
          <Field label="Activo"   value="GEN-002 — Bodega Sur, San Bernardo" />
          <Field label="Fecha"    value="25 may 2026" />
          <Field label="Duración" value="1h 40min" />
          <Field label="Hallazgos" multiline
            value="Filtro de aceite obstruido al 80% de su capacidad. Reemplazado filtro y purgado sistema. Presión post-intervención: 3.8 bar (dentro del rango normal)." />

          {/* Actions checklist */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              Acciones realizadas
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {ACTIONS.map((action, i) => (
                <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
                  <div
                    onClick={() => setActions(prev => prev.map((v, idx) => idx === i ? !v : v))}
                    style={{
                      width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0, marginTop: '1px',
                      border: actions[i] ? '2px solid var(--green-500)' : '2px solid var(--border)',
                      background: actions[i] ? 'var(--green-500)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 150ms', cursor: 'pointer',
                    }}
                  >
                    {actions[i] && (
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                        <path d="M1.5 4.5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5 }}>{action}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Next maintenance */}
          <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(48,191,18,0.05)', border: '1px solid rgba(48,191,18,0.15)', marginBottom: '20px' }}>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0 0 4px' }}>Recomendación IA — próxima mantención</p>
            <p style={{ fontSize: '13px', color: 'var(--text-primary)', margin: 0 }}>
              Próxima revisión de lubricación recomendada en 90 días (24 ago 2026)
            </p>
          </div>

          <button
            onClick={handleSubmit}
            style={{
              width: '100%', padding: '13px', borderRadius: '8px',
              background: 'var(--green-500)', border: 'none', color: '#fff',
              fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Confirmar y cerrar orden →
          </button>
        </div>

        {/* RIGHT: Live preview */}
        <div>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '20px', position: 'sticky', top: '24px' }}>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Vista previa — así quedará el registro del activo
            </p>

            {/* Asset mini card */}
            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 2px' }}>GEN-002</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Bodega Sur — San Bernardo</p>
                </div>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  padding: '3px 8px', borderRadius: '20px',
                  background: 'rgba(48,191,18,0.1)', border: '1px solid rgba(48,191,18,0.2)',
                  fontSize: '11px', fontWeight: 500, color: '#30BF12',
                }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#30BF12' }} />
                  OPERATIVO
                </span>
              </div>

              {/* Animated health score */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Health Score</span>
                  <span className="score-animate" style={{ fontSize: '20px', fontWeight: 700, color: '#30BF12' }}>
                    <AnimatedScore from={58} to={89} />
                  </span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg-page)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div
                    className="health-bar"
                    style={{ height: '100%', width: '89%', background: '#30BF12', borderRadius: '3px' }}
                  />
                </div>
              </div>

              {[
                ['Última intervención', 'Hoy, 25 may 2026'],
                ['Próxima mantención',  '24 ago 2026'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid var(--border)', marginTop: '10px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{k}</span>
                  <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
