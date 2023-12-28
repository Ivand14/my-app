"use client"

import {Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle} from "@nextui-org/react";
import React, { useState } from 'react'

import NextLink from 'next/link'
import {signOut} from 'next-auth/react'

const NavBar = () => {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const[isOut,setIsOut]= useState(false)

    const sessionOut = () =>{
        setIsOut(true)
        localStorage.clear()
    }

    const isAdmin = typeof window !== 'undefined' && localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;



return (
    
    <div className='flex-col'>
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            className="flex flex-col"
        >
        <NavbarContent className="sm:hidden" justify="center">
            <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
            <NavbarBrand>
                <img
                    src='https://i.postimg.cc/Bbg8bzNz/Whats-App-Image-2023-11-30-at-21-48-11.png'
                    width={90}
                    className='p-2'
                    height={90}
                />
            </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden w-full sm:flex gap-4 " justify="start">
            <NavbarBrand>
                    <img
                        src='https://i.postimg.cc/Bbg8bzNz/Whats-App-Image-2023-11-30-at-21-48-11.png'
                        width={90}
                        className='p-2'
                        height={90}
                    />
                </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end" className="hidden w-full sm:flex gap-4 ">
                <NavbarItem >
                    <NextLink color="foreground" href="/dashboard">
                        {isAdmin?.admin === true ? 'Reservaciones': 'Mis Reservas'}
                    </NextLink>
                </NavbarItem>
                <NavbarItem >
                    <NextLink href="/Reserv" aria-current="page">
                    {isAdmin?.admin === true ? 'Clientes': 'Nueva Reserva'}
                    </NextLink>
                </NavbarItem>

            <NavbarItem>
                {!isOut ? 
                    <Button  color="danger" variant='ghost' onClick={()=> {signOut(),sessionOut()}}>
                        Cerrar sesión
                    </Button>
                    :
                    <Button  color="danger" variant='ghost' isLoading>
                        Saliendo
                    </Button>
                }
            </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
            <NavbarItem >
                    <NextLink color="foreground" href="/dashboard">
                        {isAdmin?.admin === true ? 'Reservaciones': 'Mis Reservas'}
                    </NextLink>
            </NavbarItem>
            <NavbarItem >
                    <NextLink href="/Reserv" aria-current="page">
                    {isAdmin?.admin === true ? 'Clientes': 'Nueva Reserva'}
                    </NextLink>
            </NavbarItem>
            <NavbarItem>
                {!isOut ? 
                    <Button  color="danger" variant='ghost' onClick={()=> {signOut(),sessionOut()}}>
                        Cerrar sesión
                    </Button>
                    :
                    <Button  color="danger" variant='ghost' isLoading>
                        Saliendo
                    </Button>
                }
            </NavbarItem>
        </NavbarMenu>
        </Navbar>
    </div>
    );
}




export default NavBar