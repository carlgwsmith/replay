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
    const [showOutside, setShowOutside] = useState(false)
    const [showMatinee, setShowMatinee] = useState(false)
    const [showLate, setShowLate] = useState(false)

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
                if(data.matinee === null){
                    setShowMatinee(true)
                }
                if(data.dj === null){
                    setShowOutside(true)
                }
                if(data.lateShow === null){
                    setShowOutside(true)
                }
            }
        }
        fetchEvent()


    }, [id, navigate ]);

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if( !event_description || !event_image || !event_cost){
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
            <h2 className="font-bold text-xl">Edit {date}</h2>
        </div>
    </div>
    <form onSubmit={handleSubmit}>
    <div className="grid grid-cols-6 px-[40px] py-[20px] gap-4">
            <div className="col-span-4 col-start-2">
                <label htmlFor="name" className="block">Matinee Details</label>
                <textarea type="text" id="name" className="w-[100%] p-2 h-10 rounded-sm border-1 border-gray-400" value={matinee} onChange={(e)=> setMatinee(e.target.value)} disabled={showMatinee}/>
                <input type="checkbox" id="checkbox" className="mr-2" checked={showMatinee} onChange={checkMatineeHandler}/>
                <label htmlFor="checkbox"><sup className="top-[-0.15em]">No Matinee</sup></label>
            </div>
            <div className="col-span-4 col-start-2">
                <label htmlFor="name" className="block">DJ or Late Show Outside Details</label>
                <textarea type="text" id="name" className="w-[100%] p-2 h-10 rounded-sm border-1 border-gray-400" value={dj} onChange={(e)=> setDj(e.target.value)} disabled={showOutside}/>
                <input type="checkbox" id="checkbox1" className="mr-2" checked={showOutside} onChange={checkShowOutsideHandler}/>
      <label htmlFor="checkbox1"><sup className="top-[-0.15em]">No Show Outside</sup></label>
            </div>
            <div className="col-span-4 col-start-2">
                <label htmlFor="name" className="block">Late Event Details</label>
                <textarea type="text" id="name" className="w-[100%] p-2 h-10 rounded-sm border-1 border-gray-400" value={lateShow} onChange={(e)=> setLateShow(e.target.value)} disabled={showLate}/>
                <input type="checkbox" id="checkbox2" className="mr-2" checked={showLate} onChange={checkLateShowHandler}/>
      <label htmlFor="checkbox2"><sup className="top-[-0.15em]">No Late Show</sup></label>
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