import supabase from '../Config/supabaseClient'
export default function Event({event}){

    return(<>
    <img src={event.event_image} alt={event.event_name} />
    <h1>{event.event_name}</h1>
    <p>{event.event_description}</p>
    <p>{event.event_start_time}</p>
    <p>{event.event_cost}</p>
    </>)
}