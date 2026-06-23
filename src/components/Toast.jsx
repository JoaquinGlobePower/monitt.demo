export default function Toast({ message }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: '14px',
      color: 'var(--text-primary)',
      zIndex: 9999,
      maxWidth: '320px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      animation: 'fadeIn 200ms ease-out',
    }}>
      {message}
    </div>
  )
}
