/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react"
import { Box, Button, CircularProgress } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useDevices } from "../hooks/use-devices"
import { useNotify } from "../hooks/use-notify"
import Device from "../components/Device"
import { AuthContext } from "../context/AuthContext"

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: "#F57C00",
    width: "100vw",
    height: "100vh",
    position: "relative",
    alignItems: "center",
  },
  container: (props) => ({
    position: "relative",
    width: props.width,
    height: props.height,
    borderRadius: "50%",
    margin: "0 auto",
  }),
  countDevice: {
    position: "absolute",
    top: "50%",
    left: "50%",
    trasnform: "translateX(-50px)",
    width: "100px",
    color: "#FFFFFF",
  },
  number: {
    fontSize: "48px",
    fontWeight: 300,
    margin: 0,
    lineHeight: 1.2,
    textAlign: "center",
  },
  para: {
    fontSize: "12px",
    fontWeight: 500,
    margin: 0,
    textAlign: "center",
  },
  box: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    display: "flex",
    backgroundColor: "#E65100",
    padding: 16,
    zIndex: 1,
  },
  btnNotify: {
    backgroundColor: "#ffffff",
    marginRight: 16,
  },
})

const Home = () => {
  const { setIsLoggedIn, setToken, token } = useContext(AuthContext)
  const { loading, error, devices } = useDevices()
  const { loading: notifyLoading, error: notifyError, notifyComplete } = useNotify()
  const [width, setWidth] = useState(28)

  const [deviceWidth, setDeviceWidth] = useState(null)
  const [totalDevice, setSotalDevice] = useState(devices.length)
  const [translate, setTranslate] = useState(null)
  const [calculated, setCalculated] = useState(null)

  const classes = useStyles({
    width: `${width}rem`,
    height: `${width}rem`,
  })

  useEffect(() => {
    if (devices.length > 0) {
      const total = devices.length
      setSotalDevice(total)
      const tan = Math.tan(Math.PI / total)
      const circleRadius = 28 / 2 // Unit rem
      const dw = circleRadius * tan // Unit rem
      const containerWidth = 28 // Unit rem
      setWidth(containerWidth)
      setDeviceWidth(dw)
      setTranslate(circleRadius)
      setCalculated(true)
    }
  }, [devices])

  const onClickLogout = (e) => {
    localStorage.removeItem("__authToken")
    setIsLoggedIn(false)
    setToken(null)
  }

  const onClickNotify = () => {
    notifyComplete(token)
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.countDevice}>
          <p className={classes.number}>{devices.length}</p>
          <p className={classes.para}>DEVICES</p>
          <p className={classes.para}>ONLINE</p>
        </div>
        {calculated &&
          devices.map((device, index) => (
            <Device
              key={device.id.toString()}
              deviceComponentSize={deviceWidth}
              index={index}
              totalDevice={totalDevice}
              translate={translate}
            />
          ))}
      </div>
      <Box justifyContent="center" component="span" className={classes.box}>
        <Button
          className={classes.btnNotify}
          onClick={onClickNotify}
          variant="contained"
        >
          Notify
          {notifyLoading && <CircularProgress size={24} />}
        </Button>
        <Button variant="contained" onClick={onClickLogout}>
          Logout
        </Button>
      </Box>
    </div>
  )
}

export default Home
