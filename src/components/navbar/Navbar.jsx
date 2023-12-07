"use client"

import {Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle} from "@nextui-org/react";

import NextLink from 'next/link'
import React from 'react'
import {signOut} from 'next-auth/react'

const NavBar = () => {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const sessionOut = () =>{
        if (typeof window !== 'undefined') {
            sessionStorage.removeItem('userInfo')
        }
    }

    const menuItems = [
        'Mis reservas',
        'Nueva Reserva'
    ];

return (
    
    <div>
        <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
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
                        Mis Reservas
                    </NextLink>
                </NavbarItem>
                <NavbarItem >
                    <NextLink href="/Reserv" aria-current="page">
                        Nueva Reserva
                    </NextLink>
                </NavbarItem>
                <NavbarItem>
                <NextLink color="foreground" href="#">
                    Nosotros
                </NextLink>
            </NavbarItem>
            <NavbarItem>
            <Button  color="danger" variant='ghost' onClick={()=> {signOut(),sessionOut()}}>
                Sign out
            </Button>
            </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
            {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                className="w-full"
                color={
                    index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                }
                href="#"
                size="lg"
                >
                {item}
                </Link>
            </NavbarMenuItem>
            ))}
        </NavbarMenu>
        </Navbar>
    </div>
    );
}




export default NavBar