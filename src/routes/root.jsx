import { Outlet } from "react-router-dom";
import Footer from "../Global Components/footer";
import Header from "../Global Components/header";

export default function Root(){
    return(
        <>
        <Header/>
        <Outlet/>
        <Footer/>
        </>
    )
}