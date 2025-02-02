import axios from 'axios'
import React, { useState } from 'react'

const Home = () => {

    const [prompt, setPrompt] = useState('')
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleForm = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post( import.meta.env.VITE_HUGFACE_API_URL, { inputs: prompt }, {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_HUGFACE_AUTH_TOKEN}`
                },
                responseType: 'blob'
            })
            const resData = await res.data;
            const blob_URL = URL.createObjectURL(resData);
            setImage(blob_URL)
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className='bg-gray-300 h-[100vh]' >
            <div className='w-full fixed' >
                <nav className=" mx-auto my-10 w-11/12 md:w-3/4 max-w-screen-lg px-4 py-2 bg-white shadow-md rounded-md lg:px-8 lg:py-3">
                    <div className="container flex flex-col md:flex-row flex-wrap items-center justify-between mx-auto text-slate-800">
                        <p className="md:mr-4 text-center py-1.5 text-base lg:text-xl text-slate-800 font-semibold">
                            Image Generator
                        </p>

                        <form onSubmit={handleForm} className="items-center lg:flex-none flex-1 lg:w-3/4 gap-x-2 w-full flex">
                            <div className="w-full min-w-[200px]">
                                <div className="relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                    <input required onChange={(e) => { setPrompt(e.target.value) }} type="text" className="w-full pl-10 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Enter your prompt ..." />
                                </div>
                            </div>
                            <button type='submit' className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                Create
                            </button>
                        </form>
                    </div>
                </nav>
            </div>
            <main className=' flex justify-center items-center relative top-40' >
                {
                    loading ? 'Loading...' : ((!loading && image) && <div className=''>
                        <img className='h-96 w-96 rounded-md' src={image} alt="Generated-img" />
                    </div>)
                }
            </main>
        </section>
    )
}

export default Home