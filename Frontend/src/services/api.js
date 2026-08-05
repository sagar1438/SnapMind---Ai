import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000'
})

export const uploadScreenshot = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  return api.post('/screenshots/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const getAllScreenshots = () => api.get('/screenshots')

export const getScreenshotById = (id) => api.get(`/screenshots/${id}`)

export const searchScreenshots = (query) => api.get('/screenshots/search', {
  params: { q: query }
})

export const updateScreenshot = (id, data) => api.patch(`/screenshots/${id}`, null, {
  params: data
})

export const deleteScreenshot = (id) => api.delete(`/screenshots/${id}`)

export default api