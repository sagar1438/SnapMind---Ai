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

