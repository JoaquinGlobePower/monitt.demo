import { ArrowLeft, AlertTriangle, Clock, BarChart2, Sparkles, ChevronDown, ChevronUp, Cpu } from 'lucide-react'
import { useState } from 'react'
import {
  ResponsiveContainer, ComposedChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ReferenceArea,
  LineChart,
} from 'recharts'

// 30 days of oil pressure data (Apr 25 – May 24, 2026)
const SENSOR_DATA = [
  { day: 1,  label: '25 abr', pressure: 3.75 },
  { day: 2,  label: '26 abr', pressure: 3.82 },
  { day: 3,  label: '27 abr', pressure: 3.71 },
  { day: 4,  label: '28 abr', pressure: 3.85 },
  { day: 5,  label: '29 abr', pressure: 3.79 },
  { day: 6,  label: '30 abr', pressure: 3.88 },
  { day: 7,  label: '1 may',  pressure: 3.72 },
  { day: 8,  label: '2 may',  pressure: 3.80 },
  { day: 9,  label: '3 may',  pressure: 3.76 },
  { day: 10, label: '4 may',  pressure: 3.84 },
  { day: 11, label: '5 may',  pressure: 3.78 },
  { day: 12, label: '6 may',  pressure: 3.86 },
  { day: 13, label: '7 may',  pressure: 3.71 },
  { day: 14, label: '8 may',  pressure: 3.83 },
  { day: 15, label: '9 may',  pressure: 3.77 },
  { day: 16, label: '10 may', pressure: 3.89 },
  { day: 17, label: '11 may', pressure: 3.74 },
  { day: 18, label: '12 may', pressure: 3.81 },
  { day: 19, label: '13 may', pressure: 3.76 },
  { day: 20, label: '14 may', pressure: 3.68 },
  { day: 21, label: '15 may', pressure: 3.55 },
  { day: 22, label: '16 may', pressure: 3.41 },
  { day: 23, label: '17 may', pressure: 3.28 },
  { day: 24, label: '18 may', pressure: 3.14 },
  { day: 25, label: '19 may', pressure: 3.02 },
  { day: 26, label: '20 may', pressure: 2.91 },
  { day: 27, label: '21 may', pressure: 2.82 },
  { day: 28, label: '22 may', pressure: 2.74 },
  { day: 29, label: '23 may', pressure: 2.67 },
  { day: 30, label: '24 may', pressure: 2.60 },
].map((d, i) => ({
  ...d,
  pressureGreen: i <= 22 ? d.pressure : null,
  pressureAmber: i >= 22 ? d.pressure : null,
  normalMin: 3.2,
  normalMax: 4.1,
}))

// Health trend sparkline data (last 7 days, going from ~87 to 58)
const HEALTH_TREND = [87, 84, 79, 74, 68, 63, 58].map((v, i) => ({ i, v }))

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  const val = payload.find(p => p.value != null)
  if (!val) return null
  return (
    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '6px', padding: '8px 12px', fontSize: '12px' }}>
      <p style={{ color: 'var(--text-muted)', margin: '0 0 4px' }}>{label}</p>
      <p style={{ color: val.value < 3.2 ? '#F59E0B' : '#30BF12', margin: 0, fontWeight: 600 }}>
        {val.value} bar
      </p>
    </div>
  )
}

