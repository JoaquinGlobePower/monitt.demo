import { useState } from 'react'
import { Wrench, MapPin, Phone, Star, Building2, Globe, ChevronRight } from 'lucide-react'
import { TECNICOS, EMPRESAS, TEC_STATUS, empresaById } from '../../data/adminData'

function TechCard({ tech, showToast }) {
  const st = TEC_STATUS[tech.status]
  const emp = empresaById(tech.company)
  const isPool = tech.company === null

  return (
    <div style={{
      background: 'var(--bg-surface)', border: '1px solid var(--border)',
      borderRadius: '10px', padding: '20px',
      display: 'flex', flexDirection: 'column', gap: '14px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: 'var(--green-700)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', fontWeight: 700, color: 'var(--green-400)', flexShrink: 0,
          }}>
            {tech.initials}
          </div>
          <div>
            <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 2px' }}>{tech.name}</p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{tech.role}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: st.color, flexShrink: 0 }} />
          <span style={{ fontSize: '12px', color: st.color }}>{st.label}</span>
        </div>
      </div>

      {/* Assignment badge — dedicated company or general pool */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '7px',
        background: isPool ? 'var(--bg-elevated)' : `${emp.accent}14`,
        border: `1px solid ${isPool ? 'var(--border)' : `${emp.accent}40`}`,
        borderRadius: '7px', padding: '7px 10px',
      }}>
        {isPool
          ? <Globe size={13} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
          : <Building2 size={13} style={{ color: emp.accent, flexShrink: 0 }} />
        }
        <span style={{ fontSize: '12px', fontWeight: 500, color: isPool ? 'var(--text-secondary)' : emp.accent }}>
          {isPool ? 'Pool general Monitt' : `Dedicado · ${emp.short}`}
        </span>
      </div>

      {/* Specialty */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
        <Wrench size={12} style={{ color: 'var(--text-muted)', marginTop: '2px', flexShrink: 0 }} />
        <span style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{tech.specialty}</span>
      </div>

      {/* Zone & phone */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MapPin size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{tech.zone}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Phone size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{tech.phone}</span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        <div style={{ textAlign: 'center', padding: '8px', background: 'var(--bg-elevated)', borderRadius: '6px' }}>
          <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 2px', lineHeight: 1 }}>{tech.activeOrders}</p>
          <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: 0 }}>Activas</p>
        </div>
        <div style={{ textAlign: 'center', padding: '8px', background: 'var(--bg-elevated)', borderRadius: '6px' }}>
          <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 2px', lineHeight: 1 }}>{tech.completedMonth}</p>
          <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: 0 }}>Este mes</p>
        </div>
        <div style={{ textAlign: 'center', padding: '8px', background: 'var(--bg-elevated)', borderRadius: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', marginBottom: '2px' }}>
            <Star size={11} style={{ color: '#F59E0B' }} />
            <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{tech.rating}</span>
          </div>
          <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: 0 }}>Rating</p>
        </div>
      </div>

      {/* Certifications */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {tech.certs.map(cert => (
          <span key={cert} style={{
            fontSize: '11px', padding: '2px 8px',
            background: 'var(--bg-elevated)', border: '1px solid var(--border)',
            borderRadius: '4px', color: 'var(--text-secondary)',
          }}>{cert}</span>
        ))}
      </div>

      <button
        onClick={() => showToast('Perfil completo no disponible en esta demo.')}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
          background: 'none', border: '1px solid var(--border)', borderRadius: '6px',
          padding: '8px', color: 'var(--text-secondary)', fontSize: '12px',
          cursor: 'pointer', fontFamily: 'inherit',
        }}
      >
        Ver perfil completo <ChevronRight size={12} />
      </button>
    </div>
  )
}

export default function TecnicosAdmin({ showToast }) {
  const [companyFilter, setCompanyFilter] = useState('all')

  const filtered = TECNICOS.filter(t => {
    if (companyFilter === 'all') return true
    if (companyFilter === 'pool') return t.company === null
    return t.company === companyFilter
  })

  const available = TECNICOS.filter(t => t.status === 'available').length
  const onSite    = TECNICOS.filter(t => t.status === 'on-site').length
  const poolCount = TECNICOS.filter(t => t.company === null).length

  const tab = (id, label) => (
    <button
      key={id}
      onClick={() => setCompanyFilter(id)}
      style={{
        padding: '6px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer',
        fontSize: '13px', fontFamily: 'inherit', fontWeight: 500,
        background: companyFilter === id ? 'var(--bg-elevated)' : 'transparent',
        color: companyFilter === id ? 'var(--text-primary)' : 'var(--text-muted)',
        transition: 'all 150ms',
      }}
    >
      {label}
    </button>
  )

  return (
    <div style={{ padding: '32px', maxWidth: '1180px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px' }}>Técnicos</h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
          Equipo de servicio de Monitt — dedicados por empresa y pool general
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Total técnicos', value: TECNICOS.length, color: 'var(--text-primary)' },
          { label: 'Disponibles',    value: available, color: '#30BF12' },
          { label: 'En terreno',     value: onSite, color: '#F59E0B' },
          { label: 'Pool general',   value: poolCount, color: '#0EA5E9' },
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

      {/* Company filter */}
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '8px 12px' }}>
        {tab('all', 'Todos')}
        {EMPRESAS.map(e => tab(e.id, e.short))}
        {tab('pool', 'Pool general')}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {filtered.map(tech => (
          <TechCard key={tech.id} tech={tech} showToast={showToast} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
          No hay técnicos en esta categoría.
        </div>
      )}
    </div>
  )
}
