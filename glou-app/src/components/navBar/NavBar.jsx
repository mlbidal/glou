import React from 'react'
import s from './NavBar.module.css'

const NavBar = () => {
  return (
      <div className={s.navBar}>
    <div className="border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-lg md:pb-4">

  <div className="flex items-center justify-between mb-4 md:mb-0">
    <h1 className="leading-none text-2xl text-grey-darkest">
      <a className="no-underline text-grey-darkest hover:text-black text-3xl" href="#">
        Glou
      </a>
    </h1>

    <a className="text-black hover:text-orange md:hidden" href="#">
      <i className="fa fa-2x fa-bars"></i>
    </a>
  </div>

  <nav>
    <ul className="list-reset md:flex md:items-center">
      <li className="md:ml-4">
        <a className="block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0 text-xl" href="#">
          Iniciar sesión
        </a>
      </li>
      <li className="md:ml-4">
        <a className="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0 text-xl" href="#">
          Contacto
        </a>
      </li>
    </ul>
  </nav>
    </div>
    </div>
  )
}

export default NavBar