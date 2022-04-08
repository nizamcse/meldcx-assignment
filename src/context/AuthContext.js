import { createContext, useEffect, useState, useMemo } from "react"
import PropTypes from "prop-types"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const value = useMemo(
    () => ({
      isLoggedIn,
      token,
      setIsLoggedIn,
      setToken,
    }),
    [isLoggedIn, token]
  )

  useEffect(() => {
    const authToken = localStorage.getItem("__authToken") || null
    if (authToken) {
      setIsLoggedIn(true)
      setToken(authToken)
    }
  })

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}

export { AuthProvider, AuthContext }
