import React from 'react'

import error from '../img/error.png'
function Error() {
    const reload = () => {
        window.location.reload()
    }
    return (
        <div className='border bg-white h-[550px] w-[484px] rounded-[24px] drop-shadow-[16px_16px_0_rgba(0,0,0,0.4)]'>
            <div className='w-full h-full p-[30px] flex justify-center '>
                <div className='h-full  m-3 '>
                    <img src={error} alt="" className='w-[240px] h-[240px]' />
                    <div className='flex w-full h-full justify-center  mt-[150px]'>
                        <button onClick={reload} className='bg-[#75C381] w-[200px] h-[91px] rounded-[24px] text-[40px] '>ตกลง</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error