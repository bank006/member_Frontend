import React from 'react'

import member from '../img/member.png'
import addmember from '../img/addmember.png'
import find from '../img/find.png'
import voucher from '../img/voucher.png'
function Menus({openmember , openaddmember}) {
    return (
        <div className='bg-[#ADADAD] h-full w-full'>
            <div className='h-[60%] w-full flex justify-center'>
                <div className='grid grid-cols-2  gap-10  p-4'>
                    <div onClick={openmember} className='bg-[#D9D9D9] p-3 w-[304px] h-[278px] ipadpro:w-[400px] ipadpro:h-[378px] rounded-[24px] cursor-pointer' >
                        <div className='w-full h-full flex justify-center'>
                            <div className=' w-full h-full'>
                                <div className=' flex justify-center items-center w-full h-[70%] ipadpro:h-[80%] '>
                                    <img src={member} alt="" className='w-[137px] h-[89px] ipadpro:w-[237px] ipadpro:h-[170px]' />
                                </div>
                                <div className='text-[50px] text-center'>
                                    <p>สมาชิก</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div onClick={openaddmember} className='bg-[#D9D9D9] p-3 w-[304px] h-[278px] ipadpro:w-[400px] ipadpro:h-[378px] rounded-[24px]' >
                        <div className='w-full h-full flex justify-center'>
                            <div className=' w-full h-full'>
                                <div className=' flex justify-center items-center w-full h-[70%] ipadpro:h-[80%] '>
                                    <img src={addmember} alt="" className='w-[116px] h-[99px] ipadpro:w-[216px] ipadpro:h-[180px]' />
                                </div>
                                <div className='text-[50px] text-center'>
                                    <p>เพิ่มสมาชิก</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-[#D9D9D9] p-3 w-[304px] h-[278px] ipadpro:w-[400px] ipadpro:h-[378px] rounded-[24px]' >
                        <div className='w-full h-full flex justify-center'>
                            <div className=' w-full h-full'>
                                <div className=' flex justify-center items-center w-full h-[70%] ipadpro:h-[80%] '>
                                    <img src={find} alt="" className='w-[102px] h-[108px] ipadpro:w-[202px] ipadpro:h-[208px]' />
                                </div>
                                <div className='text-[50px] text-center'>
                                    <p>ค้นหา</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-[#D9D9D9] p-3 w-[304px] h-[278px] ipadpro:w-[400px] ipadpro:h-[378px] rounded-[24px]' >
                        <div className='w-full h-full flex justify-center'>
                            <div className=' w-full h-full'>
                                <div className=' flex justify-center items-center w-full h-[70%] ipadpro:h-[80%] '>
                                    <img src={voucher} alt="" className='w-[135px] h-[68px] ipadpro:w-[235px] ipadpro:h-[168px]' />
                                </div>
                                <div className='text-[50px] text-center'>
                                    <p>โปรโมชั่น</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menus