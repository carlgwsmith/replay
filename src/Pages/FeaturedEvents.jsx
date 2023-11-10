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

    
            if (eventMonth  == currentMonth && eventYear == currentYear && eventDate >= todaysDate){
                sortedArr.push(event)
            }
            
        })
        // console.log(sortedArr)
        setSortedEvents(sortedArr)
    }
 }, [events]);


 return(<>
    <div>
        <div className="grid grid-cols-12 mb-6 mt-10 mx-10">
            <div className="col-span-6 col-start-4 text-center">
                <h1 className="text-[36px] mb-4 font-bold uppercase">Upcoming Events</h1></div>
        </div>
        {error && (<p>{error}</p>)}
        {sortedEvents && (<div className="events grid grid-cols-4 gap-4 px-20 pb-10 pt-4">
            {sortedEvents.map((event) => {
                var d = event.event_date;
                var supabaseDate = new Date(event.event_date)
                var eventDate = new Date( supabaseDate.getTime() + Math.abs(supabaseDate.getTimezoneOffset()*60000) )
                var eventMonth = eventDate.getMonth() + 1;
                var eventDay = d.slice(-2)
                var time = event.event_start_time;
                const convertedTime = new Date('1970-01-01T' + time +  'Z').toLocaleTimeString('en-US', {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'});

                

                    return <div className="h-[200px] bg-[#0F1415]" key={event.id}>
                        <div className="grid grid-cols-12">
                        <div className="bg-[#B2FFDF] text-jet col-span-6 text-center font-bold font-[18px] mx-4 p-4">
                            {eventMonth} / {eventDay}
                        </div>
                        </div>
                        <div className="grid grid-cols-6">
                            <div className="col-span-6 p-4">
                               <p className="text-[16px] font-bold uppercase">{event.event_name}</p>
                               <p className="text-[12px]">{convertedTime} / ${event.event_cost}</p>
                            </div>
                        </div>
                    </div>
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