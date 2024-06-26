import React from 'react'
import { useState } from 'react';
import Menus from '../menu/Menus'
import Member from '../menu/Member'
import Addmember from '../menu/Addmember';
import { Player } from '@lottiefiles/react-lottie-player';
import pills from '../img/pills.json'


function Home() {
    const [showPopup, setShowPopup] = useState(false);
    const [showaddmember , setshowaddmember] = useState(false)

    const [loading, setLoading] = useState(false);

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

    const handleClickaddMember =()=>{
        setLoading(true);
        setTimeout(() => {
            setshowaddmember(true);
            setLoading(false);
        }, 3000); // หน่วงเวลา 1 วินาที (1000 มิลลิวินาที)
    }

    const handleCloseaddmember = () => {
        setshowaddmember(false);
    }
    return (
        <div className='bg-[#ADADAD] h-screen w-screen p-5 pt-[30px]'>
            <div className='h-[90%] w-full flex justify-center'>
                <div className='flex h-full w-full justify-center mt-[40px]  '>
                    <Menus openmember={handleClickMember} openaddmember={handleClickaddMember} />
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
                    {showPopup && <Member closemember={handleClosePopup} />}
                    {showaddmember && <Addmember closeaddmember={ handleCloseaddmember}/>}
                </div>
            </div>
        </div>
    )
}

export default Home