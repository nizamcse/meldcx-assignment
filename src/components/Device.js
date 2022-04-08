import React, { useEffect, useState } from "react"
import { makeStyles } from "@mui/styles"
import PropTypes from "prop-types"

const useStyles = makeStyles({
  deviceDivStyle: (props) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    // margin: props.margin,
    width: props.width,
    maxWidth: "4rem",
    maxHeight: "4rem",
    height: props.height,
    transform: props.transform,
    backgroundColor: "#FFFFFF",
    borderRadius: "50%",
  }),
})

const Device = (props) => {
  const { index, deviceComponentSize, totalDevice, translate } = props
  const [transform, setTransform] = useState(null)
  const classes = useStyles({
    transform,
    width: `${deviceComponentSize}rem`,
    height: `${deviceComponentSize}rem`,
    margin: `${0.5 * deviceComponentSize}rem`,
  })
  useEffect(() => {
    const az = (index * 360) / totalDevice
    const trnlt = `rotate(${az}deg) translate(${translate - 2}rem) rotate(${
      -1 * az
    }deg)`
    setTransform(trnlt)
    console.log({ index, deviceComponentSize, totalDevice, translate }, trnlt)
  }, [index, totalDevice, translate, deviceComponentSize])

  return <div className={classes.deviceDivStyle} />
}

Device.propTypes = {
  index: PropTypes.number.isRequired,
  deviceComponentSize: PropTypes.number.isRequired,
  totalDevice: PropTypes.number.isRequired,
  translate: PropTypes.number.isRequired,
}

export default Device
