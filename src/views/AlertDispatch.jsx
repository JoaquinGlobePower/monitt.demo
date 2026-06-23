import { ArrowLeft, CheckCircle, Star, MapPin, Clock, Wrench } from 'lucide-react'
import { useState } from 'react'

function AutoBadge() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: '2px 8px', borderRadius: '4px',
      background: 'rgba(48,191,18,0.1)', border: '1px solid rgba(48,191,18,0.2)',
      fontSize: '11px', color: 'var(--green-500)', fontWeight: 500, flexShrink: 0,
    }}>
      <CheckCircle size={10} /> Auto IA
    </span>
  )
}

function FormField({ label, value, multiline = false }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>{label}</label>
        <AutoBadge />
      </div>
      {multiline ? (
        <div style={{
          width: '100%', padding: '10px 12px', borderRadius: '6px',
          border: '1px solid var(--border)', background: 'var(--bg-elevated)',
          fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.6,
          minHeight: '80px',
        }}>
          {value}
        </div>
      ) : (
        <div style={{
          padding: '8px 12px', borderRadius: '6px',
          border: '1px solid var(--border)', background: 'var(--bg-elevated)',
          fontSize: '13px', color: 'var(--text-primary)',
        }}>
          {value}
        </div>
      )}
    </div>
  )
}

function TechCard({ selected, onSelect, name, role, rating, availability, distance, specialties }) {
  return (
    <button
      onClick={onSelect}
      style={{
        flex: 1, padding: '16px', borderRadius: '8px', textAlign: 'left',
        cursor: 'pointer', fontFamily: 'inherit', transition: 'all 150ms',
        border: selected ? '2px solid var(--green-500)' : '2px solid var(--border)',
        background: selected ? 'rgba(48,191,18,0.04)' : 'var(--bg-elevated)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--green-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: 'var(--green-400)' }}>
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        {selected && (
          <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'var(--green-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
      <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 2px' }}>{name}</p>
      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 10px' }}>{role}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
        <span style={{ fontSize: '11px', color: '#F59E0B', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <Star size={11} fill="#F59E0B" /> {rating}
        </span>
        <span style={{ fontSize: '11px', color: availability.includes('ahora') ? '#30BF12' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <Clock size={11} /> {availability}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <MapPin size={11} /> {distance}
        </span>
      </div>
      <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
        <Wrench size={10} style={{ display: 'inline', marginRight: '4px' }} />
        {specialties}
      </p>
    </button>
  )
}

export default function AlertDispatch({ navigate }) {
  const [selectedTech, setSelectedTech] = useState(0)
  const [priority, setPriority] = useState('alta')

  return (
    <div style={{ padding: '32px', maxWidth: '760px', margin: '0 auto' }}>
      {/* Header */}
      <button onClick={() => navigate('activo-gen002')} style={{
        display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none',
        color: 'var(--text-muted)', fontSize: '13px', cursor: 'pointer', padding: 0, marginBottom: '24px', fontFamily: 'inherit',
      }}>
        <ArrowLeft size={14} /> Volver a GEN-002
      </button>
      <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 24px' }}>
        Nueva orden de trabajo
      </h1>

      {/* Alert summary */}
      <div style={{
        background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)',
        borderRadius: '10px', padding: '16px 20px', marginBottom: '24px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px',
      }}>
        {[
          ['Activo',              'GEN-002 — Bodega Sur, San Bernardo'],
          ['Tipo de falla',       'Anomalía en sistema de lubricación'],
          ['Urgencia',            'Alta'],
          ['Detectado',           'hace 5 días'],
          ['Prob. de falla',      '73% en los próximos 7 días'],
        ].map(([k, v]) => (
          <div key={k}>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0 0 2px' }}>{k}</p>
            <p style={{ fontSize: '13px', fontWeight: 500, color: k === 'Urgencia' ? '#F59E0B' : 'var(--text-primary)', margin: 0 }}>{v}</p>
          </div>
        ))}
      </div>

      {/* Work order form */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', margin: '0 0 16px' }}>
          Orden de trabajo
        </h2>
        <FormField label="Activo" value="GEN-002 — Bodega Sur, San Bernardo" />
        <FormField label="Tipo de trabajo" value="Inspección y mantención preventiva" />
        <FormField label="Descripción" multiline
          value="Revisar sistema de lubricación. Presión de aceite registra 2.6 bar (rango normal: 3.2–4.1). Posible desgaste de filtro o bomba de aceite." />
        <FormField label="Historial adjunto" value="Últimas 3 intervenciones incluidas" />
        <FormField label="Datos de sensores" value="Últimos 30 días adjuntos" />
      </div>

      {/* Technician selector */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', margin: '0 0 14px' }}>
          Asignar técnico
        </h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <TechCard
            selected={selectedTech === 0}
            onSelect={() => setSelectedTech(0)}
            name="Luis Ponce"
            role="Ing. Electrónica"
            rating="4.9"
            availability="Disponible ahora"
            distance="12 km"
            specialties="Cummins, DSE"
          />
          <TechCard
            selected={selectedTech === 1}
            onSelect={() => setSelectedTech(1)}
            name="Marco Silva"
            role="Téc. Electromecánico"
            rating="4.7"
            availability="Disponible en 2h"
            distance="8 km"
            specialties="Caterpillar, Kohler"
          />
        </div>
      </div>

      {/* Priority + scheduling */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 8px' }}>Prioridad</p>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['baja', 'normal', 'alta'].map(p => (
                <button key={p} onClick={() => setPriority(p)} style={{
                  padding: '5px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 500,
                  cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize',
                  border: priority === p ? '1px solid var(--green-500)' : '1px solid var(--border)',
                  background: priority === p ? 'rgba(48,191,18,0.1)' : 'transparent',
                  color: priority === p ? 'var(--green-500)' : 'var(--text-secondary)',
                }}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 8px' }}>Fecha programada</p>
            <div style={{
              padding: '5px 14px', borderRadius: '6px', border: '1px solid var(--border)',
              background: 'var(--bg-elevated)', fontSize: '13px', color: 'var(--text-primary)',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <AutoBadge />
              Hoy, 25 may 2026
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={() => navigate('tecnico-orden001')}
        style={{
          width: '100%', padding: '14px', borderRadius: '8px',
          background: 'var(--green-500)', border: 'none', color: '#fff',
          fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          marginBottom: '10px',
        }}
      >
        Confirmar despacho →
      </button>
      <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
        El técnico recibirá la orden con todo el contexto adjunto
      </p>
    </div>
  )
}
