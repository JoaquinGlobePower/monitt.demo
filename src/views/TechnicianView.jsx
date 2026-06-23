import { useState } from 'react'
import { Bell, MapPin, ChevronDown, ChevronUp } from 'lucide-react'

const CHECKLIST = [
  'Verificar nivel de aceite en varilla medidora',
  'Inspeccionar filtro de aceite (posible obstrucción)',
  'Revisar bomba de aceite — buscar fugas o desgaste',
  'Verificar mangueras y conexiones del sistema',
  'Ejecutar prueba de arranque post-inspección',
  'Registrar lectura de presión post-intervención',
]

export default function TechnicianView({ navigate }) {
  const [checked, setChecked] = useState(Array(CHECKLIST.length).fill(false))
  const [historyOpen, setHistoryOpen] = useState(false)
  const allChecked = checked.every(Boolean)

  const toggle = (i) => setChecked(prev => prev.map((v, idx) => idx === i ? !v : v))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 24px', minHeight: '100%', background: 'var(--bg-page)' }}>
      {/* Label */}
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '20px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Vista del técnico — Luis Ponce
      </p>

      {/* Phone frame */}
      <div style={{
        width: '390px',
        maxWidth: '100%',
        borderRadius: '44px',
        background: '#0A0F0A',
        border: '10px solid #1a1a1a',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px #333',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '820px',
        position: 'relative',
      }}>
        {/* Notch */}
        <div style={{ height: '32px', background: '#0A0F0A', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: '4px', flexShrink: 0 }}>
          <div style={{ width: '120px', height: '24px', background: '#111', borderRadius: '0 0 16px 16px' }} />
        </div>

        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 20px 12px', flexShrink: 0 }}>
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#E8F5E8', letterSpacing: '-0.5px' }}>monitt</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#7A9A7A' }}>Orden #001</span>
            <Bell size={18} style={{ color: '#7A9A7A' }} />
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px', paddingBottom: '80px' }}>
          {/* Work order card */}
          <div style={{ background: '#0F1A0F', border: '1px solid #1F2E1F', borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
            <p style={{ fontSize: '18px', fontWeight: 700, color: '#E8F5E8', margin: '0 0 2px' }}>GEN-002</p>
            <p style={{ fontSize: '14px', color: '#7A9A7A', margin: '0 0 12px' }}>Bodega Sur, San Bernardo</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <MapPin size={14} style={{ color: '#4A6A4A' }} />
              <span style={{ fontSize: '12px', color: '#4A6A4A' }}>Av. Portales 4820, San Bernardo</span>
            </div>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '6px',
              border: '1px solid #1F2E1F', background: 'transparent', color: '#7A9A7A',
              fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit', marginBottom: '12px',
            }}>
              <MapPin size={12} /> Abrir en Maps
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }} />
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#3B82F6' }}>EN CAMINO</span>
            </div>
          </div>

          {/* Fault description */}
          <div style={{ background: '#0F1A0F', border: '1px solid #1F2E1F', borderLeft: '3px solid #F59E0B', borderRadius: '12px', padding: '14px', marginBottom: '12px' }}>
            <p style={{ fontSize: '12px', color: '#7A9A7A', margin: '0 0 6px' }}>Falla detectada</p>
            <p style={{ fontSize: '13px', color: '#E8F5E8', margin: 0, lineHeight: 1.6 }}>
              Anomalía en sistema de lubricación. Presión de aceite: <strong style={{ color: '#F59E0B' }}>2.6 bar</strong> (esperado: 3.2–4.1). Verificar filtro y bomba de aceite.
            </p>
          </div>

          {/* AI Checklist */}
          <div style={{ background: '#0F1A0F', border: '1px solid #1F2E1F', borderRadius: '12px', padding: '14px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ fontSize: '14px' }}>✨</span>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#E8F5E8', margin: 0 }}>
                Lista de inspección — generada por IA
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {CHECKLIST.map((item, i) => (
                <label key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', cursor: 'pointer' }}>
                  <div
                    onClick={() => toggle(i)}
                    style={{
                      width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0,
                      border: checked[i] ? '2px solid #30BF12' : '2px solid #1F2E1F',
                      background: checked[i] ? '#30BF12' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginTop: '1px', transition: 'all 150ms', cursor: 'pointer',
                    }}
                  >
                    {checked[i] && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span
                    onClick={() => toggle(i)}
                    style={{
                      fontSize: '13px', lineHeight: 1.5,
                      color: checked[i] ? '#4A6A4A' : '#E8F5E8',
                      textDecoration: checked[i] ? 'line-through' : 'none',
                      transition: 'color 150ms',
                    }}
                  >
                    {item}
                  </span>
                </label>
              ))}
            </div>
            <div style={{ marginTop: '12px', height: '3px', background: '#1F2E1F', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: '2px',
                width: `${(checked.filter(Boolean).length / CHECKLIST.length) * 100}%`,
                background: '#30BF12', transition: 'width 300ms ease',
              }} />
            </div>
            <p style={{ fontSize: '11px', color: '#4A6A4A', margin: '6px 0 0', textAlign: 'right' }}>
              {checked.filter(Boolean).length}/{CHECKLIST.length} completados
            </p>
          </div>

          {/* History (collapsible) */}
          <div style={{ background: '#0F1A0F', border: '1px solid #1F2E1F', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px' }}>
            <button
              onClick={() => setHistoryOpen(!historyOpen)}
              style={{
                width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 14px', background: 'none', border: 'none', cursor: 'pointer',
                color: '#7A9A7A', fontSize: '13px', fontFamily: 'inherit',
              }}
            >
              Últimas intervenciones
              {historyOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {historyOpen && (
              <div style={{ borderTop: '1px solid #1F2E1F', padding: '12px 14px' }}>
                {[
                  ['18 may 2026', 'Revisión rutinaria — Sin hallazgos'],
                  ['02 mar 2026', 'Cambio filtro de aceite — Completado'],
                  ['15 nov 2025', 'Inspección anual — Completado'],
                ].map(([date, action]) => (
                  <div key={date} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#30BF12', flexShrink: 0, marginTop: '5px' }} />
                    <div>
                      <p style={{ fontSize: '12px', color: '#E8F5E8', margin: '0 0 1px' }}>{action}</p>
                      <p style={{ fontSize: '11px', color: '#4A6A4A', margin: 0 }}>{date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sticky close button */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '12px 16px 20px',
          background: 'linear-gradient(transparent, #0A0F0A 30%)',
        }}>
          <button
            onClick={() => navigate('cierre-orden001')}
            style={{
              width: '100%', padding: '13px', borderRadius: '10px',
              fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 200ms',
              ...(allChecked
                ? { background: '#30BF12', border: '1px solid #30BF12', color: '#fff' }
                : { background: 'transparent', border: '1px solid #1F2E1F', color: '#7A9A7A' }),
            }}
          >
            Registrar intervención →
          </button>
        </div>
      </div>
    </div>
  )
}
