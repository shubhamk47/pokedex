import React from 'react'
import pokeball from '../assets/images/Poké_Ball_icon.svg';

const Navbar = () => {
  return (
    <div className="App bg-gray-800">
        <div className="h-16 flex items-center justify-center">
            <img src={pokeball} className="object-cover relative rounded-full max-w-max   h-full" alt='logo'/>
            <h1 className="text-5xl font-bold text-white">Pokédex</h1>
        </div>
    </div>
  )
}

export default Navbar