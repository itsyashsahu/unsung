import React from 'react'
import {    Link } from "react-router-dom"

import ThanksSVG from "../images/thankyou.svg"

export default function ThanksGiving() {
    return (
        <section class="text-gray-600 body-font">
        <div class="container mx-auto flex px-5 py-16 md:flex-row flex-col items-center">
            <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                <img src={ThanksSVG} alt="Thank You For Your Support" class="object-cover object-center rounded"  />
                {/* <img class="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600"/> */}
            </div>
            <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Thank You For Your 
                <br class="hidden lg:inline-block mb-3 "/><p className="text-rose-400" >Love & Support</p>
            </h1>
            <p class="mb-4 leading-relaxed">
                We are working towards providing a platform to the undiscovered talent in the field of sports and fitness all over India. We unveil inspirational and powerful stories of individuals who have done wonders in these fields after overcoming innumerable struggles. 
                <br class="hidden lg:inline-block"/>
                We support, motivate and are trying to help grow the talent in our nation.
                <br class="hidden lg:inline-block "/>
                Help us to keep helping others.
            </p>
            <div class="flex justify-center">
            <Link to="/dashboard">
                <button className="ml-0 inline-flex items-center bg-rose-400 text-white border-0 py-2 px-6 focus:outline-none hover:bg-rose-500 rounded text-xl mt-4 md:mt-0">Donate
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </button>
            </Link>
            </div>
            </div>
        </div>
        </section>
    )
}
