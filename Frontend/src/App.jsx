import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Gallery from './pages/Gallery'
import ScreenshotDetails from './pages/ScreenshotDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/screenshot/:id" element={<ScreenshotDetails />} />
    </Routes>
  )
}

export default App