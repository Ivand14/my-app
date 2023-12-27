"use client"

import { useCallback, useState } from 'react';

import { Button } from '@nextui-org/react';
import { Particles } from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { particlesOptions } from './particlesConfig';
import { useRouter } from 'next/navigation';

const ParticlesComponent = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async () => {}, []);

    const router = useRouter()

    const[isLogin,setIsLogin] = useState(false)
    const[isRegister,setIsRegister]= useState(false)

    const login = () =>{
        setIsLogin(true)
        router.push('/auth/login')
    }

    const register = () =>{
        setIsRegister(true)
        router.push('/auth/register')
    }


    

    return (
        <div className='relative w-full h-screen flex justify-center items-center'>
        <Particles
            id='tsparticles'
            init={particlesInit}
            loaded={particlesLoaded}
            options={particlesOptions}
            className='absolute inset-0'
        />
        <div className='mt-80 z-10 flex gap-5'>
            {
                !isLogin ? 
                    <Button variant='shadow' onClick={login}>Iniciar sesión</Button>
                :
                    <Button variant='shadow' isLoading>Cargando</Button>
            }
            {
                !isRegister ? 
                    <Button variant='shadow' onClick={register}>Registrarse</Button>
                :
                    <Button variant='shadow' isLoading>Cargando</Button>
            }
        </div>
        </div>
    );
};

export default ParticlesComponent;

