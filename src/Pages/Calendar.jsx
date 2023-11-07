import supabase from "../Config/supabaseClient"
import { useEffect, useState } from "react"
export default function Calendar (){
 const [error, setError] = useState(null)
 const [events, setEvents] = useState(null)
 const [orderBy, setOrderBy] = useState('event_date')

 const d = new Date();
 let month = d.getMonth() + 1;
 const [currentMonth, setCurrentMonth] = useState(month)


 useEffect(() => {
    const fetchEvents = async () =>{
        const {data, error} = await supabase
        .from('events')
        .select()
        .order(orderBy, {ascending: true})

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
 }, [orderBy]);


    return(<>
    <div>
        {error && (<p>{error}</p>)}
        {events && (<div className="events">
            {events.map(event => (
            <p key={event.id}>{event.event_name} {event.event_date}</p>

            ))}
        </div>)}
    </div>
    </>)
}