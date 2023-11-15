import { Link, useNavigate, useParams } from "react-router-dom"
import supabase from "../Config/supabaseClient"
import { useEffect, useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function EditEvent(){

    const {id} = useParams()
    const navigate = useNavigate()
    const [matinee, setMatinee] = useState('');
    const [dj, setDj] = useState('')
    const [lateShow, setLateShow] = useState('')
    const [event_description, seteventDescription] = useState('');
    const [event_image, seteventImage] = useState('');
    const [event_cost, seteventCost] = useState('');
    const [event_date, seteventDate] = useState(new Date());
    const [date, setDate] = useState('')
    const [formError, setFormError] = useState('')

    useEffect(() => {
        const fetchEvent = async ()=>{
            const {data, error} = await supabase
            .from('events')
            .select()
            .eq('id', id)
            .single()

            if(error){
                navigate('/eventlist', {replace: true})
            }
            if(data){
                seteventCost(data.event_cost)
                seteventDescription(data.event_description)
                seteventImage(data.event_image)
                setDate(data.event_date)
                setMatinee(data.matinee)
                setDj(data.dj)
                setLateShow(data.lateShow)

                console.log(typeof data.event_date)
            }
        }
        fetchEvent()
    }, [id, navigate ]);

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(!matinee || !dj || !lateShow || !event_description || !event_image || !event_cost){
            setFormError('Complete all form fields')
            return
        }
        const { data, error } = await supabase
        .from('events')
        .update({
            dj, lateShow, matinee, event_cost, event_date, event_description, event_image
        })
        .select()
        .eq('id', id)
        
        if(error){
            console.log(error)
            setFormError('Please complete the form')
        }
        if(data){
            setFormError(null)
            navigate('/eventList')
        }
    }
    return(<>
    <div className="grid grid-cols-6 px-[40px] py-[20px]">
        <div className="col-span-4 col-start-2">
            <h2 className="font-bold text-xl">Edit {date}</h2>
        </div>
    </div>
    <form onSubmit={handleSubmit}>
    <div className="grid grid-cols-6 px-[40px] py-[20px] gap-4">
            <div className="col-span-4 col-start-2">
                <label htmlFor="name" className="block">Matinee Event</label>
                <textarea type="text" id="name" className="w-[100%] p-2 h-10 rounded-sm border-1 border-gray-400" value={matinee} onChange={(e)=> setMatinee(e.target.value)} />
                
            </div>
            <div className="col-span-4 col-start-2">
                <label htmlFor="name" className="block">DJ or Late Show Outside</label>
                <textarea type="text" id="name" className="w-[100%] p-2 h-10 rounded-sm border-1 border-gray-400" value={dj} onChange={(e)=> setDj(e.target.value)} />
            </div>
            <div className="col-span-4 col-start-2">
                <label htmlFor="name" className="block">Late Event</label>
                <textarea type="text" id="name" className="w-[100%] p-2 h-10 rounded-sm border-1 border-gray-400" value={lateShow} onChange={(e)=> setLateShow(e.target.value)} />
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
                <Link to="/eventlist">
                <button className="p-2">Cancel</button></Link>
            <button className="border-2 p-2 rounded-sm text-slate-800 bg-gray-300 border-gray-300 cursor-pointer float-right">Update Event</button>
            {formError && <p className="error text-red-500">{formError}</p>}
            </div>
    </div>
        </form>
    </>)
}