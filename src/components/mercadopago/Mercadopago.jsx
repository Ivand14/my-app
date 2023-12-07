"use client"

import React, { useState } from 'react'

import {Button} from "@nextui-org/react";
import axios from 'axios';

const Mercadopago = ({description,cost,userId}) => {

    const handleBuy = async() => {

        const buyInfo = {
            description,
            cost
        }

        const savedUserInfo = JSON.parse(sessionStorage.getItem('userInfo'))

        const userInfo = {
            userId
        }
        

        try{
            
            const response = await axios.post('http://localhost:3000/api/mercadoPago/payment',buyInfo)
            const data = response.data.init_point
            window.location.href = data

            // const responsew = await axios.post('http://localhost:3000/api/mercadoPago/webhook',userInfo)

            // console.log(responsew.data)

        }catch(error){
            console.log(error)
        }
    }

    return (
        <div>
            <Button color="primary"  onClick={handleBuy}>Continuar</Button>
        </div>
    )
}

export default Mercadopago