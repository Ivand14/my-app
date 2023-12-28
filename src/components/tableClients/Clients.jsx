import React, { useEffect, useState } from 'react'
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";

import Spinners from '../Spinner/Spinner';
import axios from 'axios'

export const Clients = () => {

    const[isLoading,setIsLoading] = useState(true)
    const[userInfo,setUserInfo] = useState([])

    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false)
        }, 2000);

        const getClients = async() =>{
            const response = await axios.get('ep-raspy-term-16075401-pooler.us-east-1.postgres.vercel-storage.com/api/getClients')
            setUserInfo(response.data)
        }

        getClients()
    }, [])

    return (
        <div  className="mt-10 w-full px-3" >
        <Table aria-label="Example empty table">
                <TableHeader>
                    <TableColumn>CLIENTE</TableColumn>
                    <TableColumn>EMAIL</TableColumn>
                </TableHeader>
            
                {isLoading ? 
                <TableBody emptyContent={<Spinners/>}>{[]}</TableBody>
                : 
                <TableBody>
                    {userInfo.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                    ))}
                </TableBody>
            }
        </Table>
    </div>
    )
}

export default Clients