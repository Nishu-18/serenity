import React from 'react'
import { NavLink } from 'react-router-dom'

function Chatbot() {
    return (
        <div className='font-baloo py-20 px-24'>
            <div className='pb-8 border-b-4 border-neutral-300'>
                <p className='font-bold text-3xl mb-2'>Choose Your Wellness Companion 💬</p>
                <p className='opacity-75 mb-8'>
                    <span className='font-bold'>Navigate your mental wellness journey your way! </span>
                    Select from three tailored chatbot modes designed to guide, support, and uplift you — all at your own pace and preference.</p>
            </div>

            <div className='flex items-center justify-center gap-20 pt-20'>
                <NavLink to='/chatbot/echo' className='h-[280px] w-[280px] rounded-xl border-2 border-neutral-900 hover:scale-105 transition-all duration-300 shadow-lg shadow-black flex flex-col items-center justify-center p-6'>
                    <span className='text-6xl'>😶‍🌫️</span>
                    <span className='text-xl font-bold'>Echo</span>
                    <p className='text-center'>Listens with empathy</p>
                </NavLink>
                <NavLink to='/chatbot/sage' className='h-[280px] w-[280px] rounded-xl border-2 border-neutral-900 hover:scale-105 transition-all duration-300 shadow-lg shadow-black flex flex-col items-center justify-center p-6'>
                    <span className='text-6xl'>🎯</span>
                    <span className='text-xl font-bold'>Sage</span>
                    <p className='text-center'>Provides guidance and resilience tools</p>
                </NavLink>
                <NavLink to='/chatbot/muse' className='h-[280px] w-[280px] rounded-xl border-2 border-neutral-900 hover:scale-105 transition-all duration-300 shadow-lg shadow-black flex flex-col items-center justify-center p-6'>
                    <span className='text-6xl'>🤖</span>
                    <span className='text-xl font-bold'>Muse</span>
                    <p className='text-center'>Adapts to you and evolves</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Chatbot