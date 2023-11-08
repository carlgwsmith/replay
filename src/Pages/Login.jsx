import { useState, useEffect } from 'react'
import supabase from '../Config/supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export default function Login(){
    const [session, setSession] = useState(null)

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
    <div className="col-span-6 bg-white col-start-4">
    <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
    </div>
  </div>
)
}
else {
  return (<div className='text-center my-40'>Logged in!</div>)
}
}