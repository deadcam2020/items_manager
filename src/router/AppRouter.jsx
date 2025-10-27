import { Routes, Route } from 'react-router-dom'


import { LoginPage } from '@/auth/pages/LoginPage'
import { ProfilePage } from '@/auth/pages/ProfilePage'
import { ProfileUpdatePage } from '@/auth/pages/ProfileUpdatePage'
import { RegisterPage } from '@/auth/pages/RegisterPage'
import { UploadPage } from '@/auth/pages/UploadPage'
import { HomePage } from '@/items/pages/HomePage'

import React from 'react'

export const AppRouter = () => {
  return (
    <>

      <Routes>

        {/* rutas públicas */}
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />


        {/* rutas para usuarios autenticados */}

        <Route
          path='/upload'
          element={<UploadPage />}
        />


        <Route
          path='/profile'
          element={<ProfilePage />}
        />

        <Route
          path='/profile/update'
          element={<ProfileUpdatePage />}
        />


        {/* rutas para admin */}

        <Route
          path='/admin'
          element={<ProfilePage />}
        />



      </Routes>

    </>
  )
}
