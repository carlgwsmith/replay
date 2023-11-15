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
    <div className="featuredEvents bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
        {error && (<p>{error}</p>)}
        {sortedEvents && (<div className="xs:px-4 md:px-20 pb-10 pt-4">
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
                <div key={event.id}>
                    <div className="grid grid-cols-6">
                        <div className="mb-6 mt-10 sm:mx-4 md:mx-10 col-span-6">
                            <div className="text-center">
                                <h1 className="text-[28px] mb-4 font-bold uppercase text-[#caaff7]">{dayOfTheWeek} - {eventMonth} / {eventDay}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-flow-col auto-cols-auto xs:gap-x-2 md:gap-x-10">
                    {event.matinee != null &&
                    <div className="md:col-auto xs:col-span-full mb-4 rounded-md p-2">
                        <h2 className="text-center uppercase font-bold text-[18px] w-[100%] mx-auto">Matinee</h2>
                        <div className="p-4 ">
                            <p className="text-center">{event.matinee}</p>
                        </div>
                    </div>
                    }
                    {event.lateShow != null &&
                    <div className="md:col-auto xs:col-span-full mb-4 rounded-md p-2">
                        <h2 className="text-center uppercase font-bold text-[18px] w-[100%] mx-auto">Late Show Inside</h2>
                        <div className="p-4 ">
                        <p className="text-center">{event.lateShow}</p>
                        </div>
                    </div>
                    }
                    {event.dj != null &&
                    <div className="md:col-auto xs:col-span-full mb-4 rounded-md p-2">
                        <h2 className="text-center uppercase font-bold text-[18px] w-[100%] mx-auto">Late Show OUTSIDE</h2>
                        <div className="p-4">
                        <p className="text-center">{event.dj}</p>
                        </div>
                    </div>
                    }
                    </div>
                </div>)
            })}
        </div>)}
        <div className="grid grid-cols-12 px-20 pb-10">
            <div className="xs:col-span-6 md:col-span-4 xs:col-start-4 md:col-start-5">
                <Link to="/calendar">
                    <div className="hover:bg-slate-400 py-4 px-6 rounded-md bg-slate-300 font-bold text-jet border-2 border-jet shadow-md ease-in-out text-center uppercase">View All Events</div>
                </Link>
            </div>
        </div>
    </div>
    </>)
}