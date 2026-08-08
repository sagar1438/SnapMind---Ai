import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ScreenshotCard from '../components/ScreenshotCard'
import { getAllScreenshots, searchScreenshots } from '../services/api'

const COLLECTIONS = [
  { name: 'Programming', color: '#6366F1' },
  { name: 'DSA', color: '#10B981' },
  { name: 'Web Development', color: '#4F46E5' },
  { name: 'System Design', color: '#F59E0B' },
  { name: 'College Notes', color: '#6B7280' }
]

function Gallery() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [screenshots, setScreenshots] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const request = query ? searchScreenshots(query) : getAllScreenshots()
    request
      .then(res => setScreenshots(res.data))
      .catch(() => setScreenshots([]))
      .finally(() => setLoading(false))
  }, [query])

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
          <div style={{ padding: '7px 10px', borderRadius: '8px', fontSize: '13px', color: '#4F46E5', fontWeight: 500, background: '#EEF2FF', marginBottom: '2px' }}>
            All Screenshots
          </div>
          <div style={{ padding: '7px 10px', fontSize: '13px', color: '#374151' }}>Favorites</div>
          <div style={{ padding: '7px 10px', fontSize: '13px', color: '#374151' }}>Tags</div>
          <div style={{ padding: '7px 10px', fontSize: '13px', color: '#374151', marginBottom: '10px' }}>Trash</div>

          <div className="text-secondary" style={{ fontSize: '11px', margin: '10px 0 8px 10px' }}>
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
          <div style={{ fontSize: '15px', fontWeight: 500, marginBottom: '14px' }}>
            {query ? `Results for "${query}"` : 'All Screenshots'}
          </div>

          {loading ? (
            <div className="text-secondary">Loading...</div>
          ) : screenshots.length === 0 ? (
            <div className="text-secondary">
              {query ? 'No matching screenshots found.' : 'No screenshots yet. Upload your first one to get started.'}
            </div>
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

export default Gallery