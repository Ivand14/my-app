"use client"

import  'react-calendar/dist/Calendar.css' ;

import Calendar from 'react-calendar'

const Calendary = ({setSelectedServices}) => {


    const handleDateChange = (value) => {
        const date = value.toLocaleDateString()
        setSelectedServices((prevState)=>({...prevState,day:date}))
    }
    
    const someDays = ({ date, view }) => {
        const day = date.getDay();
        const today = new Date().setHours(0, 0, 0, 0); // Fecha actual sin horas, minutos, segundos ni milisegundos
        const selectedDay = date.getTime(); // Fecha del día a evaluar
    
        // Deshabilitar días pasados y días entre martes (2) y sábado (6)
        return selectedDay < today || !(day >= 2 && day <= 6);
    };
      

    return (
        <div className='p-4'> <Calendar locale='es-ES' className='rounded-md' tileDisabled={someDays} onChange={handleDateChange}
        /></div>
    )
}

export default Calendary