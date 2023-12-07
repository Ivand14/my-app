"use client"

import {Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useRouter } from "next/navigation";

const registerPage = () => {

    const{register,handleSubmit,formState:{errors}} = useForm()

    const router = useRouter()
    
    const onSubmit = handleSubmit(async(data)=>{

        if(data.password !== data.confirmPassword){
            return alert('Las contraseñas no coinciden')
        }

        const info = {
            email: data.email,
            name:data.name,
            password:data.password
        }

        const response = await axios.post('/api/auth/register',info)
        const ResponseData =  response.data

        console.log(response)

        if(response.statusText === 'OK'){
            router.push('/auth/login')
        }

    })


    return (
        <div className="flex  items-center justify-center  h-screen w-screen">
            
            <form onSubmit={onSubmit} className=" mt-15  w-1/4 ">
                
                <div className="flex flex-col items-center mb-2 w-full">
                    <img
                        src='https://i.postimg.cc/Bbg8bzNz/Whats-App-Image-2023-11-30-at-21-48-11.png'
                        width={100}
                        height={100}
                    />
                    
                    <h3 className="text-white text-center mb-2">BIENVENIDO A LUQUIANDO BARBER</h3>
                </div>
                
                {errors.email && (
                    <span className="text-red-500 p-1 mb-5 text-sm">{errors.name.message}</span>
                )}
                <Input type="name" label="Nombre" placeholder="Ingresa tu Nombre" 
                    {...register("name",
                    {required:
                    {value:true,
                    message:'Nombre requerido'}
                    })}
                    className='mb-2'
                />
                
                {errors.email && (
                    <span className="text-red-500 p-1 mb-2 text-sm">{errors.email.message}</span>
                )}
                <Input type="email" label="Email" placeholder="Ingresa tu email" 
                    {...register("email",
                    {required:
                    {value:true,
                    message:'Email requerido'}
                    })}
                    className='mb-2'
                />
                
                {errors.email && (
                    <span className="text-red-500 p-1 mb-2 text-sm">{errors.password.message}</span>
                )}
                <Input type="password" label="Password" placeholder="Ingresa tu Password" 
                    {...register("password",
                    {required:
                    {value:true,
                    message:'Contraseña requerida'}
                    })} 
                    className='mb-2'
                />
                
                {errors.email && (
                    <span className="text-sm text-red-500 p-1 mb-2">{errors.confirmPassword.message}</span>
                )}
                <Input type="password" label="Confirmar password" placeholder="Confirma tu contraseña" 
                    {...register("confirmPassword",
                    {required:
                    {value:true,
                    message:'Confirmacion requerida'}
                    })} 
                    className='mb-2'
                />
                
                <Button color="primary" variant="shadow" type='submit' className="w-full">
                    Registrarse
                </Button>  
            </form>
        </div>
    )
}

export default registerPage