import React from 'react'
import { useState } from 'react'
import find from '../img/find.png'
import Error from '../error/Error'
import axios from 'axios'

function Find({ closefind }) {
    const [phonenum, setphonenum] = useState("")
    const [user, setuser] = useState([])

    const [errors, set_errors] = useState(false)
    const [showfind, set_showfind] = useState(false)
    const [showdata, setshowdata] = useState(false)
    const [showpoint, setshowpoint] = useState(false)

    const handlelogin = async () => {
        try {
            const result = await axios.post('https://member-apis.vercel.app/users/api/v1/check_user', { phonenum })
            if (result.data) {
                console.log(result.data)
                fechPoint(result.data[0].uuid)
                setshowdata(true)
                set_errors(false)
                set_showfind(true)
            }
        } catch (error) {
            set_errors(true)
            set_showfind(true)
            console.log('login feild', error.response.data.error);
        }
    }
    const fechPoint = async (uuid) => {
        try {
            const result = await axios.post('https://member-apis.vercel.app/users/api/v1/get_userpoint', { uuid })
            setuser(result.data[0])
        } catch (error) {
            console.error('feched point user feild', error.message);
        }
    }

    const openpoint = () => {
        setshowpoint(true)
        setshowdata(false)
        set_showfind(true)
    }

    const reload = () => {
        window.location.reload()
    }
    return (
        <div className="loading-overlay absolute inset-0 bg-slate-50 bg-opacity-80 flex items-center justify-center z-1 ">
            {errors && <Error message={"ไม่ได้เป็นสมาชิก"}  />}
            {!showfind && <div className='flex w-full h-full  justify-center items-center'>
                <div className='bg-white w-[720px] h-[263px] drop-shadow-[16px_16px_0_rgba(0,0,0,0.4)] rounded-[24px] animate-scaleIn p-10 '>
                    <p className='text-center text-[35px] mt-[10px]'>กรุณากรอกเบอร์โทรสมาชิกสำหรับการค้นหา</p>
                    <div className='flex w-[100%]  h-[70%] items-center justify-center'>
                        <input onChange={(e) => setphonenum(e.target.value)} type="number" className='border border-black rounded-[50px] w-[505px] h-[80px] text-[30px] pl-[20px] outline-none' placeholder='exp:065-xxx-xxx' />
                        <img onClick={handlelogin} src={find} alt="" className='w-[67px] h-[61px] m-5' />
                    </div>
                    <div className='flex justify-center mt-[50px]'>
                        <button onClick={closefind} className='bg-[#FF9292] hover:bg-[#f45353] w-[173px] h-[71px] text-[40px] rounded-[24px] mr-[12px]'>ยกเลิก</button>
                    </div>
                </div>
            </div>}
            {showdata && <div className='flex w-full h-full  justify-center items-center'>
                <div className='bg-white w-[720px] h-[1071px] drop-shadow-[16px_16px_0_rgba(0,0,0,0.4)] rounded-[24px] animate-scaleIn p-10 '>
                    <div className='h-full w-full '>
                        <div className='h-[50%] w-full'>
                            <p className='text-center text-[35px] mt-[10px] mb-[50px]'>กรุณากรอกเบอร์โทรสมาชิกสำหรับการค้นหา</p>
                            <div className='flex w-[100%]  h-[30%] items-center justify-center mb-[50px]'>
                                <input onChange={(e) => setphonenum(e.target.value)} type="number" className='border border-black rounded-[50px] w-[505px] h-[80px] text-[30px] pl-[20px] outline-none' placeholder='exp:065-xxx-xxx' />
                                <img onClick={handlelogin} src={find} alt="" className='w-[67px] h-[61px] m-5' />
                            </div>
                            <p className='text-[30px]'>ผลการค้นหา</p>
                            <div className='flex w-full justify-center mt-[30px]'>
                                <hr className='w-[100%] bg-black' />
                            </div>
                            <div className='h-[50%]'>
                                <div>
                                    {user ? (
                                        <>
                                            <div className='text-[35px] text-center mt-[100px]'>
                                                <p>คุณ {user.fullname}</p>
                                                <p>เบอร์โทร {user.phonenum}</p>
                                            </div>
                                            <div className='flex justify-center w-full items-center'>
                                                <p className='text-[40px] mr-[35px]'>สะสม</p>
                                                <p className='text-[120px] text-[#FFB259]'>{user.point}</p>
                                                <p className='text-[40px] ml-[35px]'>พอยท์</p>
                                            </div>
                                            <div className='flex w-full justify-center'>
                                                <hr className='w-[100%] bg-black' />
                                            </div>
                                            <div className='flex justify-center mt-[50px]'>
                                            <button onClick={reload} className='bg-[#FF9292] w-[333px] h-[90px] rounded-[24px] text-[45px] mr-[15px] '>ยกเลิก</button>
                                                <button onClick={openpoint} className='bg-[#75C381] w-[333px] h-[90px] rounded-[24px] text-[45px] '>แลกพอยท์</button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className='h-[50%] w-full mt-[180px] ' >
                                            <div className='flex justify-center items-center h-full w-full'>
                                                <div className=''>
                                                    <p className='w-full text-center text-[45px]'>ไม่มีพอยน์สะสม</p>
                                                </div>
                                            </div>
                                            <div className='flex justify-center mt-[150px] '>
                                                <button onClick={reload} className='bg-[#FF9292] hover:bg-[#f45353] w-[173px] h-[71px] text-[40px] rounded-[24px] mr-[12px]'>ยกเลิก</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            {showpoint && <div className='flex w-full h-full  justify-center items-center'>
                <div className='bg-white w-[720px] h-[1071px] drop-shadow-[16px_16px_0_rgba(0,0,0,0.4)] rounded-[24px] animate-scaleIn p-10 '>
                    <div className='h-full w-full '>
                        <div className='h-[50%] w-full'>
                            <div className='h-[50%]'>
                                <div>
                                    <div className='text-[35px] text-center mt-[100px]'>
                                        <p>คุณ {user.fullname}</p>
                                        <p>เบอร์โทร {user.phonenum}</p>
                                    </div>
                                    <div className='flex justify-center w-full items-center'>
                                        <p className='text-[40px] mr-[35px]'>สะสม</p>
                                        <p className='text-[120px] text-[#FFB259]'>{user.point}</p>
                                        <p className='text-[40px] ml-[35px]'>พอยท์</p>
                                    </div>
                                    <div className='flex w-full justify-center'>
                                        <hr className='w-[100%] bg-black' />
                                    </div>
                                    <div className='flex justify-center mt-[50px]'>
                                        <button onClick={reload} className='bg-[#75C381] w-[363px] h-[131px] rounded-[24px] text-[45px] '>แลกพอยท์</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Find