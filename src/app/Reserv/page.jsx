"use client"

import "react-step-progress-bar/styles.css";
import 'react-toastify/dist/ReactToastify.css';

import {Button, Input, Select, SelectItem} from "@nextui-org/react";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import { ProgressBar, Step } from "react-step-progress-bar";
import React, { useEffect, useState } from 'react'
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';

import Calendary from "@/components/calendar/Calendar";
import { Clients } from "@/components/tableClients/Clients";
import Mercadopago from "@/components/mercadopago/Mercadopago";
import NavBar from '@/components/navbar/Navbar';
import axios from "axios";
import { useRouter } from "next/navigation";

const Reserv = () => {

    const [IsProgress,setIsProgress] = useState(0)

    const[statusPay,setStatusPay] = useState('')

    const[loading,setLoading] = useState(false)

    const[reservedHours,setReserverHours] = useState({})

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [backdrop, setBackdrop] = React.useState('blur')


    const handleOpen = (backdrop) => {
        setBackdrop(backdrop)
        onOpen();
    }
    
    
    const [selectedServices,setSelectedServices] = useState({
        description:'',
        hour:'',
        day:'',
        cost:'',
        userId:'',
    })

    const router = useRouter()


    const service = ['Corte','Corte y Barba','Mechas y Reflejos','Globales y Franjas']
    const hour = ["09:00","10:00","11:00","12:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"]

    const handleStep = () => {

        if (typeof window !== 'undefined') {
            localStorage.setItem('services', JSON.stringify(selectedServices));
        }
    
        if (selectedServices.description !== '' && selectedServices.hour !== '' && selectedServices.day !== '' && statusPay === '') {
            setIsProgress(50);
        }

    };

    const goBack = () => {
        setIsProgress(0)
    }

    const finishBuy = async() => {
        const successOrder = await axios.post('http://localhost:3000/api/mercadopago/success',selectedServices)
        
        if(successOrder.status === 200){
            
            if (typeof window !== 'undefined') {
                localStorage.removeItem('services')
                localStorage.removeItem('progress')
            }
            
            setIsProgress(0)
            router.push('/dashboard')
            setStatusPay('')

            toast.success('Reserva exitosa!')
        }
    }

    
    
    useEffect(() => {
        if (statusPay === 'approved') {
            setIsProgress(150);
        }
    }, [IsProgress,statusPay]);
    


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

        let savedUserInfo;
        if (typeof window !== 'undefined') {
            savedUserInfo = JSON.parse(localStorage.getItem('userInfo'))
        }

        if(savedUserInfo){
            setSelectedServices((prevState) => ({ ...prevState, userId:savedUserInfo.id }))
        }

        setSelectedServices((prevState) => ({ ...prevState, cost }));

        const getHours = async () => {
            const response = await axios.get('http://localhost:3000/api/getHours');
            const hours = response.data;
    
            const updatedHours =  hours.reduce((acc, hour) => {
                const { day, hour: reservedHours } = hour;
                if (!acc[day]) {
                    acc[day] = [reservedHours];
                } else {
                    acc[day].push(reservedHours);
                }
                return acc;
            }, {});
    
            setReserverHours(updatedHours);
        };
    
        getHours();
        
    }, [selectedServices.description]);
    
    

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let savedServices;
            if (typeof window !== 'undefined') {
                savedServices = JSON.parse(localStorage.getItem('services'));
            }
    
            if (savedServices) {
                setSelectedServices(savedServices);
            }
            
            const statusApproved = async() => {
                try {
                    const urlParams = new URLSearchParams(window.location.search);
                    const status = urlParams.get("status"); 
    
                    if(status === 'approved'){
                        setStatusPay(status)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
    
            statusApproved()
        }
    }, []);
    
    
    let isAdmin;
    if (typeof window !== 'undefined') {
        isAdmin = JSON.parse(localStorage.getItem('userInfo'))
    }
    
    let services;
    if (typeof window !== 'undefined') {
        services = JSON.parse(localStorage.getItem('service'))
    }
    
    
    return (
        <div>
            <NavBar/>
            {
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            }

            {isAdmin?.admin === true ?
                <Clients/>
                    :
                <div className="flex justify-between p-4 mt-5 ">
                <div className='flex flex-col justify-center  bg-white rounded-md m-4 w-full flex'>
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
                    {IsProgress === 150 && (
                        <div className='flex gap items-center p-4'>
                            <img src="/icons/payComplete.svg" width="30"/>
                            <h2 className="p-4">Finalizar compra</h2>
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
                <div className=" flex items-center justify-center max-[951px]:flex-col">
                    {
                        IsProgress === 0 && (
                            <>
                                <Select 
                                    label={services ? selectedServices.description : 'Seleccionar servicio' }
                                    className="max-w-xs p-4 w-full" 
                                    value={selectedServices.description}
                                    onChange={(event) => setSelectedServices((prevState) => ({...prevState, description: event.target.value}))}
                                >
                                    {service.map((services) => (
                                        <SelectItem key={services} value={services}>
                                            {services}
                                        </SelectItem>
                                        ))}
                                    </Select>
                                    
                                    <div className="flex items-center">
                                        <Input
                                            isDisabled
                                            type="text"
                                            placeholder="--/--/--"
                                            className="max-w-xs p-4"
                                            value={selectedServices.day}
                                        />

                                    <>
                                        <div className="flex flex-wrap gap-3">
                                            <Button  
                                                variant="light" 
                                                onPress={() => handleOpen('blur')}
                                                className="capitalize"
                                            >
                                            <img src="/icons/calendar.svg" width="30"/>
                                            </Button>
                                        </div>
                                        <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
                                            <ModalContent>
                                            {(onClose) => (
                                                <>
                                                <ModalHeader className="flex flex-col gap-1">Selecciona una fecha</ModalHeader>
                                                <ModalBody>
                                                    <Calendary setSelectedServices={setSelectedServices}/>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="danger" variant="light" onPress={onClose}>
                                                    Close
                                                    </Button>
                                                </ModalFooter>
                                                </>
                                            )}
                                            </ModalContent>
                                        </Modal>
                                        </>
                                        
                                    </div>

                                    <Select 
                                        label={services ? selectedServices.hour : 'Seleccionar hora' }
                                        className="max-w-xs p-4 w-full" 
                                        value={selectedServices.hour}
                                        onChange={(event) => setSelectedServices((prevState)=>({...prevState,hour:event.target.value}))}
                                    >
                                        {hour.map((hours) => {
                                            const isHourReserved = reservedHours[selectedServices.day] && reservedHours[selectedServices.day].includes(hours);
                                            return (
                                                <SelectItem key={hours} value={hours}  isDisabled={isHourReserved}>
                                                    {hours}
                                                </SelectItem>
                                            );
                                        })}
                                    </Select>

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
                    {
                        IsProgress === 150 && (
                            <>
                                {
                                    selectedServices && (
                                        <>
                                            <Table removeWrapper aria-label="Example static collection table">
                                                <TableHeader>
                                                    <TableColumn>SERVICIO</TableColumn>
                                                    <TableColumn>FECHA</TableColumn>
                                                    <TableColumn>HORA</TableColumn>
                                                    <TableColumn>COSTO</TableColumn>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow key="1">
                                                        <TableCell>{selectedServices.description}</TableCell>
                                                        <TableCell>{selectedServices.hour} hs</TableCell>
                                                        <TableCell>{selectedServices.day}</TableCell>
                                                        <TableCell>{selectedServices.cost}$</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </>
                                    )
                                }
                            </>
                        )
                    }
                </div>
                
                <div className=' flex gap-5 justify-end p-4'>
                    {IsProgress === 0 && <Button color="primary"  onClick={handleStep}>Continuar</Button>}
                    
                    {IsProgress === 50 && !loading && <Button color="primary"  onClick={goBack}>Volver</Button>}
                    
                    {IsProgress === 50 && !loading && <Mercadopago id={selectedServices.userId} description={selectedServices.description} cost={selectedServices.cost} day={selectedServices.day} hour={selectedServices.hour} loading={setLoading} />}

                    {IsProgress === 50 && loading && <Button color="primary" isLoading>Cargando</Button> }
                    
                    
                    {IsProgress === 150 && <Button color="primary"  onClick={finishBuy}>Terminar</Button>}
                </div>
            </div>
            </div>
            }
            
        </div>
    )
}

export default Reserv