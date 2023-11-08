import { useState, useEffect } from 'react'
import supabase from '../Config/supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export default function Login(){
    const [session, setSession] = useState(null)

        const logOut = async()=>{
        
const { error } = await supabase.auth.signOut()
    }

useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session)
  })

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session)
  })
  

  return () => subscription.unsubscribe()
}, [])


if (!session) {
  return (
  <div className="grid grid-cols-12">
    <div className="col-span-6 bg-white col-start-4 p-10">
    <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
    </div>
  </div>
)
}
else {
  return (<div className='m-40'>
    <h1 className='text-center text-[42px] font-bold'>Logged in!</h1>
  <div onClick={logOut} className="m-auto border-2 p-5 w-[200px] text-center mt-[20px] hover:bg-slate-500 hover:cursor-pointer">Log Out</div>
  </div>)
}
}