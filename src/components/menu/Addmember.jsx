import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Success from '../success/Success'
import { Player } from '@lottiefiles/react-lottie-player';
import pills from '../img/pills.json'


function Addmember({ closeaddmember }) {
    const [addmembershow, setaddmembershow] = useState(false)
    const [oldmember, setoldmember] = useState(false)
    const [successaddmember, setsuccessaddmember] = useState(false)

    const [fullname, setfullname] = useState('')
    const [phonenum, setphonenum] = useState("")

    const [user, setuser] = useState([])

    const [loading, setLoading] = useState(false);

    const addmember = async () => {
        setLoading(true);
        if (phonenum.length === 10) {
            try {
                const data = {
                    data: {
                        username: fullname,
                        phonenum: phonenum
                    }
                };
                const result = await axios.post('https://member-apis.vercel.app/users/api/v1/create_user', data)
                if (result.data.rows.length === 0) {
                    console.log(result)
                    setaddmembershow(true)
                    setoldmember(false)
                    setsuccessaddmember(true)
                } else {
                    setaddmembershow(true)
                    setoldmember(true)
                    fechPoint(result.data.rows[0].uuid)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        } else {
            alert('Please enter a valid phone number')
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

    const reload = () => {
        window.location.reload();
    }
    return (
        <div className='loading-overlay absolute inset-0 bg-slate-50 bg-opacity-80 flex items-center justify-center z-1 '>
            {successaddmember && <Success message={"เพิ่มสมาชิกสำเร็จ"} />}
            {!addmembershow && <div className='bg-white w-[594px] h-[671px] drop-shadow-[16px_16px_0_rgba(0,0,0,0.4)] rounded-[24px] animate-scaleIn'>
                <div className='h-full w-full flex justify-center p-[20px]'>
                    <div className='h-full w-[90%] text-center pt-[40px]'>
                        <p className='text-[40px]'>สมัครสมาชิกใหม่</p>
                        <div>
                            <input onChange={(e) => setfullname(e.target.value)} placeholder='ชื่อ-นามสกุล' type="text" pattern="[0-9]*" className='pl-[20px] border border-black rounded-[50px] w-[90%] h-[80px] outline-none  mt-[50px] text-[30px]' />
                            <input onChange={(e) => setphonenum(e.target.value)} placeholder='เบอร์มือถือ' type="number" pattern="[0-9]*" className='pl-[20px] border border-black rounded-[50px] w-[90%] h-[80px] outline-none  mt-[50px] text-[30px]' />
                        </div>
                        <div className='flex justify-center mt-[130px]'>
                            <button onClick={closeaddmember} className='bg-[#FF9292] hover:bg-[#f45353] w-[173px] h-[71px] text-[40px] rounded-[24px] mr-[12px]'>ยกเลิก</button>
                            <button onClick={addmember} className='bg-[#75C381] hover:bg-[#45a954] w-[173px] h-[71px] rounded-[24px] text-[40px] '>ตกลง</button>
                        </div>
                    </div>
                </div>
            </div>}
            {oldmember && <div className='bg-white w-[594px] h-[700px] rounded-[24px] drop-shadow-[16px_16px_0_rgba(0,0,0,0.4)]'>
                {user ? (
                    <div className='h-full w-full' >
                        <div className='text-center h-full w-full mt-[100px]'>
                            <p className='text-[45px]'>เป็นสมาชิกอยู่แล้ว</p>
                            <div className='text-[45px] mt-[40px]'>
                                <p>คุณ {user.fullname}</p>
                                {/* <p>เบอร์โทรศัพท์ {user.phonenum}</p> */}
                            </div>
                            <div className='flex justify-center w-full items-center'>
                                <p className='text-[40px] mr-[35px]'>สะสม</p>
                                <p className='text-[120px] text-[#FFB259]'>{user.point || <Player
                                    autoplay
                                    loop
                                    src={pills}
                                    style={{ height: '70px', width: '70px' }}
                                >
                                </Player>}</p>
                                <p className='text-[40px] ml-[35px]'>พอยท์</p>
                            </div>
                            <div className='flex justify-center mt-[80px]'>
                                <button onClick={reload} className='bg-[#75C381] w-[203px] h-[101px] rounded-[24px] text-[45px] '>ตกลง</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='h-[50%] w-full mt-[30px] ' >
                        <div className='flex justify-center items-center h-full w-full'>
                            <div className=''>
                                <p className='w-full text-center text-[45px]'>เป็นสมาชิกอยู่แล้ว</p>
                                <p className='w-full text-center text-[45px] mt-[50px] pt-[50px]'>ไม่มีพอยน์สะสม</p>
                            </div>
                        </div>
                        <div className='flex justify-center mt-[80px]'>
                            <button onClick={reload} className='bg-[#75C381] w-[203px] h-[101px] rounded-[24px] text-[45px] '>ตกลง</button>
                        </div>
                    </div>
                )}

            </div>}
            {loading && <div className="border absolute">
                <div className="loading-overlay absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
                    <Player
                        autoplay
                        loop
                        src={pills}
                        style={{ height: '300px', width: '300px' }}
                    >
                    </Player>
                </div>
            </div>}
        </div>
    )
}

export default Addmember