import { useState } from 'react'
import { Upload, Filter, Calendar, TrendingUp, TrendingDown, ChevronRight, Sparkles, MoreHorizontal, ArrowUpRight } from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell,
} from 'recharts'

/* ── Sensor performance data (last 8 months) ── */
const PERF_DATA = [
  { month: 'Ene', healthy: 22, alerts: 18 },
  { month: 'Feb', healthy: 38, alerts: 28 },
  { month: 'Mar', healthy: 52, alerts: 42 },
  { month: 'Abr', healthy: 61, alerts: 30 },
  { month: 'May', healthy: 75, alerts: 38 },
  { month: 'Jun', healthy: 83, alerts: 44 },
  { month: 'Jul', healthy: 88, alerts: 52 },
  { month: 'Ago', healthy: 91, alerts: 55 },
]

/* ── Fleet health donut ── */
const DONUT_DATA = [
  { name: 'Operativo', value: 2, color: '#A8E63D' },
  { name: 'Atención',  value: 1, color: '#F97316' },
]

/* ── Recent orders ── */
const ORDERS = [
  { name: 'Cambio filtro aceite',  asset: 'GEN-002', assigned: 'Luis Ponce',   due: '2026-05-25', completed: '2026-05-25', priority: 'Alta' },
  { name: 'Revisión rutinaria',    asset: 'GEN-001', assigned: 'Marco Silva',  due: '2026-06-10', completed: '2026-06-10', priority: 'Normal' },
  { name: 'Inspección anual',      asset: 'GEN-003', assigned: 'Luis Ponce',   due: '2026-07-15', completed: '—',          priority: 'Normal' },
]

/* ── Custom tooltip for area chart ── */
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 14px', fontSize: '12px' }}>
      <p style={{ color: 'var(--text-muted)', margin: '0 0 6px', fontWeight: 500 }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color, margin: '2px 0', fontWeight: 600 }}>
          {p.name === 'healthy' ? 'Flota saludable' : 'Alertas activas'}: {p.value}%
        </p>
      ))}
    </div>
  )
}

/* ── KPI Card ── */
function KpiCard({ label, value, change, positive, sub }) {
  return (
    <div style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '20px 22px',
      flex: 1,
      boxShadow: 'var(--card-glow)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>{label}</p>
        <ArrowUpRight size={14} style={{ color: 'var(--text-muted)' }} />
      </div>
      <p style={{ fontSize: '36px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px', lineHeight: 1, letterSpacing: '-1px' }}>
        {value}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{
          fontSize: '12px', fontWeight: 600,
          color: positive ? 'var(--green-400)' : 'var(--orange)',
          display: 'flex', alignItems: 'center', gap: '2px',
        }}>
          {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {change}
        </span>
        {sub && <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{sub}</span>}
      </div>
    </div>
  )
}

