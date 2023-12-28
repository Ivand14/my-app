import React, { useEffect, useState } from "react";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";

import Spinners from "../Spinner/Spinner";

const WhitoutReservs = () => {

    const[isLoading,setIsLoading] = useState(true)

    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false)
        }, 2000);

    }, [])
    
    let isAdmin;
    if (typeof window !== 'undefined') {
        isAdmin = JSON.parse(localStorage.getItem('userInfo'))
    }

    return (
        <Table aria-label="Example empty table" className="mt-10 w-full px-3">
        {
            isAdmin?.admin === true ? 
            <TableHeader>
                <TableColumn>CLIENTE</TableColumn>
                <TableColumn>DESCRIPCION</TableColumn>
                <TableColumn>DIA</TableColumn>
                <TableColumn>HORA</TableColumn>
                <TableColumn>PAGADO</TableColumn>
            </TableHeader>
        :
            <TableHeader>
                <TableColumn>DESCRIPCION</TableColumn>
                <TableColumn>DIA</TableColumn>
                <TableColumn>HORA</TableColumn>
                <TableColumn>COSTO</TableColumn>
                <TableColumn>PAGADO</TableColumn>
            </TableHeader>
        }
        {
            isAdmin?.admin === true ?
            isLoading ? <TableBody emptyContent={<Spinners/>}>{[]}</TableBody> : <TableBody emptyContent={"No hay ninguna reserva"}>{[]}</TableBody>
            :
            isLoading ? <TableBody emptyContent={<Spinners/>}>{[]}</TableBody> : <TableBody emptyContent={"No tienes ninguna reserva"}>{[]}</TableBody>
        }
        
        </Table>
    );
}

export default WhitoutReservs