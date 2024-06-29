import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import member from '../img/member.png'
import voucher from '../img/voucher.png'
import addmember from '../img/addmember.png'
import Addmember from './Addmember'
import { Player } from '@lottiefiles/react-lottie-player';
import pills from '../img/pills.json'
import Error from '../error/Error'

function Setuser() {

    const navigate = useNavigate()
    const [phonenum, setNumber] = useState('')

    const [loading, setLoading] = useState(false);
    const [showaddmember, setshowaddmember] = useState(false)
    const [membernum, setmembernum] = useState(false)
    const [error, set_Error] = useState(false)

    const handleClickaddMember = () => {
        setLoading(true);
        setTimeout(() => {
            setshowaddmember(true);
            setLoading(false);
        }, 3000); // หน่วงเวลา 1 วินาที (1000 มิลลิวินาที)
    }
    const handleCloseaddmember = () => {
        setshowaddmember(false);
    }

    const handlesetUser = () => {
        setmembernum(true)
    }

    const hadlecloseUser = () => {
        setmembernum(false)
    }

    const hadleLogin = () => {
        setLoading(true);
        axios.post('https://member-apis.vercel.app/users/api/v1/check_user', { phonenum }).then((data) => {
            setLoading(false);
            navigate('/home', { state: { phonenum } })
        }).catch((err) => {
            setmembernum(false)
            set_Error(true)
            setLoading(false);
            console.log(err)
        })
    }
    return (
        <div className='bg-[#ADADAD] h-screen w-full'>
            <div className='h-[60%] w-full flex justify-center'>
                <div className='grid grid-cols-2  gap-10  p-4'>
                    <div onClick={handlesetUser} className='bg-[#D9D9D9] p-3 w-[304px] h-[278px] ipadpro:w-[400px] ipadpro:h-[378px] rounded-[24px] cursor-pointer' >
                        <div className='w-full h-full flex justify-center'>
                            <div className=' w-full h-full'>
                                <div className=' flex justify-center items-center w-full h-[70%] ipadpro:h-[80%] '>
                                    <img src={member} alt="" className='w-[137px] h-[89px] ipadpro:w-[230px] ipadpro:h-[160px]' />
                                </div>
                                <div className='text-[50px] text-center'>
                                    <p>สมาชิก</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-[#D9D9D9] p-3 w-[304px] h-[278px] ipadpro:w-[400px] ipadpro:h-[378px] rounded-[24px]' >
                        <div className='w-full h-full flex justify-center'>
                            <div className=' w-full h-full'>
                                <div className=' flex justify-center items-center w-full h-[70%] ipadpro:h-[80%] '>
                                    <img src={voucher} alt="" className='w-[135px] h-[68px] ipadpro:w-[200px] ipadpro:h-[150px]' />
                                </div>
                                <div className='text-[50px] text-center'>
                                    <p>เพิ่มโปรโมชั่น</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div onClick={handleClickaddMember} className='bg-[#D9D9D9] p-3 w-[304px] h-[278px] ipadpro:w-[400px] ipadpro:h-[378px] rounded-[24px]' >
                        <div className='w-full h-full flex justify-center'>
                            <div className=' w-full h-full'>
                                <div className=' flex justify-center items-center w-full h-[70%] ipadpro:h-[80%] '>
                                    <img src={addmember} alt="" className='w-[116px] h-[99px] ipadpro:w-[180px] ipadpro:h-[160px]' />
                                </div>
                                <div className='text-[50px] text-center'>
                                    <p>เพิ่มสมาชิก</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {membernum &&
                    <div className='border absolute w-screen h-screen'>
                        <div className='flex h-full justify-center items-center'>
                            <div className='bg-white w-[594px] h-[400px] drop-shadow-[16px_16px_0_rgba(0,0,0,0.4)] rounded-[24px] animate-scaleIn'>
                                <div className='h-full w-full flex justify-center p-[20px]'>
                                    <div className='h-full w-[90%] text-center pt-[40px]'>
                                        <p className='text-[40px]'>กรุณากรอกเบอร์โทร</p>
                                        <div>
                                            <input onChange={(e) => setNumber(e.target.value)} placeholder='exp:065-xxx-xxx' type="number" pattern="[0-9]*" className='pl-[20px] border border-black rounded-[50px] w-[90%] h-[80px] outline-none  mt-[50px] text-[30px]' />
                                        </div>
                                        <div className='flex justify-center mt-[50px] mb-[30px]'>
                                            <button onClick={hadlecloseUser} className='bg-[#FF9292] hover:bg-[#f45353] w-[173px] h-[71px] text-[40px] rounded-[24px] mr-[12px]'>ยกเลิก</button>
                                            <button onClick={hadleLogin} className='bg-[#75C381] w-[173px] h-[71px] rounded-[24px] text-[40px] '>ตกลง</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {loading && <div className="border absolute">
                    <div className="loading-overlay absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
                        <Player
                            autoplay
                            loop
                            src={pills}
                            style={{ height: '300px', width: '200px' }}
                        >
                        </Player>
                    </div>
                </div>}
                {showaddmember && <Addmember closeaddmember={handleCloseaddmember} />}

                {error &&
                    <div className='border absolute w-screen h-screen'>
                        <div className='h-full flex justify-center items-center'>
                            {error && <Error message={"ไม่ได้เป็นสมาชิก"} />}
                        </div>
                    </div>

                }
            </div>
        </div>
    )
}

export default Setuser