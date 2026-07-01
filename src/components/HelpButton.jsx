import { MessageCircle } from 'lucide-react'

// Opens a WhatsApp chat with Rob (+56 9 7702 0015) with a prefilled draft.
const WHATSAPP_URL =
  'https://wa.me/56977020015?text=' +
  encodeURIComponent('Hola Rob, necesito ayuda con Monitt.io')

export default function HelpButton() {
  const base = '0 8px 24px rgba(37,211,102,0.35), 0 2px 8px rgba(0,0,0,0.25)'
  const lifted = '0 12px 28px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.25)'

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="¿Necesitas ayuda? Hablar con Rob por WhatsApp"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9990,
        display: 'flex',
        alignItems: 'center',
        gap: '9px',
        background: '#25D366',
        color: '#fff',
        padding: '12px 18px',
        borderRadius: '999px',
        fontSize: '14px',
        fontWeight: 600,
        fontFamily: 'inherit',
        textDecoration: 'none',
        boxShadow: base,
        transition: 'transform 150ms ease, box-shadow 150ms ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = lifted }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = base }}
    >
      <MessageCircle size={18} fill="#fff" stroke="#25D366" strokeWidth={1.8} />
      ¿Necesitas ayuda?
    </a>
  )
}
