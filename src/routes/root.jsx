import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../Global Components/footer";
import Header from "../Global Components/header";
import AdminHeader from "../Global Components/adminHeader";
import supabase from "../Config/supabaseClient";
export default function Root(){
    const [loggedIn, setLoggedIn] = useState(null);
        const getUser = async()=>{
        const { data: { user }, error } = await supabase.auth.getUser()
        if(error){
            setLoggedIn(null)
        }
        else{
            setLoggedIn(user)
            console.log(user)
        }

    }
    useEffect(() => {

        getUser()
        supabase.auth.onAuthStateChange((event, session) =>{
            switch(event){
                case 'SIGNED_IN':
                    setLoggedIn(session?.user)
                    break;
                case 'SIGNED_OUT':
                    setLoggedIn(null)
                    break;
                default:
            }
        })
    }, []);
    return(
        <>
        {loggedIn ?  <AdminHeader/> : null }
        <Header/>
        <Outlet/>
        <Footer/>
        </>
    )
}