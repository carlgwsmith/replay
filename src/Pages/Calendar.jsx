import supabase from "../Config/supabaseClient"
import { useEffect, useState } from "react"
import {BiLeftArrowAlt, BiRightArrowAlt} from 'react-icons/bi'


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
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


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
        <div className="grid grid-cols-12 my-6 xs:p-4 sm:px-10 md:px-20">
            <div className="col-span-3">
            <button onClick={decrementMonth} className="hover:opacity-70 hover:underline sm:text-[] md:text-[18px]"><BiLeftArrowAlt size="22px" className="inline p-l-1"/>Past Month</button>
            </div>
            <div className="col-span-6 text-center">
                <h1 className="xs:text-[22px] sm:text-[32px] md:text-[42px] mb-4 font-bold">{monthNames[currentMonth -1]} {currentYear}</h1></div>
            <div className="col-span-3 text-right">
            <button className="hover:opacity-70 hover:underline" onClick={incrementMonth}>Next Month <BiRightArrowAlt className="inline" size="22px"/></button>
            </div>
        </div>
        {error && (<p>{error}</p>)}
        {events && (<div className="events grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xs:px-4 sm:px-10 md:px-20 gap-4 pb-20 pt-4">
            {events.map((event) => {
                var d = event.event_date;
                var supabaseDate = new Date(event.event_date)
                var eventDate = new Date( supabaseDate.getTime() + Math.abs(supabaseDate.getTimezoneOffset()*60000) )
                var day = eventDate.getDay()
                var dayOfTheWeek = dayNames[day]
                var eventMonth = eventDate.getMonth() + 1;
                var eventYear = eventDate.getFullYear();
                var eventDay = d.slice(-2)
                var time = event.event_start_time;
                const convertedTime = new Date('1970-01-01T' + time +  'Z').toLocaleTimeString('en-US', {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'});

                if (eventMonth  == currentMonth && eventYear == currentYear){
                    return <div className="h-[280px] bg-[#0F1415]" key={event.id}>
                        <div className="grid grid-cols-12">
                        <div className="bg-[#B2FFDF] text-jet col-span-6 text-center font-bold font-[14px] mx-4 p-2">
                            <p className="text-[12px] font-normal">{dayOfTheWeek}</p>
                            <p>{eventMonth} / {eventDay}</p>
                        </div>
                        </div>
                        <div className="grid grid-cols-6 h-[65%]">
                            <div className="col-span-6 p-4">
                               <p className="text-[12px] font-bold uppercase text-green-200">Matinee: <span className="text-[14px] font-normal text-white normal-case">{event.matinee}</span></p>
                               <p className="text-[12px] font-bold uppercase text-green-200">LATE OUTSIDE: <span className="text-[14px] font-normal text-white normal-case">{event.dj}</span></p>
                               <p className="text-[12px] font-bold uppercase text-green-200">Late Inside: <span className="text-[14px] font-normal text-white normal-case">{event.lateShow}</span></p>
                               <p className="text-[12px] mt-[12px]">Cost: ${event.event_cost}</p>
                            </div>
                        </div>
                        <div className=" text-center">
                            <div>
                                <a href="" className="font-[12px]">View Details</a>
                            </div>
                        </div>
                    </div>
                }
                return null
            })}
        </div>)}
    </div>
    </>)
}