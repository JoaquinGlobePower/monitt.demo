// Crea (o reporta si ya existen) las 2 cuentas de prueba en Clerk, con su perfil
// y metadata ya puestos, para poder alternar Cliente / Superadmin iniciando sesión.
//
// Uso:
//   1. En .env.local agrega:  CLERK_SECRET_KEY=sk_test_...   (Clerk → API Keys → Secret key)
//   2. Corre:                 npm run seed:users
//
// La Secret key NO la usa la app (es solo para este script, server-side) y .env.local
// está en .gitignore, así que nunca se sube ni se expone en el frontend.

import { readFileSync } from 'node:fs'

// Carga CLERK_SECRET_KEY desde .env.local si no viene ya en el entorno.
if (!process.env.CLERK_SECRET_KEY) {
  try {
    const env = readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    for (const line of env.split(/\r?\n/)) {
      const m = line.match(/^\s*CLERK_SECRET_KEY\s*=\s*(.+?)\s*$/)
      if (m) process.env.CLERK_SECRET_KEY = m[1].replace(/^["']|["']$/g, '')
    }
  } catch { /* sin .env.local: se valida abajo */ }
}

const SECRET = process.env.CLERK_SECRET_KEY
if (!SECRET || !SECRET.startsWith('sk_')) {
  console.error('\n❌ Falta CLERK_SECRET_KEY en .env.local.')
  console.error('   Consíguela en Clerk → API Keys → "Secret keys" (empieza con sk_test_) y agrégala a .env.local.\n')
  process.exit(1)
}

const USERS = [
  {
    email_address: ['cliente.demo@monitt.io'],
    password: 'MonittCliente2026',
    first_name: 'Rob',
    last_name: 'Fuentes',
    public_metadata: { companyId: 'EMP-001' }, // → perfil CLIENTE (TransAndina)
    skip_password_checks: true,
  },
  {
    email_address: ['admin.demo@monitt.io'],
    password: 'MonittAdmin2026',
    first_name: 'Equipo',
    last_name: 'Monitt',
    public_metadata: { role: 'admin' }, // → perfil SUPERADMIN
    skip_password_checks: true,
  },
]

console.log('\nCreando cuentas de prueba en Clerk…\n')

for (const body of USERS) {
  const email = body.email_address[0]
  try {
    const res = await fetch('https://api.clerk.com/v1/users', {
      method: 'POST',
      headers: { Authorization: `Bearer ${SECRET}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok) {
      console.log(`✓ Creada: ${email}  →  ${JSON.stringify(body.public_metadata)}`)
    } else {
      const err = data?.errors?.[0]
      const msg = err?.long_message || err?.message || res.statusText
      const taken = /taken|already|exists/i.test(msg)
      console.log(`${taken ? '•' : '✗'} ${email}: ${taken ? 'ya existe (ok)' : msg}`)
    }
  } catch (e) {
    console.error(`✗ ${email}: ${e.message}`)
  }
}

console.log('\nListo. Credenciales:')
console.log('  CLIENTE     → cliente.demo@monitt.io  /  MonittCliente2026')
console.log('  SUPERADMIN  → admin.demo@monitt.io    /  MonittAdmin2026\n')
