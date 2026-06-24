import { Cpu, AlertTriangle, MapPin, Users, ChevronRight, CheckCircle } from 'lucide-react'
import { EMPRESAS, TECNICOS } from '../../data/adminData'

function EmpresaCard({ emp, dedicatedCount, showToast }) {
  return (
    <div style={{
      background: 'var(--bg-surface)', border: '1px solid var(--border)',
      borderLeft: `3px solid ${emp.accent}`,
      borderRadius: '10px', padding: '20px',
      display: 'flex', flexDirection: 'column', gap: '16px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '9px', flexShrink: 0,
            background: `${emp.accent}1f`, color: emp.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 700,
          }}>
            {emp.initials}
          </div>
          <div>
            <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 2px' }}>{emp.name}</p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{emp.rut} · Cliente desde {emp.since}</p>
          </div>
        </div>
        <span style={{
          fontSize: '11px', fontWeight: 500, padding: '3px 9px', borderRadius: '5px',
          background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)',
        }}>
          {emp.plan}
        </span>
      </div>

      {/* Location */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <MapPin size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{emp.location}</span>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '7px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
            <Cpu size={12} style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Activos</span>
          </div>
          <p style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1 }}>{emp.assets}</p>
        </div>
        <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '7px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
            <AlertTriangle size={12} style={{ color: emp.activeAlerts > 0 ? '#EF4444' : 'var(--text-muted)' }} />
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Alertas</span>
          </div>
          <p style={{ fontSize: '20px', fontWeight: 700, color: emp.activeAlerts > 0 ? '#EF4444' : '#30BF12', margin: 0, lineHeight: 1 }}>{emp.activeAlerts}</p>
        </div>
        <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '7px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
            <Users size={12} style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Técnicos</span>
          </div>
          <p style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1 }}>{dedicatedCount}</p>
        </div>
      </div>

      <button
        onClick={() => showToast('Detalle de empresa no disponible en esta demo.')}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
          background: 'none', border: '1px solid var(--border)', borderRadius: '6px',
          padding: '8px', color: 'var(--text-secondary)', fontSize: '12px',
          cursor: 'pointer', fontFamily: 'inherit',
        }}
      >
        Ver portafolio del cliente <ChevronRight size={12} />
      </button>
    </div>
  )
}

export default function Empresas({ showToast }) {
  const totalAssets = EMPRESAS.reduce((s, e) => s + e.assets, 0)
  const totalAlerts = EMPRESAS.reduce((s, e) => s + e.activeAlerts, 0)
  const dedicatedCount = (empId) => TECNICOS.filter(t => t.company === empId).length

  return (
    <div style={{ padding: '32px', maxWidth: '1180px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px' }}>Empresas cliente</h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
          Portafolio de clientes de Monitt.io y sus activos monitoreados
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Empresas',           value: EMPRESAS.length, color: 'var(--text-primary)' },
          { label: 'Activos totales',    value: totalAssets, color: 'var(--text-primary)' },
          { label: 'Alertas activas',    value: totalAlerts, color: totalAlerts > 0 ? '#F59E0B' : '#30BF12' },
          { label: 'Planes Enterprise',  value: EMPRESAS.filter(e => e.plan === 'Enterprise').length, color: '#30BF12' },
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

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
        {EMPRESAS.map(emp => (
          <EmpresaCard key={emp.id} emp={emp} dedicatedCount={dedicatedCount(emp.id)} showToast={showToast} />
        ))}
      </div>
    </div>
  )
}
