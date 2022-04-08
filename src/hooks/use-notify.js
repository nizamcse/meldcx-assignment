import axios from "axios"
import { useState } from "react"

const useNotify = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const notifyComplete = async (token) => {
    setLoading(true)
    try {
      const result = await axios.post(
        "http://35.201.2.209:8000/notify",
        {
          email: "nizamsuet@gmail.com",
          name: "MD NIZAM UDDIN",
          repoUrl: "git@github.com:nizamcse/meldcx-assignment.git",
          message:
            "Hey! I've completed the assignment form 'Senior React Developer' position.",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
    notifyComplete,
  }
}
export { useNotify }
