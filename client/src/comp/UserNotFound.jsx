import React from 'react'
import SVG404 from '../images/404.svg'


export default function UserNotFound() {
    return (
        <div className="flex flex-col mb-10 justify-center align-center items-center" >
            <img src={SVG404} alt="User Not Found"/>
            <div className="p-5 bg-red-200" > User Not Found Please Login First</div>
        </div>
    )
}
