import { Bell, Sliders, Users, Plug, ChevronRight, Shield, Building2 } from 'lucide-react'
import { useState } from 'react'

function SectionCard({ title, description, icon: Icon, children }) {
  return (
    <div style={{
      background: 'var(--bg-surface)', border: '1px solid var(--border)',
      borderRadius: '10px', overflow: 'hidden', marginBottom: '16px',
    }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '7px',
          background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icon size={15} style={{ color: 'var(--text-muted)' }} />
        </div>
        <div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{title}</p>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{description}</p>
        </div>
      </div>
      <div style={{ padding: '20px' }}>{children}</div>
    </div>
  )
}

function ToggleRow({ label, description, defaultOn, onToggle }) {
  const [on, setOn] = useState(defaultOn)
  const toggle = () => {
    setOn(!on)
    if (onToggle) onToggle(!on)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
      <div>
        <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', margin: '0 0 2px' }}>{label}</p>
        {description && <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{description}</p>}
      </div>
      <button
        onClick={toggle}
        style={{
          width: '40px', height: '22px', borderRadius: '11px',
          background: on ? 'var(--green-500)' : 'var(--bg-elevated)',
          border: '1px solid ' + (on ? 'var(--green-500)' : 'var(--border)'),
          cursor: 'pointer', position: 'relative', flexShrink: 0, transition: 'all 200ms',
        }}
      >
        <span style={{
          position: 'absolute', top: '2px',
          left: on ? '19px' : '3px',
          width: '16px', height: '16px', borderRadius: '50%',
          background: '#fff', transition: 'left 200ms',
        }} />
      </button>
    </div>
  )
}

function ThresholdRow({ label, value, unit, showToast }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
      <div>
        <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>{label}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)',
          background: 'var(--bg-elevated)', padding: '4px 10px', borderRadius: '5px',
          border: '1px solid var(--border)',
        }}>
          {value} <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '11px' }}>{unit}</span>
        </span>
        <button
          onClick={() => showToast('Edición no disponible en esta demo.')}
          style={{
            background: 'none', border: '1px solid var(--border)', borderRadius: '5px',
            padding: '4px 10px', color: 'var(--text-muted)', fontSize: '12px',
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          Editar
        </button>
      </div>
    </div>
  )
}

function UserRow({ name, email, role, initials, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 0', borderBottom: last ? 'none' : '1px solid var(--border)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: 'var(--green-700)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '11px', fontWeight: 700, color: 'var(--green-400)', flexShrink: 0,
        }}>
          {initials}
        </div>
        <div>
          <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>{name}</p>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{email}</p>
        </div>
      </div>
      <span style={{
        fontSize: '11px', padding: '3px 8px',
        background: 'var(--bg-elevated)', border: '1px solid var(--border)',
        borderRadius: '4px', color: 'var(--text-secondary)',
      }}>
        {role}
      </span>
    </div>
  )
}

function IntegrationRow({ name, description, connected, last, showToast }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 0', borderBottom: last ? 'none' : '1px solid var(--border)',
    }}>
      <div>
        <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', margin: '0 0 2px' }}>{name}</p>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{description}</p>
      </div>
      <button
        onClick={() => showToast('Función no disponible en esta demo.')}
        style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          background: connected ? 'rgba(48,191,18,0.08)' : 'none',
          border: `1px solid ${connected ? 'rgba(48,191,18,0.3)' : 'var(--border)'}`,
          borderRadius: '6px', padding: '5px 12px',
          color: connected ? '#30BF12' : 'var(--text-secondary)',
          fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit',
        }}
      >
        {connected ? 'Conectado' : 'Conectar'} <ChevronRight size={11} />
      </button>
    </div>
  )
}

export default function Configuracion({ showToast }) {
  return (
    <div style={{ padding: '32px', maxWidth: '820px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px' }}>Configuración</h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
          Preferencias y ajustes de la cuenta — TransAndina Logística
        </p>
      </div>

      {/* Account info */}
      <SectionCard title="Cuenta" description="Información del cliente y plan" icon={Building2}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[
            { label: 'Razón social',   value: 'TransAndina Logística S.A.' },
            { label: 'RUT',            value: '76.123.456-7' },
            { label: 'Plan',           value: 'Enterprise — 10 activos' },
            { label: 'Vigencia',       value: 'Hasta dic 2026' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</p>
              <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Notifications */}
      <SectionCard title="Notificaciones" description="Alertas y avisos del sistema" icon={Bell}>
        <ToggleRow label="Alertas críticas" description="Email y SMS inmediato ante falla" defaultOn={true} />
        <ToggleRow label="Resumen diario" description="Reporte al inicio de cada día" defaultOn={true} />
        <ToggleRow label="Mantenciones próximas" description="Aviso con 14 días de anticipación" defaultOn={true} />
        <ToggleRow label="Cambios de health score" description="Notificación al superar umbrales" defaultOn={false} />
      </SectionCard>

      {/* Users */}
      <SectionCard title="Usuarios y acceso" description="Personas con acceso a la plataforma" icon={Users}>
        <UserRow name="Cristián Bravo" email="cbravo@transandina.cl" role="Supervisor" initials="CB" last />
        <button
          onClick={() => showToast('Función no disponible en esta demo.')}
          style={{
            marginTop: '14px',
            background: 'none', border: '1px dashed var(--border)', borderRadius: '7px',
            width: '100%', padding: '10px', color: 'var(--text-muted)', fontSize: '13px',
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          + Invitar usuario
        </button>
      </SectionCard>

      {/* Integrations */}
      <SectionCard title="Integraciones" description="Conecta con herramientas externas" icon={Plug}>
        <IntegrationRow name="SAP PM"    description="Sincroniza órdenes de trabajo con ERP"  connected={false} showToast={showToast} />
        <IntegrationRow name="Slack"     description="Notificaciones en canales del equipo"    connected={true}  showToast={showToast} />
        <IntegrationRow name="Twilio SMS" description="Alertas por mensaje de texto"           connected={true}  showToast={showToast} />
        <IntegrationRow name="Power BI"  description="Exporta datos a dashboards ejecutivos"   connected={false} showToast={showToast} last />
      </SectionCard>

      {/* Security */}
      <SectionCard title="Seguridad" description="Autenticación y acceso" icon={Shield}>
        <ToggleRow label="Autenticación de dos factores" description="Requerida para todos los usuarios" defaultOn={true} />
        <ToggleRow label="Sesiones simultáneas" description="Permite múltiples dispositivos activos" defaultOn={false} />
      </SectionCard>
    </div>
  )
}
