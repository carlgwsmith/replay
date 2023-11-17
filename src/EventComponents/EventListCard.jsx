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
    <div className="my-2 mx-4">
        <div className="grid grid-cols-12 p-2 border-2  rounded-sm">
            <div className="col-span-4"><p>{event.matinee}</p></div>
            <div className="col-span-4"><p>{event.event_date}</p></div>
            <div className="col-span-4 text-right">
                    <p className="inline-block px-4">
                        <Link to={'/event/edit/' + event.id }>
                            <span><CiEdit size="22px"/></span>
                        </Link>
                    </p>
                    <p className="inline-block px-4">
                    <Link onClick={handleDelete}>
                        <CiTrash size="22px" />
                    </Link>
                    </p>
            </div>
        </div>
    </div>
    </>)
}