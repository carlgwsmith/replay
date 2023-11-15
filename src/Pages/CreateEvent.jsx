import { useState } from "react"
import supabase from "../Config/supabaseClient";
import {useNavigate, Link} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";

export default function CreateEvent(){
    const [matinee, setMatinee] = useState('');
    const [dj, setDj] = useState('')
    const [lateShow, setLateShow] = useState('')
    const [event_description, seteventDescription] = useState('');
    const [event_image, seteventImage] = useState('');
    const [event_cost, seteventCost] = useState('');
    const [event_date, seteventDate] = useState( new Date());
    const [formError, setformError] = useState('');
    const [showOutside, setShowOutside] = useState(false)
    const [showMatinee, setShowMatinee] = useState(false)
    const [showLate, setShowLate] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(!event_description || !event_image || !event_cost ){
            setformError('Complete all form fields')
            return
        }
        const {data, error} = await supabase
        .from('events')
        .insert([{matinee, lateShow, event_cost, event_description, dj, event_image, event_date}])
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

    const checkShowOutsideHandler = () =>{
        setShowOutside(!showOutside)
        setDj(null)
    }
    const checkMatineeHandler = () =>{
        setShowMatinee(!showMatinee)
        setMatinee(null)
    }
    const checkLateShowHandler = () =>{
        setShowLate(!showLate)
        setLateShow(null)
    }
    return(<>
    <div className="grid grid-cols-6 px-[40px] py-[20px]">
        <div className="col-span-4 col-start-2">
            <h2 className="font-bold text-xl">Create event</h2>
        </div>
    </div>
    <form onSubmit={handleSubmit}>
    <div className="grid grid-cols-6 px-[40px] py-[20px] gap-4">
            <div className="col-span-4 col-start-2 mb-4">
                <label htmlFor="name" className="block font-bold">Matinee Details</label>
                <textarea type="text" id="name" className="w-[100%] p-2 h-10 rounded-sm border-1 border-gray-400" value={matinee} onChange={(e)=> setMatinee(e.target.value)} disabled={showMatinee}/>
                <input type="checkbox" id="checkbox" className="mr-2" checked={showMatinee} onChange={checkMatineeHandler}/>
      <label htmlFor="checkbox"><sup className="top-[-0.15em]">No Matinee</sup></label>
            </div>
            <div className="col-span-4 col-start-2 mb-4">
                <label htmlFor="name" className="block font-bold">DJ or Late Show Outside Details</label>
                <textarea type="text" id="name" className="w-[100%] p-2 h-10 rounded-sm border-1 border-gray-400 disabled:border-1 disabled:border-slate-500" value={dj} onChange={(e)=> setDj(e.target.value)} disabled={showOutside}/>
                <input type="checkbox" id="checkbox1" className="mr-2" checked={showOutside} onChange={checkShowOutsideHandler}/>
      <label htmlFor="checkbox1"><sup className="top-[-0.15em]">No Show Outside</sup></label>
            </div>
            <div className="col-span-4 col-start-2 mb-4">
                <label htmlFor="name" className="block font-bold">Late Show Details</label>
                <textarea type="text" id="name" className="w-[100%] p-2 h-10 rounded-sm border-1 border-gray-400" value={lateShow} onChange={(e)=> setLateShow(e.target.value)} disabled={showLate}/>
                <input type="checkbox" id="checkbox2" className="mr-2" checked={showLate} onChange={checkLateShowHandler}/>
      <label htmlFor="checkbox2"><sup className="top-[-0.15em]">No Late Show</sup></label>
            </div>
            <div className="col-span-4 col-start-2 mb-4">
                <label htmlFor="description" className="block font-bold">Event Description</label>
                <textarea type="text" className="w-[100%] p-2 h-20 rounded-sm border-1 border-gray-400" id="description" value={event_description} onChange={(e)=> seteventDescription(e.target.value)} />
            </div>
            <div className="col-span-4 col-start-2 mb-4">
                <label htmlFor="eventimage" className="block font-bold">Event Image</label>
                <input type="text" className="w-[100%] p-2 h-10 rounded-sm border-1 border-gray-400" id="eventimage" value={event_image} onChange={(e)=> seteventImage(e.target.value)} />
            </div>
            <div className="col-span-4 col-start-2 mb-4">
                <label htmlFor="cost" className="block font-bold">Event Cost</label>
                <input type="text" className="w-[100%] p-2 h-10 rounded-sm border-1 border-gray-400" id="cost" value={event_cost} onChange={(e)=> seteventCost(e.target.value)} />
            </div>
            <div className="col-span-4 col-start-2 mb-4">
                <label htmlFor="starttime" className="block font-bold">Event Date</label>
                <DatePicker selected={event_date} onChange={(date) => seteventDate(date)} />
            </div>
            <div className="col-span-4 col-start-2 mb-4">
                <Link to="/eventlist">
                <button className="p-2">Cancel</button></Link>
            <button className="border-2 p-2 rounded-sm text-slate-800 bg-gray-300 border-gray-300 cursor-pointer float-right">Update Event</button>
            {formError && <p className="error text-red-500">{formError}</p>}
            </div>
    </div>
        </form>
    </>)
}