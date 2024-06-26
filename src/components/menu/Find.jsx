import React from 'react'
import find from '../img/find.png'

function Find() {
    return (
        <div className="loading-overlay absolute inset-0 bg-slate-50 bg-opacity-80 flex items-center justify-center z-1 ">
            <div className='flex w-full h-full  justify-center items-center'>
                <div className='bg-white w-[677px] h-[363px] drop-shadow-[16px_16px_0_rgba(0,0,0,0.4)] rounded-[24px] animate-scaleIn p-10'>
                    <div className='flex w-full justify-center'>
                        <input type="text" className='border border-black rounded-[50px] w-[70%]' />
                        <img src={find} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Find