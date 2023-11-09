import {HiMenu} from 'react-icons/hi'
import {MdClose} from 'react-icons/md'
import { NavLink, useLocation, Link } from "react-router-dom";
import {useState, useEffect} from 'react'

function Header(){

const [navbarOpen, setNavbarOpen] = useState(false);
const [logoEffect, setLogoEffect] = useState(' text-[24px] font-bold tracking-tighter text-snow');
    
const handleNav = ()=>{
    setNavbarOpen(!navbarOpen)
}

const location = useLocation()
useEffect(() => {
    setNavbarOpen(false);
    setLogoEffect(' font-bold tracking-in-expand text-[24px] tracking-tighter text-snow')
}, [location]);


const linkStyle= 'm-4 text-[14px] hover:text-shadow-pop-bl hover:border-snow text-snow border-[#0F1415] border-b-[3px] duration-300'

    return(
        <div className="flex justify-between items-center w-full bg-[#0F1415] border-b-1 py-8 px-10 border-jet h-12 text-snow">
                <div className="fade-in"><Link to={'/'}><img src="/logo.png" style={{'width':'200px'}}/></Link></div>
                <ul className="hidden md:flex text-[16px] ease-in-out duration-500">
                    <li className={linkStyle}> 
                        <NavLink to={`/`}>
                            Home
                        </NavLink>
                    </li>
                    <li className={linkStyle}> 
                        <NavLink to={`/about`}>
                            About
                        </NavLink>
                    </li>
                    <li className={linkStyle}> 
                        <NavLink to={`/calendar`}>
                            Calendar
                        </NavLink>
                    </li>
                    <li className={linkStyle}> 
                        <NavLink to={`/contact`}>
                            Contact
                        </NavLink>
                    </li>
                    {/* <li className={linkStyle}> 
                        <NavLink to={`/`}>
                            Store
                        </NavLink>
                    </li> */}
                </ul>
                <div onClick={handleNav} className='block md:hidden'>
                    <HiMenu size={20} navbarOpen={true}/>
                </div>
                <div className={navbarOpen ? 'fixed left-0 top-0 w-[100%] border-right border-r-gray-900 h-full bg-[#0F1415] ease-in-out duration-500 z-[99999]' : 'z-[99999] bg-light fixed left-[-100%] ease-in-out duration-500'}>
                    <div className="grid grid-cols-6">
                    <div className="col-span-3 text-xl font-bold tracking-tighter m-4 w-[75%] inline-block">
                    <img src="logo.png" style={{'width':'200px'}}/>
                    </div>
                    <div className="col-span-3 p-4 inline-block">
                <MdClose size={20} navbarOpen={false} onClick={handleNav} className="float-right"/>
                </div>
                    </div>
                    <ul className="uppercase">
                        <li className="p-4">
                        <NavLink to={`/home`}>Home</NavLink>
                        </li>
                        <li className="p-4">
                        <NavLink to={`/about`}>About</NavLink>
                        </li>
                        <li className="p-4">
                        <NavLink to={`/calendar`}>Calendar</NavLink>
                        </li>
                        <li className="p-4">
                        <NavLink to={`/contact`}>Contact</NavLink>
                        </li>
                        {/* <li className="p-4">
                        <NavLink to={`/home`}>Store</NavLink>
                        </li> */}
                </ul>
                </div>
        </div>
    )
}
export default Header