"use client"

import {Button} from "@nextui-org/react";
import React from 'react'
import {signOut} from 'next-auth/react'

const Dashboard = () => {
    return (
        <div>
            Dashboard
            <Button color="danger" variant="bordered"  onClick={()=> signOut()}>
            SingOut
            </Button>
        </div>
        
    )
}

export default Dashboard