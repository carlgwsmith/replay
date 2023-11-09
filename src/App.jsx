import Home from './Pages/Home'
import './App.css'
import Header from './Global Components/header'
import Footer from './Global Components/footer'
import ApiCalendar from 'react-google-calendar-api'
import { useEffect } from 'react'
import axios from 'axios'
import AdminHeader from './Global Components/adminHeader'

function App() {

  const calendarId = import.meta.env.VITE_CALENDAR_ID
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY
  // Discovery doc URL for APIs used by the quickstart
  const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';


  // const config = {
  //   clientId: import.meta.env.VITE_CLIENT_ID,
  //   apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  //   scope: "https://www.googleapis.com/auth/calendar",
  //   discoveryDocs: [
  //     "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  //   ],
  // };
  
  // useEffect(() => {
  //   // import axios from 'axios';

  //   const options = {
  //     method: 'GET',
  //     url: 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId ,
  //     headers: {
  //       'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
  //       'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
  //     }
  //   };
    
  //   try {
  //     const response = await axios.request(options);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  return (
    <>
    <AdminHeader/>
    <Header/>
      <Home/>
      <Footer/>
    </>
  )
}

export default App
