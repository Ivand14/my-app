"use client"

import 'react-toastify/dist/ReactToastify.css';

import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import {Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { useRouter } from "next/navigation";

const Login = () => {

  const{formState:{errors},register,handleSubmit} = useForm()

  const router = useRouter()
  const[error,setError] = useState(null)

  const onSubmit = handleSubmit(async (data) => {
    
    const response = await signIn('credentials',{
      email:data.email,
      password:data.password,
      redirect:false
    })

    if(response.ok){
      router.push('/dashboard')
    }
    
    if(response.error){
      setError(response.error)
      toast.error(response.error)
    }
    
  })

  return (
    <div className="flex  items-center justify-center bg-slate-950 h-screen w-screen">

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

          <p className="text-white font-5xl text-center mb-2">BIENVENIDO A LUQUIANDO BARBER</p>

          <Input type="email" label="Email" placeholder="Ingresa tu email" 
              {...register("email",
              {required:
              {value:true,
              message:'Email requerido'}
              })}
              className='mb-2'
          />
          {errors.email && (
              <span className="text-red-500 p-1 mb-2 text-sm">{errors.email.message}</span>
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
              <span className="text-red-500 p-1 mb-2 text-sm">{errors.password.message}</span>
          )}

          <Button color="primary" variant="shadow" type='submit' className="w-full">
            Login
          </Button>  
      </form>
    </div>
  )
}

export default Login