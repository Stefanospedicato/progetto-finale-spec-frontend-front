import React from 'react'

const Homepage = () => {
  return (
    <>
      <div className='overlay d-flex justify-content-center align-items-center'><h1 className='m-auto'>TROVA L' AUTOMOBILE DEI TUOI SOGNI</h1></div>
      <div className='d-flex justify-content-center video-home align-items-center'>
        <iframe width="100%" zoom="3" height="100%" className="my-5" src="https://www.youtube.com/embed/Jt7DqX2AlNo?autoplay=1&mute=1&loop=1&playlist=Jt7DqX2AlNo&controls=0&showinfo=0&modestbranding=1&rel=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    </>
  )
}

export default Homepage