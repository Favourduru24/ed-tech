import Header from "@/components/shared/Header"
import Sidebar from "@/components/shared/Sidebar"
import PersistLogin from "@/features/auth/PersistLogin"
import Prefetch from "@/features/auth/Prefetch"

const RootLayout = ({children}) => {
     return (
         <main className="flex min-h-screen w-full flex-col bg-[#060606] lg:flex-row">
              <Sidebar/>
             <div className="  flex-1 overflow-auto lg:mt-0 lg:max-h-screen">
                 <div className="w-full max-w-6xl mx-auto">
                 {/* <PersistLogin> */}
                    {/* <Prefetch> */}
                    <Header/>
                    <div className="max-w-7xl mx-auto px-10 md:px-10 w-full text-dark-400">
                    {children}

                    </div>
                    {/* </Prefetch> */}
               {/* </PersistLogin> */}
                 </div>
             </div>
         </main>
     )
}

export default RootLayout