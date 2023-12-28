"use client"

import React, { useEffect, useState } from 'react'
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";

import Spinners from '../Spinner/Spinner';
import WhitoutReservs from '../whitOutReservs/WhitoutReservs';

const ReservClient = ({userData}) => {

    const[isLoading,setIsLoading] = useState(true)


    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false)
        }, 2000);

    }, [])
    
    return (
        <div  className="mt-10 w-full px-3" >
            {
                userData.length === 0 ? <WhitoutReservs/> 
                :
                <Table aria-label="Example empty table">
                    <TableHeader>
                    <TableColumn>CLIENTE</TableColumn>
                    <TableColumn>DESCRIPCION</TableColumn>
                    <TableColumn>HORA</TableColumn>
                    <TableColumn>DIA</TableColumn>
                    <TableColumn>PAGADO</TableColumn>
                    </TableHeader>
                    {isLoading ? 
                        <TableBody emptyContent={<Spinners/>}>{[]}</TableBody>
                        : 
                        
                        <TableBody>
                            {userData.map((user,index)=>(
                                <TableRow key={index}>
                                    <TableCell>{user.user.name}</TableCell>
                                    <TableCell>{user.service}</TableCell>
                                    <TableCell>{user.hour}</TableCell>
                                    <TableCell>{user.day}</TableCell>
                                    <TableCell>{user.pay ? 'Si' : 'No'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        
                    }
                </Table>
            }
        </div>
    )
}

export default ReservClient