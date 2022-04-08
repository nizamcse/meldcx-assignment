import axios from "axios"
import { useState } from "react"

const useLogin = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const login = async (email, password, repoUrl, message) => {
    setLoading(true)
    try {
      const result = await axios.post("http://35.201.2.209:8000/login", {
        email,
        password,
        repoUrl,
        message,
      })
      setData(result.data)
    } catch (err) {
      const msg = err?.response?.data || err?.message
      setError(msg || "Unexpected Error!")
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
