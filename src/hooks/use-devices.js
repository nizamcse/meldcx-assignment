import axios from "axios"
import { useState, useEffect } from "react"

const useDevices = () => {
  const [devices, setDevices] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const pullDevices = async () => {
    setLoading(true)
    try {
      const result = await axios.get("http://35.201.2.209:8000/devices")
      setDevices(result.data?.devices || [])
    } catch (err) {
      setError(err.message || "Unexpected Error!")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      pullDevices()
    }, 5000)

    return () => clearInterval(interval)
  })

  return {
    devices,
    error,
    loading,
  }
}
export { useDevices }
