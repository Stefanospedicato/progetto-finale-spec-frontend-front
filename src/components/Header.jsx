import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <div className='header-list'>
        <Link to='/homepage'>home</Link>
        <Link to='/cars'>cars</Link>
      </div>
    </header>
  )
}

export default Header