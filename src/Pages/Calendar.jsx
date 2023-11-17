import supabase from "../Config/supabaseClient"
import { useEffect, useState } from "react"
import {BiLeftArrowAlt, BiRightArrowAlt} from 'react-icons/bi'
import { Link } from "react-router-dom"


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
const dayNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']


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
            <button onClick={decrementMonth} className="hover:opacity-70 hover:underline"><BiLeftArrowAlt size="22px" className="inline p-l-1"/> <span className="text-[12px] iphone:text-[12px] sm:text-[12px] md:text-[18px]">Past Month</span></button>
            </div>
            <div className="col-span-6 text-center">
                <h1 className="xs:text-[22px] sm:text-[32px] md:text-[42px] mb-4 font-bold">{monthNames[currentMonth -1]} {currentYear}</h1></div>
            <div className="col-span-3 text-right">
            <button className="hover:opacity-70 hover:underline" onClick={incrementMonth}><span className="text-[12px] iphone:text-[12px] sm:text-[12px] md:text-[18px]">Next Month</span><BiRightArrowAlt className="inline" size="22px"/></button>
            </div>
        </div>
        {error && (<p>{error}</p>)}
        {events && (<div className="events grid xs:grid-cols-1 sm:grid-cols-2 mdlg:grid-cols-7 md:grid-cols-4 xs:px-4 sm:px-10 md:px-20 gap-4 pb-20 pt-4">
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
                    return <div className="h-[350px] bg-[#0F1415]" key={event.id}>
                        <div className="grid grid-cols-12">
                        <div className="bg-[#B2FFDF] text-jet xs:col-span-4 sm:col-span-6 md:col-span-6 text-center font-bold xs:mx-6 sm:mx-4 md:mx-2 p-2">
                            <p className="xs:text-[14px] text-[12px] font-normal uppercase">{dayOfTheWeek}</p>
                            <p className="xs:text-[14px] text-[12px] ">{eventMonth} / {eventDay}</p>
                        </div>
                        <div className="xs:col-span-8 sm:col-span-6 md:col-span-6 text-center xs:px-4 sm:px-4 md:px-0 flex xs:justify-end sm:justify-end md:justify-center items-center">
                        <p className="sm:text-[14px] md:text-[12px] mt-[12px] font-extrabold">${event.event_cost}</p>
                        </div>
                        </div>
                        <div className="grid grid-cols-6 h-[70%]">
                            <div className="col-span-6 p-4 break-words">{event.matinee != null &&
                            <>
                             <p className="sm:text-[12px] md:text-[9px] font-extrabold sm:text-left uppercase md:text-center tracking-[.25em]">Matinee</p>
                               <p className="sm:text-[14px] md:text-[.75em] font-medium uppercase text-[#caaff7]">{event.matinee}</p>
                               </>
                               }
                               
                               {event.dj != null &&
                               <>
                               <p className="sm:text-[12px] md:text-[9px] font-extrabold uppercase sm:text-left md:text-center tracking-[.25em] mt-2">OUTSIDE LATE</p>
                               <p className="sm:text-[14px] md:text-[.75em] font-medium uppercase text-[#caaff7]">{event.dj}</p>
                               </>}
                               {event.lateShow != null &&
                               <>
                               <p className="sm:text-[12px] md:text-[9px] font-extrabold uppercase sm:text-left md:text-center tracking-[.25em] mt-2">INSIDE LATE</p>
                               <p className="sm:text-[14px] md:text-[.75em] font-medium uppercase text-[#caaff7]">{event.lateShow}</p>
                               </>}
                            </div>
                        </div>
                        <div className=" text-center">
                            <div>
                                <Link to={'/event/' + event.id}>
                                <a href="" className="hover:bg-neutral-900 py-2 px-4 border-2 border-slate-600 rounded-md text-slate-300 ease-in-out text-center uppercase text-[12px]">View Details</a></Link>
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