import { Link, useNavigate, useParams } from "react-router-dom"
import supabase from "../Config/supabaseClient"
import { useEffect, useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function EditEvent(){

    const {id} = useParams()
    const navigate = useNavigate()
    const [special, setSpecial] = useState('');
    const [day_of_special, setDayOfSpecial] = useState('');
    const [formError, setFormError] = useState('')

    useEffect(() => {
        const fetchEvent = async ()=>{
            const {data, error} = await supabase
            .from('specials')
            .select()
            .eq('id', id)
            .single()

            if(error){
                navigate('/specialslist', {replace: true})
            }
            if(data){
                setSpecial(data.special)
                setDayOfSpecial(data.day_of_special)
            }
        }
        fetchEvent()


    }, [id, navigate ]);

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if( !special || !day_of_special){
            setFormError('Complete all form fields')
            return
        }
        const { data, error } = await supabase
        .from('specials')
        .update({
            special, day_of_special
        })
        .select()
        .eq('id', id)
        
        if(error){
            console.log(error)
            setFormError('Please complete the form')
        }
        if(data){
            setFormError(null)
            navigate('/specialslist')
        }
    }

    return(<>
    <div className="grid grid-cols-6 px-[40px] py-[20px]">
        <div className="col-span-4 col-start-2">
            <h2 className="font-bold text-xl">Special for {day_of_special}</h2>
        </div>
    </div>
    <form onSubmit={handleSubmit}>
    <div className="grid grid-cols-6 px-[40px] py-[20px] gap-4">
            <div className="col-span-4 col-start-2">
                <label htmlFor="name" className="block">Special for {day_of_special}</label>
                <textarea type="text" id="name" className="w-[100%] p-2 h-20 rounded-sm border-1 border-gray-400" value={special} onChange={(e)=> setSpecial(e.target.value)}/>
            </div>
            <div className="col-span-4 col-start-2">
                <Link to="/eventlist">
                <button className="p-2">Cancel</button></Link>
            <button className="border-2 p-2 rounded-sm text-slate-800 bg-gray-300 border-gray-300 cursor-pointer float-right">Update Special</button>
            {formError && <p className="error text-red-500">{formError}</p>}
            </div>
    </div>
        </form>
    </>)
}