import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { uploadScreenshot } from '../services/api'

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']

function Upload() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const handleFile = (selected) => {
    if (!selected) return
    if (!ALLOWED_TYPES.includes(selected.type)) {
      setError('Please upload a PNG, JPG, or WEBP image.')
      return
    }
    setError('')
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    handleFile(e.dataTransfer.files[0])
  }

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const res = await uploadScreenshot(file)
      navigate(`/screenshot/${res.data.id}`)
    } catch (err) {
      setError('Upload failed. Please try again.')
      setUploading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '560px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ fontSize: '18px', fontWeight: 500, marginBottom: '18px' }}>
          Upload a screenshot
        </div>

        <div
          className="card"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef.current.click()}
          style={{
            border: '1.5px dashed #C7D2FE',
            background: '#EEF2FF',
            padding: '40px',
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          {preview ? (
            <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '220px', borderRadius: '8px' }} />
          ) : (
            <>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#111827' }}>
                Drag and drop screenshot
              </div>
              <div className="text-secondary" style={{ fontSize: '13px', marginTop: '4px' }}>
                or click to choose a file
              </div>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            style={{ display: 'none' }}
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>

        {error && (
          <div style={{ color: '#DC2626', fontSize: '13px', marginTop: '10px' }}>
            {error}
          </div>
        )}

        <button
          className="btn-primary"
          style={{ marginTop: '18px', width: '100%', padding: '10px', opacity: file && !uploading ? 1 : 0.6 }}
          disabled={!file || uploading}
          onClick={handleUpload}
        >
          {uploading ? 'Processing (OCR + AI)...' : 'Upload'}
        </button>
      </div>
    </div>
  )
}

export default Upload