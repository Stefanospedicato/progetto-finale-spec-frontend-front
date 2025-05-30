import { IoCarSportSharp } from "react-icons/io5";
import { TiHome } from "react-icons/ti";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { IoIosStar } from "react-icons/io";
import { GoMirror } from "react-icons/go";
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <div className='header-list container d-flex flex-wrap'>
        <Link to='/' className="d-md-block d-none">home</Link>
        <Link to='/' className="d-sm-block d-md-none"><TiHome className="icons" style={{ color: "blue" }} /></Link>
        <Link to='/cars' className="d-md-block d-none">automobili</Link>
        <Link to='/cars' className="d-sm-block d-md-none "><IoCarSportSharp className="icons" /></Link>
        <Link to='/comparator' className="d-md-block d-none">confronta</Link>
        <Link to='/comparator' className="d-sm-block d-md-none"><GoMirror className="icons" /></Link>
        <Link to='/create' className="d-md-block d-none">aggiungi</Link>
        <Link to='/create' className="d-sm-block d-md-none"><MdOutlineLibraryAdd className="icons" /></Link>
        <Link to='/favorites' className="d-md-block d-none">desideri</Link>
        <Link to='/favorites' className="d-sm-block d-md-none"><IoIosStar className="icons" /></Link>
      </div>
    </header>
  )
}

export default Header

