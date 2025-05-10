import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <div>
        <div className='d-flex justify-content-center video-home align-items-center'>
          <video width={"100%"} height={"100vh"} className="my-5" autoPlay loop muted style={{ objectFit: 'cover' }}>
            <source src="/videoplayback.mp4" type="video/mp4" />
            Il tuo browser non supporta il tag video.
          </video>
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default DefaultLayout