export default function AssetDetail({ navigate }) {
  const [historyOpen, setHistoryOpen] = useState(false)

  const xAxisFormatter = (day) => {
    const item = SENSOR_DATA.find(d => d.day === day)
    return [1, 5, 10, 15, 20, 25, 30].includes(day) ? item?.label || '' : ''
  }

  return (
    <div style={{ padding: '32px', maxWidth: '960px', margin: '0 auto' }}>
      {/* Breadcrumb */}
      <button onClick={() => navigate('dashboard')} style={{
        display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none',
        color: 'var(--text-muted)', fontSize: '13px', cursor: 'pointer', padding: 0, marginBottom: '24px', fontFamily: 'inherit',
      }}>
        <ArrowLeft size={14} /> Dashboard &rsaquo; GEN-002 Bodega Sur
      </button>

      {/* Asset header */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>GEN-002</h1>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                padding: '3px 10px', borderRadius: '20px',
                background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)',
                fontSize: '12px', fontWeight: 500, color: '#F59E0B',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F59E0B', flexShrink: 0 }} />
                ATENCIÓN REQUERIDA
              </span>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>Bodega Sur — San Bernardo</p>
          </div>
          <Cpu size={20} style={{ color: 'var(--text-muted)' }} />
        </div>
        {/* Quick stats */}
        <div style={{ display: 'flex', gap: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
          {[
            ['Marca', 'Cummins PowerCommand 2.2'],
            ['Protocolo', 'Modbus RTU'],
            ['Horas operación', '4,218 h'],
          ].map(([k, v]) => (
            <div key={k}>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0 0 2px' }}>{k}</p>
              <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', margin: 0 }}>{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Health score hero */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '24px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '32px' }}>
        <div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Health Score</p>
          <div style={{ fontSize: '56px', fontWeight: 700, color: '#F59E0B', lineHeight: 1 }}>58</div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '8px 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: '#EF4444' }}>↓</span> 29 puntos en los últimos 7 días
          </p>
        </div>

        {/* Spark */}
        <div style={{ flex: 1, maxWidth: '200px' }}>
          <ResponsiveContainer width="100%" height={50}>
            <LineChart data={HEALTH_TREND}>
              <Line type="monotone" dataKey="v" stroke="#F59E0B" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* RUL pill */}
        <div style={{
          marginLeft: 'auto',
          padding: '10px 16px',
          borderRadius: '8px',
          background: 'rgba(245,158,11,0.08)',
          border: '1px solid rgba(245,158,11,0.2)',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0 0 4px' }}>Vida útil estimada</p>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#F59E0B', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={14} /> Intervención en 12–18 días
          </p>
        </div>
      </div>

      {/* Sensor chart */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '24px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-primary)', margin: '0 0 20px' }}>
          Presión de aceite — últimos 30 días
        </h2>
        <ResponsiveContainer width="100%" height={220}>
          <ComposedChart data={SENSOR_DATA} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="day"
              tickFormatter={xAxisFormatter}
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[2.2, 4.4]}
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
              tickCount={5}
              tickFormatter={v => `${v}`}
              width={36}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* Normal operating range band */}
            <ReferenceArea y1={3.2} y2={4.1} fill="#30BF12" fillOpacity={0.07} />
            {/* Upper bound line */}
            <ReferenceLine y={4.1} stroke="#30BF12" strokeOpacity={0.3} strokeDasharray="4 4" strokeWidth={1} />
            {/* Lower bound line */}
            <ReferenceLine y={3.2} stroke="#30BF12" strokeOpacity={0.3} strokeDasharray="4 4" strokeWidth={1} />
            {/* Anomaly detection marker */}
            <ReferenceLine
              x={20}
              stroke="#F59E0B"
              strokeDasharray="5 3"
              strokeWidth={1.5}
              label={{ value: 'Anomalía detectada', position: 'insideTopRight', fontSize: 11, fill: '#F59E0B', offset: 8 }}
            />
            {/* In-range line (green) */}
            <Line type="monotone" dataKey="pressureGreen" stroke="#30BF12" strokeWidth={2} dot={false} connectNulls={false} />
            {/* Out-of-range line (amber) */}
            <Line type="monotone" dataKey="pressureAmber" stroke="#F59E0B" strokeWidth={2} dot={false} connectNulls={false} />
          </ComposedChart>
        </ResponsiveContainer>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '12px 0 0' }}>
          Rango normal: 3.2 – 4.1 bar&nbsp;&nbsp;·&nbsp;&nbsp;Lectura actual: <strong style={{ color: '#F59E0B' }}>2.6 bar</strong>&nbsp;&nbsp;·&nbsp;&nbsp;Estado: <strong style={{ color: '#F59E0B' }}>Fuera de rango</strong>
        </p>
      </div>

      {/* AI diagnostic */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderLeft: '3px solid var(--green-500)', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Sparkles size={16} style={{ color: 'var(--green-500)' }} />
          <h2 style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>Diagnóstico IA</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {[
            { icon: '⚠️', text: 'Presión de aceite con tendencia descendente consistente por 8 días' },
            { icon: '📊', text: 'Patrón coincide con 3 casos históricos de falla por lubricación en flota comparable' },
            { icon: '🕐', text: 'Probabilidad de falla en los próximos 7 días: 73%' },
          ].map(({ icon, text }) => (
            <div key={text} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '15px', flexShrink: 0 }}>{icon}</span>
              <p style={{ fontSize: '14px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.6 }}>{text}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate('alerta-gen002')}
          style={{
            width: '100%', padding: '12px', borderRadius: '8px',
            background: 'var(--green-500)', border: 'none', color: '#fff',
            fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            marginBottom: '10px', transition: 'opacity 150ms',
          }}
        >
          Solicitar técnico ahora →
        </button>
        <button style={{
          background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '12px',
          cursor: 'pointer', padding: 0, fontFamily: 'inherit', display: 'block', margin: '0 auto',
        }}>
          Descartar alerta
        </button>
      </div>

      {/* Intervention history */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
        <button
          onClick={() => setHistoryOpen(!historyOpen)}
          style={{
            width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-primary)', fontSize: '15px', fontWeight: 500, fontFamily: 'inherit',
          }}
        >
          Historial de intervenciones
          {historyOpen ? <ChevronUp size={16} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />}
        </button>
        {historyOpen && (
          <div style={{ borderTop: '1px solid var(--border)', padding: '16px 20px' }}>
            {[
              { date: '18 may 2026', action: 'Revisión rutinaria', result: 'Sin hallazgos' },
              { date: '02 mar 2026', action: 'Cambio filtro de aceite', result: 'Completado' },
              { date: '15 nov 2025', action: 'Inspección anual', result: 'Completado' },
            ].map(({ date, action, result }, i, arr) => (
              <div key={date} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', paddingBottom: i < arr.length - 1 ? '16px' : 0, marginBottom: i < arr.length - 1 ? '16px' : 0, borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green-500)', flexShrink: 0, marginTop: '5px' }} />
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', margin: '0 0 2px' }}>{action}</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{date} · {result}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
