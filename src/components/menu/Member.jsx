import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Error from '../error/Error'
import Success from '../success/Success'

function Member({ closemember }) {
    const [uuid_user, setuuid_user] = useState('')
    const [phonenum, setNumber] = useState("")
    const [membernum, setmembernum] = useState(false)
    const [addpoint , setaddpoint ]= useState(false)
    const [error, set_Error] = useState(false)
    const [issuccess, set] = useState(false)
    const [user, setuser] = useState([])
    const [exchangerate, setexchangerate] = useState('')
    const [resultrate, setresultrate] = useState('0')

    const handlelogin = async () => {
        try {
            const result = await axios.post('http://localhost:3003/users/api/v1/check_user', { phonenum })
            if (result.data) {
                setmembernum(true)
                setaddpoint(true)
                fechPoint(result.data[0].uuid)
                setuuid_user(result.data[0].uuid)
                fechexchage()
            } else {
                setmembernum(!membernum)
                set_Error(true)
            }
        } catch (error) {
            setmembernum(!membernum)
            set_Error(true)
            console.error('login feild', error.message);
        }
    }

    const fechexchage = () => {
        axios.get('http://localhost:3003/exchange/api/v1/get_exchange').then((data) => {
            setexchangerate(data.data[0].price / data.data[0].rate)
        }).catch(() => {
            console.error('feched exchange feild', error.message);
        })
    }

    const fechPoint = async (uuid) => {
        try {
            const result = await axios.post('http://localhost:3003/users/api/v1/get_userpoint', { uuid })
            setuser(result.data[0])
        } catch (error) {
            console.error('feched point user feild', error.message);
        }
    }

    const handlesetpoint = (e) => {
        setresultrate(e.target.value / exchangerate)
    }

    const updateuserpoint = async () => {
        const data = {
            uuid_user: uuid_user,
            point: resultrate
        }

        if (resultrate > 0) {
            try {
                const result = await axios.post('http://localhost:3003/point/api/v1/create_point', { data })
                set(true)
                setaddpoint(false)
            } catch (error) {
                console.error('update point user feild', error.message);
            }
        } else {
            console.log('error')
        }

    }

    return (
        <div className="loading-overlay absolute inset-0 bg-slate-50 bg-opacity-80 flex items-center justify-center z-1 ">
            <div className='flex w-full h-full  justify-center items-center'>
                {error && <Error />}
                {issuccess && <Success />}
                {!membernum && <div className='bg-white w-[594px] h-[400px] drop-shadow-[16px_16px_0_rgba(0,0,0,0.4)] rounded-[24px] animate-scaleIn'>
                    <div className='h-full w-full flex justify-center p-[20px]'>
                        <div className='h-full w-[90%] text-center pt-[40px]'>
                            <p className='text-[40px]'>กรุณากรอกเบอร์โทร</p>
                            <div>
                                <input onChange={(e) => setNumber(e.target.value)} placeholder='exp:065-xxx-xxx' type="number" pattern="[0-9]*" className='pl-[20px] border border-black rounded-[50px] w-[90%] h-[80px] outline-none  mt-[50px] text-[30px]' />
                            </div>
                            <div className='flex justify-center mt-[50px]'>
                                <button onClick={closemember} className='bg-[#FF9292] hover:bg-[#f45353] w-[173px] h-[71px] text-[40px] rounded-[24px] mr-[12px]'>ยกเลิก</button>
                                <button onClick={handlelogin} className='bg-[#75C381] w-[173px] h-[71px] rounded-[24px] text-[40px] '>ตกลง</button>
                            </div>
                        </div>
                    </div>
                </div>}
                {addpoint && <div className='bg-white w-[594px] h-[700px] rounded-[24px] drop-shadow-[16px_16px_0_rgba(0,0,0,0.4)]'>
                    <div className='h-full w-full p-10'>
                        <div className='flex justify-center w-full h-full'>
                            <div className='flex justify-center items-center w-full h-[100%]'>
                                <div className='text-center h-full w-full mt-[100px]'>
                                    <div>
                                        <div className='text-[35px]'>
                                            <p>คุณ {user.fullname}</p>
                                        </div>
                                        <div className='flex justify-center w-full items-center'>
                                            <p className='text-[40px] mr-[35px]'>สะสม</p>
                                            <p className='text-[120px] text-[#FFB259]'>{parseInt(user.point) + parseInt(resultrate)}</p>
                                            <p className='text-[40px] ml-[35px]'>พอยท์</p>
                                        </div>
                                        <div className='flex w-full justify-center'>
                                            <hr className='w-[100%] bg-black' />
                                        </div>
                                    </div>
                                    <div className='mt-[40px] h-[50%]'>
                                        <p className='text-[40px]'>กรุณากรอกราคาสินค้าทั้งหมด</p>
                                        <div className='flex justify-center items-center mt-[40px]'>
                                            <input onChange={handlesetpoint} type="number" placeholder='ราคาสินค้า' className='border border-black  rounded-[50px] text-[30px] outline-none pl-[20px]  h-[80px] w-[204px] ml-[25px]' />
                                            <p className='text-[60px] ml-[10px] mr-[10px]'>=</p>
                                            <input type="number" value={resultrate} placeholder='พอยท์' className='border border-black rounded-[50px] text-[30px] outline-none pl-[20px]   h-[80px] w-[204px] mr-[25px]' />
                                        </div>
                                        <div className='flex justify-center mt-[50px]'>
                                            <button onClick={closemember} className='bg-[#FF9292] hover:bg-[#f45353] w-[173px] h-[71px] text-[40px] rounded-[24px] mr-[12px]'>ยกเลิก</button>
                                            <button onClick={updateuserpoint} className='bg-[#75C381] w-[173px] h-[71px] rounded-[24px] text-[40px] '>ตกลง</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Member