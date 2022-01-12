import React,{useState,useEffect} from 'react'
import { useNavigate,Link } from "react-router-dom"


export default function Header({user,logout}) {
    const [ showAuth , setShowAuth ] = useState(false);
    const navigate = useNavigate()
    const navigateToLogin = () => {
        navigate("/login")
    }
    useEffect(function () {
        if( user?.email ){
            setShowAuth("Logout")
        }else{
            setShowAuth("Login")
        }

    }, [user] )
    // console.log("adslkjfha",user?.email)

    return (
        <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
            <button className="mr-5 hover:text-gray-900" >Thanks Giving </button>
            {
                (showAuth && 
                    <button className="mr-5 hover:text-gray-900" onClick={(showAuth==="Logout")?logout:navigateToLogin}>{showAuth} </button>
                    )
            }

            </nav>
            <Link to="#" className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
                <span className="ml-3 text-xl">Unsung Beats</span>
            </Link>
            <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
            <button className="inline-flex items-center bg-rose-400 text-white border-0 py-1 px-3 focus:outline-none hover:bg-rose-500 rounded text-base mt-4 md:mt-0">Donate
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
            </button>
            </div>
        </div>
        </header>
    )
}
