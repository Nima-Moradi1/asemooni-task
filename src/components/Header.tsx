/* eslint-disable @next/next/no-img-element */
'use client'
import Link from "next/link"
import ThemeToggle from "./ui/ThemeToggle"
import React from "react"
import {useUserStore } from "../store/authStore"
import Dropdown from "./Dropdown"

const Header = () => {
    
const user = useUserStore((state) => state.user)
const userData = user ? user : null
 const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
    return (
        <>
        <header className={`"opacity-100 blur-0" } bg-inherit mb-10 sticky top-0 transition-all duration-300 backdrop-blur-xl max-w-screen-xl mx-auto`}>
            <nav>
                <ul className="flex items-center p-2 justify-between container xl:max-w-screen-xl">
                    <li>
                      
                        <>
                         <div className="w-32">
                          <Link href='/'>
                        <img alt="logo" src="/logo.png" className="rounded-xl object-cover w-16"/>
                        </Link>  
                        </div>
                        </>
                        
                    </li>
                    
                    {userData ? <div className="flex gap-5 items-center">
                        <li><ThemeToggle/></li>
                    <li><Dropdown user={user}/></li>
                    </div> 
                    : <>
                    <div className="flex gap-x-5">
                    <li>
                        <Link className="block py-2" href='/auth/login'>ورود</Link>
                    </li>
                    {/* <li>
                        <Button variant='destructive' onClick={logoutHandler}
                        >خروج</Button>
                    </li> */}
                    <li><ThemeToggle/></li>
                    </div>
                    
                    </>
                    }
                    
                </ul>
            </nav>
        </header>
        </>
    )
}

export default Header