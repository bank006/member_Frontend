import React from 'react'
import { useState, useEffect } from 'react';
import Menus from '../menu/Menus'
import Member from '../menu/Member'
import Addmember from '../menu/Addmember';
import Find from '../menu/Find';
import axios from 'axios';
import { Player } from '@lottiefiles/react-lottie-player';
import pills from '../img/pills.json'

import { useNavigate, useLocation } from 'react-router-dom';

function Home() {

    const navigate = useNavigate()
    const location = useLocation()
    const phonenum = location.state?.phonenum
    const [showPopup, setShowPopup] = useState(false);
    const [showaddmember, setshowaddmember] = useState(false)
    const [showfind, setshowfind] = useState(false)

    const [loading, setLoading] = useState(false);
    const [user, setuser] = useState([])


    const handleClickMember = () => {
        setLoading(true);
        setTimeout(() => {
            setShowPopup(true);
            setLoading(false);
        }, 3000); // หน่วงเวลา 1 วินาที (1000 มิลลิวินาที)
    }

    const handleClosePopup = () => {
        setShowPopup(false);
    }

    // const handleClickaddMember =()=>{
    //     setLoading(true);
    //     setTimeout(() => {
    //         setshowaddmember(true);
    //         setLoading(false);
    //     }, 3000); // หน่วงเวลา 1 วินาที (1000 มิลลิวินาที)
    // }

    const handleCloseaddmember = () => {
        setshowaddmember(false);
    }

    const handleClickFind = () => {
        setLoading(true);
        setTimeout(() => {
            setshowfind(true);
            setLoading(false);
        }, 3000);
    }

    const handleClosefind = () => {
        setshowfind(false);
    }

    const back1 = () => {
        navigate(-1)
    }
    
    useEffect(() => {
        axios.post('https://member-apis.vercel.app/users/api/v1/check_user', { phonenum }).then((data) => {
            fechPoint(data.data[0].uuid)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const fechPoint = async (uuid) => {
        try {
            const result = await axios.post('https://member-apis.vercel.app/users/api/v1/get_userpoint', { uuid })
            setuser(result.data[0])
        } catch (error) {
            console.error('feched point user feild', error.message);
        }
    }


    return (
        <div className='bg-[#ADADAD] h-screen w-screen p-5 pt-[30px]'>
            <div className='flex items-center justify-between'>
                <p onClick={back1} className='text-[50px]'> กลับ </p>
                {/* <div className='text-[50px] flex'>
                    <p>ผู้ใช้ {user.fullname} มี </p>
                    <p className='ml-[10px] text-[#FFB259]'>{user.point} </p>
                    <p className='ml-[10px]'> คะแนน </p>
                </div> */}
            </div>
            <div className='h-[90%] w-full flex justify-center'>
                <div className='flex h-full w-full justify-center mt-[40px]  '>
                    {/* {show &&<Setuser openaddmember={handleClickaddMember} />} */}
                    <Menus openmember={handleClickMember} openfind={handleClickFind} />
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
                    {showPopup && <Member phonenum={{ phonenum: phonenum }} closemember={handleClosePopup} />}
                    {showaddmember && <Addmember closeaddmember={handleCloseaddmember} />}
                    {showfind && <Find phonenum={{ phonenum: phonenum }} closefind={handleClosefind} />}
                </div>
            </div>
        </div>
    )
}

export default Home