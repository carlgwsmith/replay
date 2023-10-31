import supabase from "../Config/supabaseClient"
import { useEffect, useState } from "react"
export default function Calendar (){
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
                <p key={event.id}>{event.event_name}</p>
            ))}
        </div>)}
    </div>
    </>)
}