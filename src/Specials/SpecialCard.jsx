import supabase from "../Config/supabaseClient"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {CiEdit, CiTrash} from 'react-icons/ci'

export default function SpecialCard ({ special }){



    return(<>
    <div className="my-2 mx-4">
        <div className="grid grid-cols-12 p-2 border-2  rounded-sm">
        <div className="col-span-2"><p>{special.day_of_special}</p></div>
            <div className="col-span-8"><p>{special.special}</p></div>
            <div className="col-span-2 text-right">
                    <p className="inline-block px-4">
                        <Link to={'/special/edit/' + special.id }>
                            <span><CiEdit size="22px"/></span>
                        </Link>
                    </p>
            </div>
        </div>
    </div>
    </>)
}