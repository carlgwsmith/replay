import { useEffect, useState } from 'react'
import supabase from '../Config/supabaseClient'
import { useNavigate, useParams } from "react-router-dom"


export default function Event(){
    const {id} = useParams()
    const navigate = useNavigate()
    const [matinee, setMatinee] = useState('');
    const [dj, setDj] = useState('')
    const [lateShow, setLateShow] = useState('')
    const [event_description, seteventDescription] = useState('');
    const [event_image, seteventImage] = useState('');
    const [event_cost, seteventCost] = useState('');
    // const [event_date, seteventDate] = useState(new Date());
    // const [date, setDate] = useState('')
    const [formError, setFormError] = useState('')

    const d = new Date();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    const [currentMonth, setCurrentMonth] = useState(month)
    const [currentYear, setCurrentYear] = useState(year)

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    useEffect(() => {
        const fetchEvent = async ()=>{
            const {data, error} = await supabase
            .from('events')
            .select()
            .eq('id', id)
            .single()

            if(error){
                setFormError('Event can not be retreived')
                navigate('/eventlist', {replace: true})
            }
            if(data){
                seteventCost(data.event_cost)
                seteventDescription(data.event_description)
                seteventImage(data.event_image)
                // seteventDate(data.event_date)
                setMatinee(data.matinee)
                setDj(data.dj)
                setLateShow(data.lateShow)
            }
        }
        fetchEvent()


    }, [id, navigate ]);

    return(<>
    <img src={event_image} alt={'poster for event'} />
    <h1>{dj}</h1>
    <h1>{matinee}</h1>
    <h1>{lateShow}</h1>
    <p>{event_description}</p>
    {/* <p>{event_date}</p> */}
    <p>{event_cost}</p>
    </>)
}