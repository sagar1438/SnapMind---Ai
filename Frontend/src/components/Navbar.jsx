import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Navbar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/gallery?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 24px',
      background: '#fff',
      borderBottom: '1px solid #E5E7EB'
    }}>
      <Link to="/" style={{ fontWeight: 500, fontSize: '16px', color: '#111827' }}>
        SnapMind AI
      </Link>

      <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: '360px', margin: '0 24px' }}>
        <input
          type="text"
          placeholder="Search screenshots..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            height: '36px',
            padding: '0 12px',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            fontSize: '13px',
            background: '#F8F9FC',
            color: '#111827'
          }}
        />
      </form>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button className="btn-primary" onClick={() => navigate('/upload')}>
          Upload
        </button>
        <div style={{
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          background: '#6366F1',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 500
        }}>
          S
        </div>
      </div>
    </div>
  )
}

export default Navbar