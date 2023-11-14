import supabase from "../Config/supabaseClient"
import { useEffect, useState } from "react"
import EventListCard from "../EventComponents/EventListCard"
import { Link } from "react-router-dom"
import {GrFormAdd} from 'react-icons/gr'
import {BiLeftArrowAlt, BiRightArrowAlt} from 'react-icons/bi'

export default function FeaturedEvents (){
 const [error, setError] = useState(null)
 const [events, setEvents] = useState(null)
 const [sortedEvents, setSortedEvents] = useState(null)
 const [orderBy, setOrderBy] = useState('event_date')
//  const [firstDayOfWeek, setFirstDayOfWeek] = useState('')

 const d = new Date();
 let month = d.getMonth() + 1;
 let year = d.getFullYear();
 const [currentMonth, setCurrentMonth] = useState(month)
 const [currentYear, setCurrentYear] = useState(year)

 const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


 useEffect(() => {
    const fetchEvents = async () =>{
        const {data, error} = await supabase
        .from('events')
        .select()
        .order(orderBy, {ascending: true})

        if(error){
            setError('could not reach database')
            setEvents(null)
        }
        if(data){
            setEvents(data)
            setError(null)
        }
    }

    fetchEvents()
    console.log(events)
 }, [orderBy, currentMonth, currentYear]);

 useEffect(() => {
    if(events){
        const sortedArr = []
        events.map((event) => {
            var supabaseDate = new Date(event.event_date)
            var todaysDate = new Date();
            var eventDate = new Date( supabaseDate.getTime() + Math.abs(supabaseDate.getTimezoneOffset()*60000) )
            var eventMonth = eventDate.getMonth() + 1;
            var eventYear = eventDate.getFullYear();

    
            if (sortedArr.length < 1 && eventMonth  == currentMonth && eventYear == currentYear && eventDate >= todaysDate){
                sortedArr.push(event)
            }
            
        })
        // console.log(sortedArr)
        setSortedEvents(sortedArr)
    }
 }, [events]);


 return(<>
    <div>
        {error && (<p>{error}</p>)}
        {sortedEvents && (<div className="events grid grid-cols-12 gap-4 px-20 pb-10 pt-4 ">
            {sortedEvents.map((event) => {
                var d = event.event_date;
                var supabaseDate = new Date(event.event_date)
                var eventDate = new Date( supabaseDate.getTime() + Math.abs(supabaseDate.getTimezoneOffset()*60000) )
                var eventMonth = eventDate.getMonth() + 1;
                var eventDay = d.slice(-2)
                var day = eventDate.getDay()
                var dayOfTheWeek = dayNames[day]
                var time = event.event_start_time;
                const convertedTime = new Date('1970-01-01T' + time +  'Z').toLocaleTimeString('en-US', {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'});

                

                    return (
                    <>
                    <div className="mb-6 mt-10 mx-10 col-span-12 ">
                        <div className="text-center">
                            <h1 className="text-[28px] mb-4 font-bold capitalize">{dayOfTheWeek} - {eventMonth} / {eventDay}</h1>
                        </div>
                    </div>
                    <div className="col-span-12 grid grid-flow-col gap-4 auto-cols-auto">
                    {event.matinee != null &&
                    <div>
                        <h2 className="text-center uppercase font-bold border-b-2 mb-2 pb-2 text-[18px] w-[50%] mx-auto">Matinee</h2>
                        <p className="text-center">{event.matinee}</p>
                    </div>
                    }
                    {event.lateShow != null &&
                    <div>
                        <h2 className="text-center uppercase font-bold border-b-2 mb-2 pb-2 text-[18px] w-[50%] mx-auto">Late Show</h2>
                        <p className="text-center">{event.lateShow}</p>
                    </div>
                    }
                    {event.dj != null &&
                    <div>
                        <h2 className="text-center uppercase font-bold border-b-2 mb-2 pb-2 text-[18px] w-[50%] mx-auto">DJ</h2>
                        <p className="text-center">{event.dj}</p>
                    </div>
                    }
                    </div>
                    </>)
            })}
        </div>)}
        <div className="grid grid-cols-12 px-20 pb-10">
            <div className="col-span-4 col-start-5">
                <Link to="/calendar">
                    <div className="hover:bg-slate-400 py-4 px-6 rounded-md bg-slate-300 font-bold text-jet border-2 border-jet shadow-md ease-in-out text-center uppercase">View All Events</div>
                </Link>
            </div>
        </div>
    </div>
    </>)
}