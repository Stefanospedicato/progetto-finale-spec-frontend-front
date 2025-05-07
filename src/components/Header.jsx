import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <div className='header-list container'>
        <Link to='/homepage'>home</Link>
        <Link to='/cars'>cars</Link>
        <Link to='/comparator'>comparatore</Link>
      </div>
    </header>
  )
}

export default Header