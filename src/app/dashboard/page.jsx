"use client"

import React, { useEffect, useState } from 'react'

import NavBar from '@/components/navbar/Navbar';
import ReservClient from '@/components/ReservsClient/ReservClient';
import Reservs from "@/components/tableReservs/Reservs";
import WhitoutReservs from '@/components/whitOutReservs/WhitoutReservs';
import axios from 'axios'

const Dashboard = () => {

    const[payData,setPayData] = useState([])
    const[userData,setUserData] = useState([])

    useEffect(()=>{
        const getReservs = async() => {
            let userInfo;
            if (typeof window !== 'undefined') {
                userInfo = JSON.parse(localStorage.getItem('userInfo'))
            }
            const response = await axios.get(`/api/getReservs/${userInfo.id}`)

            setPayData(response.data)
        }
        const getAll = async() =>{
            const response = await axios.get('/api/getHours')
            setUserData(response.data)
        }
        getAll()
        getReservs()
    },[])

    let isAdmin;
    if (typeof window !== 'undefined') {
        isAdmin = JSON.parse(localStorage.getItem('userInfo'))
    }

    return (
        <div className='flex-col justify-center items-center' >
            <NavBar payData={payData}/>
            {isAdmin?.admin === true ?
                userData.length === 0 ? <WhitoutReservs/> : <ReservClient userData={userData}/>
                :
                payData.length === 0 ? <WhitoutReservs/> : <Reservs payData={payData}/>
            }
        </div>
    );
}

export default Dashboard
