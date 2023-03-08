import { Typography } from '@mui/material'
import React from 'react'
import './slide.scss'

function Slide({ image, title, subtitle }) {
  return (
    <div style={{
      backgroundImage: `url(${image})`
    }} className='slide'>
      <div className='slideTextContainer'>
        <Typography variant="h2" className='slideTitle'>{title}</Typography>
        <Typography variant="h6" className='slideSubtitle' >{subtitle}
        </Typography>
      </div>
    </div>
  )
}

export default Slide