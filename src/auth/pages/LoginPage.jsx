import React, { useState } from 'react'
import { toast } from 'sonner';

import logo from '../../assets/images/logo.png'
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaFingerprint, FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
//import { loginAction } from '@/services/api';
import { useAuthStore } from '../store/auth.store';


export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [isLogging, setIsLogging] = useState(false)

  const { login } = useAuthStore()

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event) => {

    event.preventDefault();
    setIsLogging(true)

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password')
    //console.log({ email, password });

    // const user = await loginAction({email, password})
    // localStorage.setItem('token', user.token)

    const isLoginValid = await login({ email, password });

    if (isLoginValid) {
      navigate('/')
    } else {
      toast.error('Correo y/o contraseña no válidos')
      setIsLogging(false)

    }


  }

  return (
    <>
      <div className='w-full h-screen flex items-center justify-center bg-[#06001e] '>
        <div className='w-[90%] max-w-sm md:max-w-md lg:max-w-md p-10 bg-[#06001e] flex-col flex items-center  rounded-xl shadow-slate-500 shadow-xl '>
          <img src={logo} alt="logo" className='w-25 md:w-20' />
          <h1 className='text-white text-lg md:text-xl font-semibold p-5'>Iniciar Sesión</h1>

          <form onSubmit={handleLogin}
          className='flex flex-col gap-3'
          >

            <div className='w-full flex flex-col gap-3'>
              <div className='w-full- flex items-center bg-gray-800 p-2 rounded-xl gap-2'>
                <MdOutlineAlternateEmail color='white' />
                <input type="email"
                  placeholder='Correo Electronico'
                  name='email'
                  className='bg-transparent border-0 w-full outline-none text-sm md:text-base text-white' />
              </div>
            </div>

            <div className="w-full flex items-center mt-3 gap-2 bg-gray-800 p-2 rounded-xl relative">
              <FaFingerprint color='white' />
              <input
                type={showPassword ? "password" : "text"}
                placeholder="Password"
                name='password'
                className="bg-transparent border-0 w-full outline-none text-sm md:text-base text-white"
              />
              {showPassword ? (
                <FaRegEyeSlash color='white'
                  className="absolute right-5 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FaRegEye color='white'
                  className="absolute right-5 cursor-pointer "
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>


            <button
              type='submit'
              className='w-full p-2 bg-blue-500 rounded-xl mt-3 hover:text-white text-sm'
              disabled={isLogging}
            >
              Login
            </button>

          </form>



          <div className='relative w-full flex items-center justify-center py-3'>
            <div className='w-2/3 h-[2px] bg-gray-400'>  </div>
            <h3 className='text-xs md:text-sm px-5 text-gray-400'>Or</h3>
            <div className='w-2/3 h-[2px] bg-gray-400'>  </div>
          </div>


          <div className='p-3 mt-3 md:px-6 lg:px-10  cursor-pointer rounded-xl bg-gray-800 '>
            <FaGoogle color='white' />
          </div>

          <p className=' text-xs text-gray-400 mt-3 '>
            No tienes una cuenta? <a href="/auth/register" className='text-gray-400 hover:text-white'>Regístrate</a>
          </p>

        </div>
      </div >
    </>
  )
}
