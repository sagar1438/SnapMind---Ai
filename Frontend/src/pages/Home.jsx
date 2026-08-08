import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ScreenshotCard from '../components/ScreenshotCard'
import { getAllScreenshots } from '../services/api'

const COLLECTIONS = [
  { name: 'Programming', color: '#6366F1' },
  { name: 'DSA', color: '#10B981' },
  { name: 'Web Development', color: '#4F46E5' },
  { name: 'System Design', color: '#F59E0B' },
  { name: 'College Notes', color: '#6B7280' }
]

function Home() {
  const [screenshots, setScreenshots] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getAllScreenshots()
      .then(res => setScreenshots(res.data.slice(0, 4)))
      .catch(() => setScreenshots([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <div style={{
          width: '190px',
          flexShrink: 0,
          background: '#fff',
          borderRight: '1px solid #E5E7EB',
          padding: '20px 14px',
          minHeight: 'calc(100vh - 61px)'
        }}>
          <SidebarLink label="Home" active />
          <SidebarLink label="All Screenshots" onClick={() => navigate('/gallery')} />
          <SidebarLink label="Favorites" />
          <SidebarLink label="Tags" />
          <SidebarLink label="Trash" />

          <div className="text-secondary" style={{ fontSize: '11px', margin: '16px 0 8px 10px' }}>
            Collections
          </div>
          {COLLECTIONS.map(c => (
            <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 10px', fontSize: '13px', color: '#374151' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: c.color, flexShrink: 0 }} />
              {c.name}
            </div>
          ))}
        </div>

        <div style={{ flex: 1, padding: '24px' }}>
          <div
            className="card"
            style={{
              border: '1.5px dashed #C7D2FE',
              background: '#EEF2FF',
              padding: '40px',
              textAlign: 'center',
              marginBottom: '28px',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/upload')}
          >
            <div style={{ fontSize: '15px', fontWeight: 500, color: '#111827' }}>
              Drag and drop screenshot
            </div>
            <button className="btn-secondary" style={{ marginTop: '12px' }}>
              Choose file
            </button>
          </div>

          <div style={{ fontSize: '15px', fontWeight: 500, marginBottom: '14px' }}>
            Recent Screenshots
          </div>

          {loading ? (
            <div className="text-secondary">Loading...</div>
          ) : screenshots.length === 0 ? (
            <div className="text-secondary">No screenshots yet. Upload your first one above.</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {screenshots.map(s => (
                <ScreenshotCard key={s.id} screenshot={s} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SidebarLink({ label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '7px 10px',
        borderRadius: '8px',
        fontSize: '13px',
        marginBottom: '2px',
        cursor: 'pointer',
        color: active ? '#4F46E5' : '#374151',
        fontWeight: active ? 500 : 400,
        background: active ? '#EEF2FF' : 'transparent'
      }}
    >
      {label}
    </div>
  )
}

export default Home