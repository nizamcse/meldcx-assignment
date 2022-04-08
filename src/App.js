import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { green, orange } from "@mui/material/colors"
import { PrivateRoute } from "./routes/private-route"
import { AuthProvider } from "./context/AuthContext"
import Home from "./pages/Home"
import Login from "./pages/login"

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
      main: green[500],
    },
  },
})
const App = () => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  </ThemeProvider>
)
export default App
