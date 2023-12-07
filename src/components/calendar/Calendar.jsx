"use client"

import  'react-calendar/dist/Calendar.css' ;

import Calendar from 'react-calendar'

const Calendary = ({setSelectedServices}) => {


    const handleDateChange = (value) => {
        const date = value.toLocaleDateString()
        setSelectedServices((prevState)=>({...prevState,day:date}))
    }
    
    const someDays = ({date,view}) => {
        const day = date.getDay();
        return !(day >= 2 && day <= 6);
    }

    return (
        <div className='p-4'> <Calendar locale='es-ES' className='rounded-md' tileDisabled={someDays} onChange={handleDateChange}
        /></div>
    )
}

export default Calendary