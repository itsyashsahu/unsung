import React from 'react'


export default function Signup({register,setRegisterPassword, setRegisterEmail,err,setErr}) {

    return (
        <div>
            <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 lg:px-16 mx-auto flex flex-wrap items-center">
                <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                <h1 className="title-font font-medium text-3xl text-gray-900">We are a group of enthusiasts</h1>
                <p className="leading-relaxed mt-4">who are passionate about sports, fitness , nutrition and promoting a healthy lifestyle. We promote the idea of being happy and fit through our social media handles</p>
                </div>
                <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
                <div className="relative mb-4">
                    <label className="leading-7 text-sm text-gray-600">Email</label>
                    <input type="email" 
                        name="email" 
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        onChange={(event) => {
                            setRegisterEmail(event.target.value);
                            setErr(false);
                          }}
                    />
                </div>
                <div className="relative mb-4">
                    <label className="leading-7 text-sm text-gray-600">Password</label>
                    <input type="password" 
                        name="password" 
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        onChange={(event) => {
                            setRegisterPassword(event.target.value);
                            setErr(false);
                        }}
                    />
                </div>
                <button onClick={register} className="text-white bg-rose-400 border-0 py-2 px-8 focus:outline-none hover:bg-rose-500 rounded text-lg">Signup</button>
                    {
                        ( err && 
                            <p className="text-xs bg-red-400 p-3 rounded text-white mt-3">
                                {err}
                            </p>
                            )
                    }

                </div>
            </div>
            </section>
        </div>
    )
}
