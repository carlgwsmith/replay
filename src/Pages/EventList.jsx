import supabase from "../Config/supabaseClient"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {CiEdit} from 'react-icons/ci'

export default function EventList (){
 const [error, setError] = useState(null)
 const [events, setEvents] = useState(null)

 useEffect(() => {
    const fetchEvents = async () =>{
        const {data, error} = await supabase
        .from('events')
        .select()

        if(error){
            setError('could not reach database')
            setEvents(null)
            console.log(error)
        }
        if(data){
            setEvents(data)
            setError(null)
        }
    }

    fetchEvents()
 }, []);


    return(<>
    <div>
        {error && (<p>{error}</p>)}
        {events && (<div className="events">
            {events.map(event => (
                <div key={event.id}>
                    <p>{event.event_name} <Link to={'/event/edit/' + event.id }>
                    <span><CiEdit/></span>
                    </Link></p>
                </div>
            ))}
        </div>)}
    </div>
    </>)
}