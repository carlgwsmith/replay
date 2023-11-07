import supabase from "../Config/supabaseClient"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {CiEdit, CiTrash} from 'react-icons/ci'

export default function EventListCard ({ event, onDelete }){


 const handlePopup = ()=>{

 }

 const handleDelete = async ()=>{
    const {data, error} = await supabase
    .from('events')
    .delete()
    .eq('id', event.id)
    .select()

    if(error){
        console.log(error)
    }
    if(data){
        onDelete(event.id)
    }
 }


    return(<>
    <div className="m-4">
        <div className="grid grid-cols-8 p-4 border-2 mb-2 rounded-sm">
            <div className="col-span-4"><p>{event.event_name}</p></div>
            <div className="col-start-7 col-span-1 text-right">
                <Link onClick={handleDelete}>
                <CiTrash size="22px" />
                </Link>
            </div>
            <div className="col-span-1 text-right">
            <Link to={'/event/edit/' + event.id }>
            <span><CiEdit size="22px"/></span>
            </Link>
            </div>
        </div>
    </div>
    </>)
}