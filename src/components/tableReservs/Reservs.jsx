

import React, { useEffect, useState } from 'react'
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";

import Spinners from '../Spinner/Spinner';

const Reservs = ({payData}) => {

    const[isLoading,setIsLoading] = useState(true)


    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false)
        }, 2000);

    }, [])
    
    return (
        <div  className="mt-10 w-full px-3" >
            <Table aria-label="Example empty table">
                <TableHeader>
                <TableColumn>DESCRIPCION</TableColumn>
                <TableColumn>DIA</TableColumn>
                <TableColumn>HORA</TableColumn>
                <TableColumn>COSTO</TableColumn>
                <TableColumn>PAGADO</TableColumn>
                </TableHeader>
                {isLoading ? 
                    <TableBody emptyContent={<Spinners/>}>{[]}</TableBody>
                    : 
                    <TableBody>
                        {payData.map((pay, index) => (
                                <TableRow key={index}>
                                    <TableCell>{pay.service}</TableCell>
                                    <TableCell>{pay.day}</TableCell>
                                    <TableCell>{pay.hour}</TableCell>
                                    <TableCell>{pay.cost}$</TableCell>
                                    <TableCell>{pay.pay ? 'Si' : 'No'}</TableCell>
                                </TableRow>
                        ))}
                    </TableBody>
                }
            </Table>
        </div>
    )
}

export default Reservs