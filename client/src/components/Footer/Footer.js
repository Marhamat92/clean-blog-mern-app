import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import './footer.scss'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <div className='footer'>
      <div className='footerIconGroup'>
        <a href='https://twitter.com/' target='_blank' >
          <TwitterIcon className='footerIcon' />
        </a>
        <a href='https://tr-tr.facebook.com/' target='_blank'>
          <FacebookIcon className='footerIcon' />
        </a>
        <a href='https://github.com/' target='_blank'>
          <GitHubIcon className='footerIcon' />
        </a>
      </div>
      <div className='copyright'>
        <p className='copyrightText' >Copyright © Your Website {year}</p>
      </div>
    </div>
  )
}

export default Footer