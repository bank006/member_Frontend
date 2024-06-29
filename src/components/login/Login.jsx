import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player';

import Error from '../error/Error'
import pills from '../img/pills.json'
function Login() {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')

    const [loginshow, set_loginshow] = useState(true)
    const [errors, seterrors] = useState(false)
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const login = () => {
        setLoading(true);
        axios.post('https://member-apis.vercel.app/login', { username, password }).then((res) => {
            if (res.data.status == "success") {
                const tell = '065'
                setLoading(false)
                navigate('/home' ,{state :{tell}})
            } 
        }).catch((err) => {
            set_loginshow(false)
            seterrors(true)
            setLoading(false)
            console.log(err)
        })
    }
    return (
        <div className='w-screen h-screen bg-[#ADADAD] '>
            <div className='flex justify-center items-center h-full '>
                {errors && <Error message={"ไม่ถูกต้อง"} />}
                {loginshow && <div className='border  bg-white  h-[500px] w-[500px] drop-shadow-[16px_16px_0_rgba(0,0,0,0.4)] rounded-[24px] animate-scaleIn text-center p-10'>
                    <p className='text-[50px]'>Admin</p>
                    <input onChange={(e) => setusername(e.target.value)} type="text" placeholder='username' className='border border-black rounded-[24px] w-full h-[55px] mt-[20px] pl-[20px]' />
                    <input type="password" onChange={(e) => setpassword(e.target.value)} placeholder='password' className='border border-black rounded-[24px] w-full h-[55px] mt-[20px] pl-[20px]' />
                    <div className='flex justify-center mt-[50px] mb-[30px]'>
                        <button onClick={login} className='bg-[#75C381] w-[173px] h-[71px] rounded-[24px] text-[40px] '>ตกลง</button>
                    </div>
                </div>}
            </div>
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

export default Login