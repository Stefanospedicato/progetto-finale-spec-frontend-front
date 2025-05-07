import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <div className='header-list container'>
        <Link to='/homepage'>home</Link>
        <Link to='/cars'>automobili</Link>
        <Link to='/comparator'>confronta</Link>
      </div>
    </header>
  )
}

export default Header