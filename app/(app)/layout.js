
import 'normalize.css/normalize.css'
import '@/styles/globals.css'
import NavBarLayOut from '../components/NavBarLayout'
import { SessionProvider } from 'next-auth/react'
import Providers from '@/store/provider'

import ToastProvider from '@/app/components/providers/ToastProvider'
import { Suspense } from 'react'
import Loading from './loading'

export default function RootLayout({ children }) {

    return (
       <html lang="en">
         
         <head>
           <link rel="preconnect" href="https://fonts.googleapis.com" />
             <link
               rel="preconnect"
               href="https://fonts.gstatic.com"
               crossOrigin="anonymous"
             />
             <link
               rel="stylesheet"
               href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lexend:wght@400;500&display=swap"
             />
         </head>
         <Providers>
          <>
            <body suppressHydrationWarning={true} >
              <ToastProvider/>
            <SessionProvider>
              <NavBarLayOut>
                <Suspense fallback={<Loading></Loading>} >
                  {children}
                </Suspense>
                
              </NavBarLayOut>
            </SessionProvider>
            
            </body>
          </>
          </Providers>
       
         
       </html>
     )
   }