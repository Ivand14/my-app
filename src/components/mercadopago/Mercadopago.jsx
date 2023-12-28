"use client"

import React, { useState } from 'react'

import {Button} from "@nextui-org/react";
import axios from 'axios';
import { useRouter } from 'next/router';

const Mercadopago = ({description,cost,loading}) => {



    const handleBuy = async() => {

        const service={
            description,
            cost,
        }

        try {
            loading(true)
            const responseOrder = await axios.post('https://luquiando-barber.vercel.app/api/mercadopago/createOrder',service)
            const data = responseOrder.data.response.init_point
            window.location.href = data
            

        } catch (error) {
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