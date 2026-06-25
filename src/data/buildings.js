// Sedes con equipos monitoreados, por cliente. status: 'ok' | 'warning' | 'critical'.
// companyId enlaza con EMPRESAS (adminData.js): el CLIENTE solo ve los suyos;
// el SUPERADMIN ve todos los de todos los clientes.

export const BUILDING_STATUS = {
  ok:       { label: 'Operativo', color: '#A8E63D' },
  warning:  { label: 'Atención',  color: '#F59E0B' },
  critical: { label: 'Crítico',   color: '#EF4444' },
}

export const BUILDINGS = [
  // EMP-001 · TransAndina Logística (cliente demo)
  {
    id: 'ta-norte', companyId: 'EMP-001',
    name: 'Bodega Norte', short: 'Bodega Norte', comuna: 'Quilicura',
    address: 'Av. Américo Vespucio 1200, Quilicura',
    lat: -33.3520, lng: -70.7290,
    status: 'ok', healthScore: 91, assets: 1, activeAlerts: 0, uptime: 99.6, lastInspection: '18 may 2026',
  },
  {
    id: 'ta-sur', companyId: 'EMP-001',
    name: 'Bodega Sur', short: 'Bodega Sur', comuna: 'San Bernardo',
    address: 'Camino Lo Blanco 2050, San Bernardo',
    lat: -33.5920, lng: -70.6990,
    status: 'critical', healthScore: 58, assets: 2, activeAlerts: 1, uptime: 97.1, lastInspection: '21 may 2026',
  },

  // EMP-005 · Edificio Jardín del Roble
  {
    id: 'jr-lobarnechea', companyId: 'EMP-005',
    name: 'Edificio Jardín del Roble', short: 'Jardín del Roble', comuna: 'Lo Barnechea',
    address: 'Los Robles 12532, Lo Barnechea',
    lat: -33.3530, lng: -70.5180,
    status: 'warning', healthScore: 79, assets: 2, activeAlerts: 1, uptime: 98.4, lastInspection: '15 may 2026',
  },

  // EMP-006 · Inversiones y Servicios Trece SpA
  {
    id: 'it-vitacura', companyId: 'EMP-006',
    name: 'Inversiones Trece — Vitacura', short: 'Inversiones Trece', comuna: 'Vitacura',
    address: 'Alonso de Córdova 4293, Vitacura',
    lat: -33.3980, lng: -70.5880,
    status: 'warning', healthScore: 74, assets: 3, activeAlerts: 1, uptime: 98.0, lastInspection: '13 may 2026',
  },

  // EMP-007 · A&R Freight Services SpA
  {
    id: 'ar-lascondes', companyId: 'EMP-007',
    name: 'A&R Freight — Las Condes', short: 'A&R Freight', comuna: 'Las Condes',
    address: 'Los Militares 5620, Las Condes',
    lat: -33.4160, lng: -70.5980,
    status: 'ok', healthScore: 90, assets: 4, activeAlerts: 0, uptime: 99.5, lastInspection: '19 may 2026',
  },

  // EMP-008 · Edificio Plaza Condell
  {
    id: 'pc-providencia', companyId: 'EMP-008',
    name: 'Edificio Plaza Condell', short: 'Plaza Condell', comuna: 'Providencia',
    address: 'Av. Condell 679, Providencia',
    lat: -33.4350, lng: -70.6250,
    status: 'ok', healthScore: 93, assets: 2, activeAlerts: 0, uptime: 99.7, lastInspection: '22 may 2026',
  },
]
