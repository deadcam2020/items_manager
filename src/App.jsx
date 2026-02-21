import React from 'react'
import { Toaster } from "@/components/ui/sonner"

//import { AppRouter } from './router/AppRouter'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { useAuthStore } from './auth/store/auth.store.js'
import { CustomFullScreenLoading } from './auth/components/custom/CustomsFullScreenLoading'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './router/app.router'

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }) => {
  const { checkAuthStatus } = useAuthStore()

  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthStatus, 
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,
    refetchOnWindowFocus: false
  })

  if (isLoading) return <CustomFullScreenLoading/>

  return children
}

export const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <Toaster />

        <CheckAuthProvider>
          <RouterProvider router={appRouter} />
        </CheckAuthProvider>

      </QueryClientProvider>
    </GoogleOAuthProvider>
  )
}
