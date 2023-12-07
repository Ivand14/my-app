"use client"

import "react-step-progress-bar/styles.css";

import {Button, Input, Select, SelectItem} from "@nextui-org/react";
import { ProgressBar, Step } from "react-step-progress-bar";
import React, { useEffect, useState } from 'react'

import Calendary from "@/components/calendar/Calendar";
import Mercadopago from "@/components/mercadopago/Mercadopago";
import NavBar from '@/components/navbar/Navbar';

const Reserv = () => {

    const [IsProgress,setIsProgress] = useState(0)

    
    
    const [selectedServices,setSelectedServices] = useState({
        description:'',
        hour:'',
        day:'',
        cost:'',
        userId:'',
        pay:false
    })

    
    
    const handleStep = () => {
        if(selectedServices.description !== '' && selectedServices.hour !== '' && selectedServices.day !== ''  ){
            setIsProgress(  50 )
        }
    }

    useEffect(() => {
        const description = selectedServices.description.toLowerCase();
        let cost = '';
    
        switch (description) {
            case 'corte':
                cost = '2000';
                break;
            case 'corte y barba':
                cost = '2500';
                break;
            case 'mechas y reflejos':
                cost = '3000';
                break;
            case 'globales y franjas':
                cost = '3500';
                break;
            default:
                break;
        }

        const savedUserInfo = JSON.parse(sessionStorage.getItem('userInfo'))

        if(savedUserInfo){
            setSelectedServices((prevState) => ({ ...prevState, userId:savedUserInfo.id }))
        }

        setSelectedServices((prevState) => ({ ...prevState, cost }));
    }, [selectedServices.description]);
    

    const service = ['Corte','Corte y Barba','Mechas y Reflejos','Globales y Franjas']
    const hour = ["09:00","10:00","11:00","12:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"]

    console.log('service',selectedServices)
    
    return (
        <div>
            <NavBar/>
            <div className="flex justify-between p-4 mt-5">
                <div className='flex flex-col justify-center  bg-white rounded-md m-4 w-3/5 flex'>
                    {IsProgress === 0 && (
                        <div className='flex gap items-center p-4'>
                            <img src="/icons/reserv.svg" width="30"/>
                            <h2 className="p-4">Hacer una reserva</h2>
                        </div>
                    )}
                    {IsProgress === 50 && (
                        <div className='flex gap items-center p-4'>
                            <img src="/icons/pay.svg" width="30"/>
                            <h2 className="p-4">Metodo de pago</h2>
                        </div>
                    )}
                <div className="m-2">
                    <ProgressBar
                        percent={IsProgress}
                        filledBackground="linear-gradient(to right, #8ACDD7, #3081D0)"
                    >
                        <Step transition="scale">
                        {({ accomplished }) => (
                            <img
                            style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                            width="30"
                            src="/imagenes/check.png"
                            />
                        )}
                        </Step>
                        <Step transition="scale">
                        {({ accomplished }) => (
                            <img
                            style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                            width="30"
                            src="/imagenes/check.png"
                            />
                        )}
                        </Step>
                        <Step transition="scale">
                        {({ accomplished }) => (
                            <img
                            style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                            width="30"
                            src="/imagenes/check.png"
                            />
                        )}
                        </Step>
                    </ProgressBar>
                </div>
                <div className="w-full flex items-center justify-center">
                    {
                        IsProgress === 0 && (
                            <>
                                <Select 
                                    label="Seleccionar servicio" 
                                    className="max-w-xs p-4 w-full" 
                                    onChange={(event) => setSelectedServices((prevState) => ({...prevState, description: event.target.value}))}
                                >
                                    {service.map((services) => (
                                        <SelectItem key={services} value={services}>
                                            {services}
                                        </SelectItem>
                                        ))}
                                    </Select>

                                    <Select 
                                        label="Seleccionar hora" 
                                        className="max-w-xs p-4 w-full" 
                                        onChange={(event) => setSelectedServices((prevState)=>({...prevState,hour:event.target.value}))}
                                    >
                                        {hour.map((hours) => (
                                        <SelectItem key={hours} value={hours}>
                                            {hours}
                                        </SelectItem>
                                        ))}
                                    </Select>

                                    <Input
                                        isDisabled
                                        type="text"
                                        placeholder="--/--/--"
                                        className="max-w-xs p-4"
                                        value={selectedServices.day}
                                    />
                            </>
                    )
                    }
                    {
                        IsProgress === 50 && (
                            <>
                                <Input
                                    isDisabled
                                    type="text"
                                    className="max-w-xs p-4"
                                    value={`${selectedServices.cost} $`}
                                />
                                <Input
                                    isDisabled
                                    type="text"
                                    className="max-w-xs p-4 text-black"
                                    value='MERCADO PAGO'
                                />
                            </>           
                    )}
                </div>
                
                <div className=' flex justify-end p-4'>
                    {IsProgress === 0 && <Button color="primary"  onClick={handleStep}>Continuar</Button>}
                    {IsProgress === 50 && <Mercadopago id={selectedServices.userId} description={selectedServices.description} cost={selectedServices.cost} />}
                </div>
            </div>

                <div>
                    <Calendary setSelectedServices={setSelectedServices}/>
                </div>
            </div>
        </div>
    )
}

export default Reserv