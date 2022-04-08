import axios from "axios"
import { useState } from "react"

const useLogin = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const login = async (email, password) => {
    setLoading(true)
    try {
      const result = await axios.post("http://35.201.2.209:8000/login", {
        email,
        password,
      })
      setData(result.data)
    } catch (err) {
      const message = err?.response?.data || err?.message
      setError(message || "Unexpected Error!")
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    error,
    loading,
    login,
  }
}
export { useLogin }
