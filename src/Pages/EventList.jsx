import supabase from "../Config/supabaseClient"
import { useEffect, useState } from "react"
import EventListCard from "../EventComponents/EventListCard"
import { Link } from "react-router-dom"
import {GrFormAdd} from 'react-icons/gr'
import {BiLeftArrowAlt, BiRightArrowAlt} from 'react-icons/bi'

export default function EventList (){
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


 const handleDelete = (id)=>{
    setEvents(prevEvents =>{
        return prevEvents.filter(event=> event.id !== id)
    })
 }


    return(<>
    <div>
        {error && (<p>{error}</p>)}
        {events && (<div className="events">
            <div className="grid grid-cols-12 px-4 py-[60px]">
                <div className="col-span-2">
                   <Link to="/createEvent" className="border-1 bg-slate-400 p-4 rounded-sm text-gray-900"><GrFormAdd className="inline"/>Create New Event</Link>
                </div>
            </div>
            <div className="grid grid-cols-12 my-6 mx-10">
            <div className="col-span-4">
            <button onClick={decrementMonth}><BiLeftArrowAlt size="22px" className="inline p-l-1"/>Previous Month</button>
            </div>
            <div className="col-span-4 text-center">
                <h1 className="text-[42px] mb-4 font-bold">{monthNames[currentMonth -1]} {currentYear}</h1></div>
            <div className="col-span-4 text-right">
            <button onClick={incrementMonth}>Next Month <BiRightArrowAlt className="inline" size="22px"/></button>
            </div>
        </div>
            {events.map(event => (
                <EventListCard key={event.id} event={event} onDelete={handleDelete}/>
            ))}
        </div>)}
    </div>
    </>)
}