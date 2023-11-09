import { useState, useEffect } from "react"
import supabase from "../Config/supabaseClient"
import { NavLink } from "react-router-dom";
import {BiLogOut} from 'react-icons/bi'

export default function AdminHeader(){
    const logOut = async()=>{
        
        const { error } = await supabase.auth.signOut()
            }
    
const linkStyle= 'm-4 text-[14px] hover:text-shadow-pop-bl hover:border-snow text-snow border-[#2c2f30] border-b-[3px] duration-300'
        return(<>
        <div className="flex justify-between items-center w-full bg-[#2c2f30] border-b-1 py-8 px-10 border-jet h-12 text-snow">
                <ul className=" md:flex text-[16px] ease-in-out duration-500">
                    <li className={linkStyle}> 
                        <NavLink to={`/eventlist`}>
                            Admin Dashboard
                        </NavLink>
                    </li>
                    <li className={linkStyle}>
                    <NavLink onClick={logOut}><BiLogOut className="inline" size="22px"/> Log Out</NavLink>
                    </li>
                </ul>
        </div>
        </>)
}