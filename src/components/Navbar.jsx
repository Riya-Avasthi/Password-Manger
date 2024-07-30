import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
        <div className="mycontainer flex justify-between px-4 py-5 items-center h-12">

        <div className="logo font-bold text-white text-2xl">
            
            <span className="text-fuchsia-500">&lt;</span>
            Pass
            <span className="text-fuchsia-500">Man/&gt;</span>
            </div>
        {/* <ul>
            <li className='flex gap-4'>
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="#">About</a>
            </li>
        </ul> */}
        </div>
    </nav>
  )
}

export default Navbar
