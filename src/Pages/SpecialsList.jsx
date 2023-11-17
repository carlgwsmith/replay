import supabase from "../Config/supabaseClient"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import SpecialCard from '../Specials/SpecialCard'

export default function SpecialsList (){
 const [error, setError] = useState(null)
 const [specials, setSpecials] = useState(null)
 const [orderBy, setOrderBy] = useState('created_at')

 useEffect(() => {
    const fetchSpecials = async () =>{
        const {data, error} = await supabase
        .from('specials')
        .select()
        .order(orderBy, {ascending: true})

        if(error){
            setError('could not reach database')
            setSpecials(null)
            console.log(error)
        }
        if(data){
            setSpecials(data)
            setError(null)
        }
    }

    fetchSpecials()
 }, [orderBy]);


    return(<>
    <div>
        {error && (<p>{error}</p>)}
        {specials && (
        <div className="events">
            {specials.map((special) => {
                    return <SpecialCard key={special.id} special={special}/>
            })}
        </div>
        )}
    </div>
    </>)
}