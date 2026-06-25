import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Tooltip as LeafletTooltip, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Building2, Cpu, AlertTriangle, TrendingUp, Calendar, CheckCircle, ChevronRight } from 'lucide-react'
import { BUILDINGS, BUILDING_STATUS } from '../data/buildings'
import { empresaById } from '../data/adminData'

const SANTIAGO_CENTER = [-33.47, -70.66]
const SEVERITY = { critical: 0, warning: 1, ok: 2 }

// Ajusta el encuadre del mapa a los edificios visibles (clave estable para no
// reencuadrar al seleccionar un marcador).
function FitBounds({ points }) {
  const map = useMap()
  const key = points.map(p => p.join(',')).join('|')
  useEffect(() => {
    if (!points.length) return
    if (points.length === 1) map.setView(points[0], 13)
    else map.fitBounds(points, { padding: [40, 40] })
  }, [map, key]) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}

// companyId === null  → vista superadmin (todos los clientes)
// companyId === 'EMP-x' → vista cliente (solo SUS equipos)
export default function BuildingsMap({ companyId = null, orderCompleted, navigate }) {
  const isAdminView = !companyId

  // Estado dinámico de la demo (Bodega Sur sigue la alerta de GEN-002) + filtro por cliente.
  const all = BUILDINGS.map(b =>
    b.id === 'ta-sur' && orderCompleted
      ? { ...b, status: 'ok', healthScore: 89, activeAlerts: 0, uptime: 99.4 }
      : b
  )
  const buildings = isAdminView ? all : all.filter(b => b.companyId === companyId)

  const [selectedId, setSelectedId] = useState(() => {
    const list = companyId ? BUILDINGS.filter(b => b.companyId === companyId) : BUILDINGS
    return [...list].sort((a, b) => SEVERITY[a.status] - SEVERITY[b.status])[0]?.id ?? null
  })
  const selected = buildings.find(b => b.id === selectedId) || null

  const counts = buildings.reduce((acc, b) => { acc[b.status] = (acc[b.status] || 0) + 1; return acc }, {})
  const clientCount = new Set(buildings.map(b => b.companyId)).size
  const points = buildings.map(b => [b.lat, b.lng])

  const title = isAdminView ? 'Equipos instalados — todos los clientes' : 'Ubicaciones de tus equipos'
  const subtitle = isAdminView
    ? `${buildings.length} sedes · ${clientCount} clientes · click para ver KPIs`
    : `${buildings.length} ${buildings.length === 1 ? 'sede monitoreada' : 'sedes monitoreadas'} · click para ver KPIs`

  return (
    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--card-glow)' }}>
      {/* Header + leyenda */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--border)', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Building2 size={16} style={{ color: 'var(--green-400)' }} />
          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 2px' }}>{title}</p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{subtitle}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '14px' }}>
          {Object.entries(BUILDING_STATUS).map(([key, { label, color }]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: color }} />
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{label}{counts[key] ? ` (${counts[key]})` : ''}</span>
            </div>
          ))}
        </div>
      </div>

      {buildings.length === 0 ? (
        <div style={{ padding: '48px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Building2 size={28} style={{ marginBottom: '10px', opacity: 0.5 }} />
          <p style={{ fontSize: '13px', margin: 0 }}>No hay equipos registrados para tu cuenta todavía.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', height: '380px' }}>
          <div style={{ position: 'relative' }}>
            <MapContainer center={SANTIAGO_CENTER} zoom={10} scrollWheelZoom={false} style={{ height: '100%', width: '100%', background: '#0b0b0c' }}>
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
              <FitBounds points={points} />
              {buildings.map(b => {
                const color = BUILDING_STATUS[b.status].color
                const isSel = b.id === selectedId
                const emp = empresaById(b.companyId)
                return (
                  <CircleMarker
                    key={b.id}
                    center={[b.lat, b.lng]}
                    radius={isSel ? 12 : 8}
                    pathOptions={{ color: '#fff', weight: isSel ? 3 : 2, opacity: 0.9, fillColor: color, fillOpacity: 0.95 }}
                    eventHandlers={{ click: () => setSelectedId(b.id) }}
                  >
                    <LeafletTooltip direction="top" offset={[0, -8]}>
                      {b.short}{isAdminView && emp ? ` · ${emp.short}` : ''} · {BUILDING_STATUS[b.status].label}
                    </LeafletTooltip>
                  </CircleMarker>
                )
              })}
            </MapContainer>
          </div>

          <div style={{ borderLeft: '1px solid var(--border)', background: 'var(--bg-surface)', overflowY: 'auto', padding: '18px 20px' }}>
            {selected ? <BuildingPanel b={selected} isAdminView={isAdminView} navigate={navigate} /> : <EmptyPanel />}
          </div>
        </div>
      )}
    </div>
  )
}

function BuildingPanel({ b, isAdminView, navigate }) {
  const st = BUILDING_STATUS[b.status]
  const emp = empresaById(b.companyId)
  return (
    <>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: `${st.color}1f`, border: `1px solid ${st.color}55`, borderRadius: '20px', padding: '3px 10px', marginBottom: '12px' }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: st.color }} />
        <span style={{ fontSize: '11px', fontWeight: 700, color: st.color, letterSpacing: '0.3px' }}>{st.label}</span>
      </div>

      <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 2px' }}>{b.name}</p>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 16px' }}>{b.address}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {isAdminView && emp && <Kpi icon={Building2} label="Cliente" value={emp.short} small />}
        <Kpi icon={CheckCircle}   label="Health score"      value={`${b.healthScore}%`} valueColor={st.color} />
        <Kpi icon={Cpu}           label="Equipos"           value={b.assets} />
        <Kpi icon={AlertTriangle} label="Alertas activas"   value={b.activeAlerts} valueColor={b.activeAlerts > 0 ? '#EF4444' : 'var(--text-primary)'} />
        <Kpi icon={TrendingUp}    label="Uptime"            value={`${b.uptime}%`} />
        <Kpi icon={Calendar}      label="Última inspección" value={b.lastInspection} small />
      </div>

      <button
        onClick={() => navigate && navigate(isAdminView ? 'solicitudes' : 'activos')}
        style={{ marginTop: '18px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: '8px', padding: '9px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
      >
        {isAdminView ? 'Gestionar / enviar técnico' : 'Ver equipos de la sede'} <ChevronRight size={13} />
      </button>
    </>
  )
}

function Kpi({ icon: Icon, label, value, valueColor, small }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
        <Icon size={14} style={{ color: 'var(--text-muted)' }} /> {label}
      </span>
      <span style={{ fontSize: small ? '12px' : '15px', fontWeight: 700, color: valueColor || 'var(--text-primary)' }}>{value}</span>
    </div>
  )
}

function EmptyPanel() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'var(--text-muted)' }}>
      <Building2 size={28} style={{ marginBottom: '10px', opacity: 0.5 }} />
      <p style={{ fontSize: '13px', margin: 0 }}>Selecciona un equipo en el mapa para ver sus KPIs.</p>
    </div>
  )
}
