import { useState } from "react"
import supabase from "../Config/supabaseClient";
import {useNavigate} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateEvent(){
    const [event_name, seteventName] = useState('');
    const [event_description, seteventDescription] = useState('');
    const [event_image, seteventImage] = useState('');
    const [event_cost, seteventCost] = useState('');
    const [event_start_time, seteventStartTime] = useState('');
    const [event_date, seteventDate] = useState( new Date());
    const [formError, setformError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(!event_name || !event_description || !event_image || !event_cost || !event_start_time){
            setformError('Complete all form fields')
            return
        }
        const {data, error} = await supabase
        .from('events')
        .insert([{event_name, event_cost, event_description, event_start_time, event_image, event_date}])
        .select()

        if(error){
            console.log(error)
            setformError('Complete all form fields')
        }
        if(data){
            console.log(data)
            setformError(null)
            navigate('/eventlist')
        }
    }
    return(<>
    <div className="grid grid-cols-6 px-[40px] py-[20px]">
        <div className="col-span-4 col-start-2">
            <h2 className="font-bold text-xl">Create event</h2>
        </div>
    </div>
    <form onSubmit={handleSubmit}>
    <div className="grid grid-cols-6 px-[40px] py-[20px] gap-4">
            <div className="col-span-4 col-start-2">
                <label htmlFor="name" className="block">Event Name</label>
                <input type="text" id="name" className="w-[100%] p-2 h-10 rounded-sm border-1 border-gray-400" value={event_name} onChange={(e)=> seteventName(e.target.value)} />
            </div>
            <div className="col-span-4 col-start-2">
                <label htmlFor="description" className="block">Event Description</label>
                <textarea type="text" className="w-[100%] p-2 h-20 rounded-sm border-1 border-gray-400" id="description" value={event_description} onChange={(e)=> seteventDescription(e.target.value)} />
            </div>
            <div className="col-span-4 col-start-2">
                <label htmlFor="eventimage" className="block">Event Image</label>
                <input type="text" className="w-[100%] p-2 h-10 rounded-sm border-1 border-gray-400" id="eventimage" value={event_image} onChange={(e)=> seteventImage(e.target.value)} />
            </div>
            <div className="col-span-4 col-start-2">
                <label htmlFor="cost" className="block">Event Cost</label>
                <input type="text" className="w-[100%] p-2 h-10 rounded-sm border-1 border-gray-400" id="cost" value={event_cost} onChange={(e)=> seteventCost(e.target.value)} />
            </div>
            <div className="col-span-4 col-start-2">
                <label htmlFor="starttime" className="block">Event Date</label>
                <DatePicker selected={event_date} onChange={(date) => seteventDate(date)} />
            </div>
            <div className="col-span-4 col-start-2">
                <label htmlFor="starttime" className="block">Event Start Time</label>
                <input type="time" className="w-[100%] p-2 h-10 rounded-sm border-1 border-gray-400" id="starttime" value={event_start_time} onChange={(e)=> seteventStartTime(e.target.value)} />
            </div>
            <div className="col-span-4 col-start-2">
            <button className="border-2 p-2 rounded-sm text-slate-800 bg-gray-300 border-gray-300 cursor-pointer">Submit Event</button>
            {formError && <p className="error text-red-500">{formError}</p>}
            </div>
    </div>
        </form>
    </>)
}