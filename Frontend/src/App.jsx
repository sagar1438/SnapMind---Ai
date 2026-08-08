import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getScreenshotById, updateScreenshot, deleteScreenshot } from '../services/api'

function ScreenshotDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [screenshot, setScreenshot] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [tags, setTags] = useState('')

  useEffect(() => {
    getScreenshotById(id)
      .then(res => {
        setScreenshot(res.data)
        setTitle(res.data.title)
        setSummary(res.data.summary)
        setTags(res.data.tags)
      })
      .catch(() => setScreenshot(null))
      .finally(() => setLoading(false))
  }, [id])

  const handleSave = async () => {
    const res = await updateScreenshot(id, { title, summary, tags })
    setScreenshot(res.data)
    setEditing(false)
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this screenshot?')) return
    await deleteScreenshot(id)
    navigate('/gallery')
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: '24px' }} className="text-secondary">Loading...</div>
      </div>
    )
  }

  if (!screenshot) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: '24px' }} className="text-secondary">Screenshot not found.</div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '720px', margin: '32px auto', padding: '0 20px' }}>
        <img
          src={`http://localhost:8000/${screenshot.image_path}`}
          alt={screenshot.title}
          style={{ width: '100%', borderRadius: '12px', border: '1px solid #E5E7EB' }}
        />

        <div style={{ marginTop: '20px' }}>
          {editing ? (
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ fontSize: '18px', fontWeight: 500, width: '100%', padding: '6px', border: '1px solid #E5E7EB', borderRadius: '8px' }}
            />
          ) : (
            <div style={{ fontSize: '18px', fontWeight: 500 }}>{screenshot.title}</div>
          )}

          <div className="text-secondary" style={{ fontSize: '12px', marginTop: '6px' }}>
            Uploaded {new Date(screenshot.upload_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>

          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 500, color: '#6B7280' }}>Tags</div>
            {editing ? (
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="comma, separated, tags"
                style={{ width: '100%', padding: '6px', marginTop: '4px', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '13px' }}
              />
            ) : (
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '6px' }}>
                {tags.split(',').map(t => t.trim()).filter(Boolean).map((t, i) => (
                  <span key={i} className="tag tag-indigo">{t}</span>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 500, color: '#6B7280' }}>AI Summary</div>
            {editing ? (
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={3}
                style={{ width: '100%', padding: '8px', marginTop: '4px', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '13px', fontFamily: 'inherit' }}
              />
            ) : (
              <div style={{ fontSize: '13px', marginTop: '4px', lineHeight: 1.6 }}>{screenshot.summary}</div>
            )}
          </div>

          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 500, color: '#6B7280' }}>Extracted Text</div>
            <div className="card" style={{ padding: '12px', marginTop: '4px', fontSize: '12px', whiteSpace: 'pre-wrap', maxHeight: '200px', overflowY: 'auto' }}>
              {screenshot.extracted_text || 'No text detected.'}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
            {editing ? (
              <button className="btn-primary" onClick={handleSave}>Save</button>
            ) : (
              <button className="btn-secondary" onClick={() => setEditing(true)}>Edit</button>
            )}
            <a
              className="btn-secondary"
              href={`http://localhost:8000/${screenshot.image_path}`}
              download
              style={{ display: 'inline-block' }}
            >
              Download
            </a>
            <button className="btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScreenshotDetails