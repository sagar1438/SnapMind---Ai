import { useNavigate } from 'react-router-dom'

const TAG_COLORS = {
  dsa: 'tag-indigo',
  error: 'tag-amber',
  webdev: 'tag-emerald',
  default: 'tag-gray'
}

function getTagClass(tag) {
  const key = tag.trim().toLowerCase().replace(/\s+/g, '')
  return TAG_COLORS[key] || TAG_COLORS.default
}

function ScreenshotCard({ screenshot }) {
  const navigate = useNavigate()
  const tags = screenshot.tags ? screenshot.tags.split(',').map(t => t.trim()).filter(Boolean) : []
  const date = new Date(screenshot.upload_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })

  return (
    <div
      className="card"
      style={{ overflow: 'hidden', cursor: 'pointer' }}
      onClick={() => navigate(`/screenshot/${screenshot.id}`)}
    >
      <img
        src={`http://localhost:8000/${screenshot.image_path}`}
        alt={screenshot.title}
        style={{ width: '100%', height: '140px', objectFit: 'cover', background: '#F1F2F6' }}
      />
      <div style={{ padding: '12px' }}>
        <div style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>
          {screenshot.title}
        </div>
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '6px' }}>
          {tags.map((tag, i) => (
            <span key={i} className={`tag ${getTagClass(tag)}`}>{tag}</span>
          ))}
        </div>
        <div className="text-secondary" style={{ fontSize: '11px', marginTop: '8px' }}>
          {date}
        </div>
      </div>
    </div>
  )
}

export default ScreenshotCard