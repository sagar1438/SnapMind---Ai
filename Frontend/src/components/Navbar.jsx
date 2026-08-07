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

