import supabase from "../Config/supabaseClient"
import { useEffect, useState } from "react"
import EventListCard from "../EventComponents/EventListCard"

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


 const handleDelete = (id)=>{
    setEvents(prevEvents =>{
        return prevEvents.filter(event=> event.id !== id)
    })
 }


    return(<>
    <div>
        {error && (<p>{error}</p>)}
        {events && (<div className="events">
            {events.map(event => (
                <EventListCard key={event.id} event={event} onDelete={handleDelete}/>
            ))}
        </div>)}
    </div>
    </>)
}