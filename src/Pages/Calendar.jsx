import supabase from "../Config/supabaseClient"
import { useEffect, useState } from "react"
export default function Calendar (){
 const [error, setError] = useState(null)
 const [events, setEvents] = useState(null)
 const [orderBy, setOrderBy] = useState('event_date')

 const d = new Date();
 let month = d.getMonth() + 1;
 let year = d.getFullYear();
 const [currentMonth, setCurrentMonth] = useState(month)
 const [currentYear, setCurrentYear] = useState(year)

 const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const incrementMonth = ()=>{
    if(currentMonth == 12){
        setCurrentMonth(1)
        setCurrentYear(currentYear + 1)
    }
    else{
        setCurrentMonth(currentMonth + 1)
    }
 }
 const decrementMonth = ()=>{
    if(currentMonth == 1){
        setCurrentMonth(12)
        setCurrentYear(currentYear - 1)
    }
    else{
        setCurrentMonth(currentMonth - 1)
    }
 }

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
    
 }, [orderBy, currentMonth, currentYear]);

    return(<>
    <div>
        <div className="grid grid-cols-12 my-6 mx-10">
            <div className="col-span-4">
            <button onClick={decrementMonth}>Previous Month</button>
            </div>
            <div className="col-span-4 text-center">
                <h1 className="text-[32px]">{monthNames[currentMonth -1]} {currentYear}</h1></div>
            <div className="col-span-4 text-right">
            <button onClick={incrementMonth}>Next Month</button>
            </div>
        </div>
        {error && (<p>{error}</p>)}
        {events && (<div className="events grid grid-cols-7 gap-4 px-20 py-20">
            {/* {events.map(event => (
            <p key={event.id}>{event.event_name} {event.event_date}</p>
            ))} */}
            {events.map((event) => {
                var supabaseDate = new Date(event.event_date)
                var eventDate = new Date( supabaseDate.getTime() + Math.abs(supabaseDate.getTimezoneOffset()*60000) )
                var eventMonth = eventDate.getMonth() + 1;
                var eventYear = eventDate.getFullYear();
                console.log(eventYear)
                if (eventMonth  == currentMonth && eventYear == currentYear){
                    return <div className="h-[200px] rounded border-2 border-white" key={event.id}>{event.event_name} {event.event_date}</div>
                }
                return null
            })}
        </div>)}
    </div>
    </>)
}