/* ── Main Dashboard ── */
export default function Dashboard({ navigate, orderCompleted, showToast }) {
  const [activeTab, setActiveTab] = useState('overview')

  const gen002Status  = orderCompleted ? 'Operativo'        : 'Atención requerida'
  const gen002Score   = orderCompleted ? 89                  : 58
  const gen002Color   = orderCompleted ? 'var(--green-400)' : 'var(--orange)'
  const fleetScore    = orderCompleted ? 89                  : 74
  const alertCount    = orderCompleted ? 0                   : 1
  const donutData     = orderCompleted
    ? [{ name: 'Operativo', value: 3, color: '#A8E63D' }]
    : DONUT_DATA

  const comingSoon = () => showToast('Vista de detalle no disponible en esta demo.')

  const TABS = ['overview', 'activity', 'manage']
  const TAB_LABELS = { overview: 'Overview', activity: 'Actividad', manage: 'Gestión' }

  return (
    <div style={{ padding: '28px 28px 40px', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '0' }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: '24px' }}>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 6px' }}>
          Reportes / <span style={{ color: 'var(--text-secondary)' }}>Mi Flota</span>
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.5px' }}>
            Mi Flota ↓
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button style={btnStyle('ghost')}>
              <Calendar size={14} /> 25 may, 2026
            </button>
            <button style={btnStyle('ghost')}>
              <Filter size={14} /> Filtrar
            </button>
            <button style={btnStyle('primary')}>
              <Upload size={14} /> Exportar
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginTop: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '0' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              padding: '8px 16px',
              borderRadius: '8px 8px 0 0',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 500,
              fontFamily: 'inherit',
              background: activeTab === t ? 'var(--bg-surface)' : 'transparent',
              color: activeTab === t ? 'var(--text-primary)' : 'var(--text-muted)',
              borderBottom: activeTab === t ? '2px solid var(--green-400)' : '2px solid transparent',
              transition: 'all 150ms',
            }}>
              {TAB_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      {/* ── Body: left+center | right panel ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '16px', flex: 1 }}>

        {/* LEFT + CENTER */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>

          {/* KPI row */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <KpiCard label="Activos operativos"     value="3/3"            change="+100%"  positive sub="todos en línea" />
            <KpiCard label="Score de flota"          value={fleetScore}     change={fleetScore >= 80 ? '+2.3%' : '-3.1%'} positive={fleetScore >= 80} sub="vs. mes anterior" />
            <KpiCard label="Alertas activas"         value={alertCount}     change={alertCount === 0 ? '0 activas' : '+1 nueva'} positive={alertCount === 0} sub={alertCount === 0 ? 'sin incidencias' : 'requiere atención'} />
          </div>

          {/* Area chart */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px 22px', boxShadow: 'var(--card-glow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 2px' }}>Rendimiento de flota</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Health score vs. alertas (últimos 8 meses)</p>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['Mensual', 'Semanal'].map(l => (
                  <button key={l} style={{ ...btnStyle('ghost'), fontSize: '11px', padding: '4px 10px' }}>{l}</button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={PERF_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="gradGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#A8E63D" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#A8E63D" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gradOrange" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#F97316" stopOpacity={0.20} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickCount={5} tickFormatter={v => `${v}%`} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="healthy" stroke="#A8E63D" strokeWidth={2.5} fill="url(#gradGreen)" dot={false} />
                <Area type="monotone" dataKey="alerts"  stroke="#F97316" strokeWidth={2}   fill="url(#gradOrange)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Orders table */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--card-glow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 2px' }}>Órdenes de trabajo</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Historial reciente de intervenciones</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ ...btnStyle('ghost'), fontSize: '11px', padding: '4px 10px' }}>Diario ↓</button>
                <button style={{ ...btnStyle('ghost'), fontSize: '11px', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Ver todo <ArrowUpRight size={11} />
                </button>
              </div>
            </div>
            {/* Table head */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', padding: '10px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
              {['Trabajo', 'Activo', 'Asignado', 'Fecha', 'Prioridad'].map(h => (
                <span key={h} style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{h}</span>
              ))}
            </div>
            {ORDERS.map((o, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                padding: '12px 20px',
                borderBottom: i < ORDERS.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                alignItems: 'center',
              }}>
                <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>{o.name}</span>
                <span style={{ fontSize: '12px', color: 'var(--green-400)', fontWeight: 600 }}>{o.asset}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{o.assigned}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{o.due}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: o.priority === 'Alta' ? '#F97316' : 'var(--green-400)', flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', color: o.priority === 'Alta' ? '#F97316' : 'var(--green-400)' }}>{o.priority}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {/* Donut chart — Fleet health */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', boxShadow: 'var(--card-glow)', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Estado de flota</p>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><MoreHorizontal size={16} /></button>
            </div>
            <div style={{ position: 'relative', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PieChart width={140} height={140}>
                <Pie data={donutData} cx={65} cy={65} innerRadius={44} outerRadius={62} paddingAngle={3} dataKey="value" strokeWidth={0}>
                  {donutData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
              </PieChart>
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <p style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1 }}>
                  {orderCompleted ? '3' : '3'}
                </p>
                <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: '2px 0 0' }}>Total</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '4px' }}>
              {donutData.map(d => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: d.color }} />
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{d.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '18px 20px', boxShadow: 'var(--card-glow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Actividad reciente</p>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--green-400)', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px', fontFamily: 'inherit' }}>
                Ver todo <ArrowUpRight size={11} />
              </button>
            </div>
            {[
              { label: 'GEN-002 — Filtro reemplazado', sub: 'Orden completada', count: '1/1', color: 'var(--green-400)' },
              { label: 'Alerta de lubricación cerrada', sub: 'GEN-002',          count: '5 días', color: '#F97316' },
              { label: 'GEN-001 — Revisión rutinaria', sub: 'Sin hallazgos',    count: '28 días', color: 'var(--green-400)' },
            ].map(({ label, sub, count, color }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: color, flexShrink: 0, marginTop: '4px' }} />
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)', margin: '0 0 1px' }}>{label}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>{sub}</p>
                  </div>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', flexShrink: 0 }}>{count}</span>
              </div>
            ))}
          </div>

          {/* Generator health progress */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '18px 20px', boxShadow: 'var(--card-glow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Health por activo</p>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Hoy ↓</span>
            </div>
            {[
              { name: 'GEN-001 — Bodega Norte', score: 91, color: '#A8E63D' },
              { name: 'GEN-002 — Bodega Sur',   score: gen002Score, color: gen002Color.replace('var(--green-400)', '#A8E63D').replace('var(--orange)', '#F97316') },
              { name: 'GEN-003 — Bodega Sur',   score: 87, color: '#A8E63D' },
            ].map(({ name, score, color }) => (
              <div key={name} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>{name}</p>
                  <span style={{ fontSize: '12px', fontWeight: 700, color }}>{score}%</span>
                </div>
                <div style={{ height: '5px', background: 'var(--bg-elevated)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div className="health-bar" style={{ height: '100%', width: `${score}%`, background: color, borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </div>

          {/* AI insight */}
          {!orderCompleted && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(168,230,61,0.08) 0%, rgba(168,230,61,0.02) 100%)',
              border: '1px solid rgba(168,230,61,0.2)',
              borderRadius: '12px', padding: '16px',
            }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <Sparkles size={15} style={{ color: 'var(--green-400)', flexShrink: 0, marginTop: '1px' }} />
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--text-primary)', margin: '0 0 8px', lineHeight: 1.6 }}>
                    GEN-002 tiene una anomalía activa. Probabilidad de falla: <strong style={{ color: '#F97316' }}>73%</strong> en 7 días.
                  </p>
                  <button onClick={() => navigate('activo-gen002')} style={{
                    background: 'var(--green-400)', border: 'none', borderRadius: '6px',
                    padding: '6px 12px', fontSize: '11px', fontWeight: 600, color: '#111',
                    cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '4px',
                  }}>
                    Ver análisis <ChevronRight size={11} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Shared button style helper ── */
function btnStyle(variant) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    padding: '7px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 500,
    cursor: 'pointer', fontFamily: 'inherit', transition: 'all 150ms',
  }
  if (variant === 'primary') return { ...base,
    background: 'var(--green-400)', border: '1px solid var(--green-400)', color: '#111',
  }
  return { ...base,
    background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)',
  }
}
