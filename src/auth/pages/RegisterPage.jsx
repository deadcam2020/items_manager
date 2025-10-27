import React, { useState } from 'react'
import logo from '../../assets/images/logo.png'
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaFingerprint, FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { toast } from "sonner"


import { useNavigate } from 'react-router-dom';
import { signUpAction } from '@/services/auth';

export const RegisterPage = () => {

  const [idLogging, setIsLogging] = useState(false);
  const navigate = useNavigate()



  const [showPassword, setShowPassword] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (event) => {

    event.preventDefault();
    setIsLogging(true)

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password')


    try {
      const user = await signUpAction({ name, email, password })
      //console.log(user);
      navigate('/login')
      toast.info('Cuenta creada. Por favor inicie sesión')

    } catch (error) {
      toast.error('Ingrese valores válidos por favor')
    }
    setIsLogging(false)

  }

  //   const session = await signInAccount(user);

  //   if (!session) {
  //     return toast({ title: 'Error al iniciar sesion', })
  //   }

  //   const isLoggedIn = await checkAuthUser();

  //   if (isLoggedIn) {

  //     navigate('/home')
  //   } else {
  //     return toast('Error al iniciar sesion')
  //   }
  // };



  return (
    <>
      <div className='w-full h-screen flex items-center justify-center bg-[#06001e]'>
        <div className='w-full max-w-sm md:max-w-md lg:max-w-md p-5 bg-[#06001e] flex-col flex items-center gap-3 rounded-xl shadow-slate-500 shadow-xl'>
          <img src={logo} alt="logo" className='w-25 md:w-20' />
          <h1 className='text-white text-lg md:text-xl font-semibold p-5'>Regístrate</h1>

          <form onSubmit={handleSignup} className="flex flex-col gap-3 w-[90%] mt-3">
            <div className='w-full flex flex-col gap-3'>
              <div className='w-full flex items-center bg-gray-800 p-2 rounded-xl gap-2'>
                <CiUser color='white' />
                <input
                  type="text"
                  name='name'
                  placeholder='Nombre'
                  // <-- Agregado
                  className='bg-transparent border-0 w-full outline-none text-sm md:text-base text-white'
                  required
                />
              </div>
            </div>


            {/* <div className='w-full flex flex-col gap-3 mt-3'>
              <div className='w-full flex items-center bg-gray-800 p-2 rounded-xl gap-2'>
                <PiIdentificationCard  color='white' />
                <input
                  type="text"
                  name='document'
                  placeholder='Número de Documento'
                  value={user.document} // <-- Agregado
                  onChange={handleChange} // <-- Agregado
                  className='bg-transparent border-0 w-full outline-none text-sm md:text-base text-white'
                  required
                />
              </div>
            </div> */}

            <div className='w-full flex flex-col gap-3 mt-3'>
              <div className='w-full flex items-center bg-gray-800 p-2 rounded-xl gap-2'>
                <MdOutlineAlternateEmail color='white' />
                <input
                  type="email"
                  name='email'
                  placeholder='Correo Electrónico'
                  // <-- Agregado
                  className='bg-transparent border-0 w-full outline-none text-sm md:text-base text-white'
                  required
                />
              </div>
            </div>

            <div className="w-full flex items-center mt-3 gap-2 bg-gray-800 p-2 rounded-xl relative">
              <FaFingerprint color='white' />
              <input
                type={showPassword ? "text" : "password"} // <-- Corregido, antes estaba al revés
                placeholder="Contraseña"
                name='password'
                // <-- Agregado
                className="bg-transparent border-0 w-full outline-none text-sm md:text-base text-white"
                required
              />
              {showPassword ? (
                <FaRegEyeSlash
                  color='white'
                  className="absolute right-5 cursor-pointer"
                  onClick={togglePasswordVisibility} />
              ) : (
                <FaRegEye
                  color='white'
                  className="absolute right-5 cursor-pointer"
                  onClick={togglePasswordVisibility} />
              )}
            </div>


            <button type='submit' className='w-full p-2 bg-blue-500 rounded-xl mt-3 hover:text-white text-sm'>
              Crear cuenta
            </button>
          </form>

          <div className='relative w-full flex items-center justify-center py-3'>
            <div className='w-2/3 h-[2px] bg-gray-400'></div>
            <h3 className='text-xs md:text-sm px-5 text-gray-400'>O</h3>
            <div className='w-2/3 h-[2px] bg-gray-400'></div>
          </div>

          <div className='p-3 mt-3 md:px-6 lg:px-10 cursor-pointer rounded-xl bg-gray-800'>
            <FaGoogle color='white' />
          </div>
        </div>
      </div>
    </>
  );
}
