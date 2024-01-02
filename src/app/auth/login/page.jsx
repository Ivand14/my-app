"use client"

import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import {Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import NextLink from 'next/link'
import axios from 'axios';
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { useRouter } from "next/navigation";

const Login = () => {

  const{formState:{errors},register,handleSubmit} = useForm()

  const router = useRouter()
  const[error,setError] = useState(null)
  const[isSingIn,setIsSingIn] = useState(false)
  const [userData,setUserData] = useState(null)

  const onSubmit = handleSubmit(async (data) => {

    
    const response = await signIn('credentials',{
      email:data.email,
      password:data.password,
      redirect:false
    })

    console.log(signIn)

    if(response.status === 200){
      router.push('/dashboard')
      setIsSingIn(true)
    }
    
    if(response.error){
      setError(response.error)
      toast.error(response.error)
    }


    const responseUser = await axios.get(`/api/userData/${data.email}`);

    console.log(responseUser)

    setUserData(responseUser.data)
    
  })
  

  useEffect(() => {
    if (userData) {
      localStorage.setItem('userInfo', JSON.stringify(userData));
    }
  }, [userData]);


  return (
    <div className="flex  items-center justify-center  h-screen w-screen">

      <form onSubmit={onSubmit} className=" mt-20  w-1/4 ">

        {error && (
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        )}

        <div className="flex flex-col items-center mb-2 w-full">
            <img
                src='https://i.postimg.cc/Bbg8bzNz/Whats-App-Image-2023-11-30-at-21-48-11.png'
                width={100}
                height={100}
            />
                    
            <h3 className="text-white text-center mb-2">BIENVENIDO A LUQUIANDO BARBER</h3>
        </div>

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

          {
            !isSingIn ? 
              <Button color="primary" variant="shadow" type='submit' className="w-full">
              Iniciar Sesión
              </Button>
              :
              <Button color="primary" variant="shadow" className="w-full" isLoading>Cargando</Button> 
          }
          <h3 className='mt-2 p-2 text-white'>No tenes una cuenta? <NextLink href={'/auth/register'} className='underline'>Registrate</NextLink></h3>
      </form>
    </div>
  )
}

export default Login