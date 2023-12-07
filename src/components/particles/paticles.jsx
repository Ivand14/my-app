"use client"
import { useCallback } from 'react';
import { Particles } from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { particlesOptions } from './particlesConfig';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

const ParticlesComponent = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async () => {}, []);

    const router = useRouter()


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
            <Button variant='shadow' onClick={()=>router.push('/auth/login')}>Iniciar sesión</Button>
            <Button variant='shadow' onClick={()=>router.push('/auth/register')}>Registrarse</Button>
        </div>
        </div>
    );
};

export default ParticlesComponent;

