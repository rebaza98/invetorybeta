
import 'normalize.css/normalize.css'
import '@/styles/globals.css'
import NavBarLayOut from '@/app/components/NavBarLayout'
// import SNavigationBarLayout from '@/app/components/SNavigationBarLayout'
// import ToastProvider from '@/app/components/providers/ToastProvider'
// import Providers from '@/store/provider'


export default function RootLayout({ children }) {

    return (
       <html lang="en" className="h-full bg-gray-100" >
         
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
          <>
            <body className="h-full" suppressHydrationWarning={true} >
              {/* <ToastProvider /> */}
                {children}
            </body>
          </>
         
        
         
       </html>
     )
   }