import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Player } from '@lottiefiles/react-lottie-player';
import pills from '../img/pills.json'
import Success from '../success/Success';
import Error from '../error/Error';

function Addpromotion({ closeshowpromo }) {
    const [ShowPromotion, setShowPromotion] = useState(true)
    const [exchangerate, setexchagerate] = useState(false)
    const [addpromo, setaddpromo] = useState(false)

    const [loading, setLoading] = useState(false);
    const [error, set_Error] = useState(false)
    const [issuccess, set] = useState(false)
    const [edit, setedit] = useState(false)
    const [createpromo, setcreatepromo] = useState(false)

    const [price, setprice] = useState('')
    const [rate, setrate] = useState('')

    const [datapromo, setdatapromo] = useState([])

    const handleopenexchange = () => {
        setShowPromotion(false)
        setexchagerate(true)
    }

    const handlecloseexchange = () => {
        window.location.reload()

    }


    const handleopenpromo = () => {
        setaddpromo(true)
        setShowPromotion(false)
        setLoading(true)
        axios.get('https://member-apis.vercel.app/promotion/api/v1/get_promotions').then((res) => {
            setdatapromo(res.data)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    const exchange_rate = {
        price: price,
        rate: rate
    }

    const creactexchage = () => {
        setLoading(true)
        axios.post('https://member-apis.vercel.app/exchange/api/v1/create_exchange', { exchange_rate }).then((res) => {
            setLoading(false)
            set(true)
            setexchagerate(false)
        }).catch((err) => {
            console.log(err)
            set_Error(true)
        })
    }

    const [uuid, setuuid] = useState('')
    const [titleedit, settitleedit] = useState('')
    const [pointedit, setpointedit] = useState('')

    const openedit = (data) => {
        setuuid(data.uuid)
        settitleedit(data.title)
        setpointedit(data.point)
        setedit(true)
        setaddpromo(false)
    }

    const editpromotion = () => {
        const data = {
            uuid: uuid,
            title: titleedit,
            point: pointedit
        }
        axios.post('http://localhost:3003/promotion/api/v1/edite_promotion', { data }).then((res) => {
            console.log(res)
            setedit(false)
            set(true)
        }).catch((err) => {
            console.log(err)
        })
    }

    const Createpromo = ()=>{
        const data = {
            uuid: uuid,
            title: titleedit,
            point: pointedit
        }
        setLoading(true)
        axios.post('http://localhost:3003/promotion/api/v1/create_promotion' , {data}).then((res)=>{
            set(true)
            setLoading(false)
            window.location.reload()
        }).catch((err)=>{
            console.log(err)
        })
    }

    const deletepromotion = (uuid) => {
        setLoading(true)
        axios.delete('http://localhost:3003/promotion/api/v1/delete_promotions', {
            data: { uuid_promotion: uuid }
        }).then((res) => {

            setaddpromo(false)
            setLoading(false)
            set(true)
            
        }).catch((err) => {
            console.log(err);
        });
    };
    

    const handlecloseedit = () => {
        window.location.reload()
    }

    const opencreate =()=>{
        setaddpromo(false)
        setcreatepromo(true)
    }

    return (
        <div className="loading-overlay absolute inset-0 bg-slate-50 bg-opacity-80 flex items-center justify-center z-1 ">
            <div className='flex w-full h-full  justify-center items-center'>
                {error && <Error message={"มีบางอย่างผิดพลาด"} />}
                {issuccess && <Success message={"สำเร็จ"} />}
                {ShowPromotion &&
                    <div className='bg-white w-[677px] h-[534px] drop-shadow-[16px_16px_0_rgba(0,0,0,0.4)] rounded-[24px] animate-scaleIn'>
                        <div className='h-full w-full flex justify-center p-[20px]'>
                            <div className='h-full w-[90%] text-center pt-[60px] mt-[30px]'>
                                <div className='flex'>
                                    <div onClick={handleopenexchange} className='flex justify-center items-center text-[35px] rounded-[24px] w-[304px] h-[278px] bg-[#D9D9D9] mr-[10px]'>
                                        <p>อัตราแลกพอย์</p>
                                    </div>
                                    <div onClick={handleopenpromo} className='flex justify-center items-center text-[35px] rounded-[24px] w-[304px] h-[278px] bg-[#D9D9D9]'>
                                        <p>ส่วนลด</p>
                                    </div>
                                </div>

                                <div className='flex justify-center mt-[50px] mb-[30px]'>
                                    <button onClick={closeshowpromo} className='bg-[#FF9292] hover:bg-[#f45353] w-[173px] h-[71px] text-[40px] rounded-[24px] mr-[12px]'>ยกเลิก</button>
                                    {/* <button  className='bg-[#75C381] w-[173px] h-[71px] rounded-[24px] text-[40px] '>ตกลง</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {exchangerate &&
                    <div className='border absolute w-screen h-screen'>
                        <div className='flex h-full justify-center items-center'>
                            <div className='bg-white w-[694px] h-[400px] drop-shadow-[16px_16px_0_rgba(0,0,0,0.4)] rounded-[24px] animate-scaleIn'>
                                <div className='h-full w-full flex justify-center p-[20px]'>
                                    <div className='h-full w-[90%] text-center pt-[40px]'>
                                        <p className='text-[40px]'>กรุณาระบุราคาและพอยท์ที่จะได้รับ</p>
                                        <div className='flex items-center h-[20%] mt-[50px]'>
                                            <input onChange={(e) => setprice(e.target.value)} type="number" pattern="[0-9]*" className=' border pl-[20px] border-black rounded-[50px] w-[90%] h-[80px] outline-none  text-[30px]' />
                                            <p className='text-[35px] h-full mr-1 ml-1'> = </p>
                                            <input onChange={(e) => setrate(e.target.value)} type="number" pattern="[0-9]*" className=' border pl-[20px] border-black rounded-[50px] w-[90%] h-[80px] outline-none  text-[30px]' />
                                        </div>
                                        <div className='flex justify-center mt-[50px] mb-[30px]'>
                                            <button onClick={handlecloseexchange} className='bg-[#FF9292] hover:bg-[#f45353] w-[173px] h-[71px] text-[40px] rounded-[24px] mr-[12px]'>ยกเลิก</button>
                                            <button onClick={creactexchage} className='bg-[#75C381] w-[173px] h-[71px] rounded-[24px] text-[40px] '>ตกลง</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {addpromo &&
                    <div className='border absolute w-screen h-screen'>
                        <div className='flex h-full justify-center items-center'>
                            <div className='bg-white w-[694px] h-[870px] drop-shadow-[16px_16px_0_rgba(0,0,0,0.4)] rounded-[24px] animate-scaleIn'>
                                <div className='h-full w-full flex justify-center p-[20px]'>
                                    <div className='h-full w-full'>
                                        <p className='text-[45px] text-center'>โปรโมชั่นปัจจุบัน</p>
                                        <div className='overflow-scroll h-[80%] w-full mt-[20px]'>
                                            {datapromo.map((data, index) => (
                                                <div key={index} className='p-4 mb-[20px] w-full h-[15%] text-[30px] flex justify-between items-center  border-b-[100%]'>
                                                    <div className=''>
                                                        <p>ชื่อโปรโมชั่น {data.title}</p>
                                                        <p>ใช้{data.point} พอยท์</p>
                                                    </div>
                                                    <div className='flex items-center'>
                                                        <p className='mr-[10px] w-full h-full p-[15px] bg-orange-300' onClick={() => openedit(data)}>แก้ไข</p>
                                                        <p className='mr-[10px] w-full h-full p-[15px] bg-red-400' onClick={()=> deletepromotion(data.uuid)}>ลบ</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <p onClick={opencreate} className='text-end text-[30px] mt-[20px]'>+ เพิ่มโปรโมชั่น</p>
                                        <div className='flex justify-center mt-[50px] mb-[30px]'>
                                            <button onClick={handlecloseedit} className='bg-[#FF9292] hover:bg-[#f45353] w-[173px] h-[71px] text-[40px] rounded-[24px] mr-[12px]'>ยกเลิก</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                }
                {edit &&
                    <div className="border absolute">
                        <div className="loading-overlay absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
                            <div className='bg-white w-[677px] h-[534px] drop-shadow-[16px_16px_0_rgba(0,0,0,0.4)] rounded-[24px] animate-scaleIn'>
                                <p className='text-center text-[35px] mt-[30px]'>แก้ไขโปรโมชั่น</p>
                                <div className='flex justify-center  w-full'>
                                    <div className='w-[80%] '>
                                        <div className='ml-[40px]'>
                                            <p className='ml-[10px] text-[30px] mt-[20px]'>ชื่อส่วนลด</p>
                                            <input type="text" onChange={(e) => settitleedit(e.target.value)} value={titleedit} className=' border pl-[20px] border-black rounded-[50px] w-[90%] h-[80px] outline-none  text-[30px]' />
                                        </div>
                                        <div className='ml-[40px]'>
                                            <p className='ml-[10px] text-[30px] mt-[20px]'>จำนวนพอยท์</p>
                                            <input type="text" onChange={(e) => setpointedit(e.target.value)} value={pointedit} className=' border pl-[20px] border-black rounded-[50px] w-[90%] h-[80px] outline-none  text-[30px]' />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center mt-[50px] mb-[30px]'>
                                    <button onClick={handlecloseedit} className='bg-[#FF9292] hover:bg-[#f45353] w-[173px] h-[71px] text-[40px] rounded-[24px] mr-[12px]'>ยกเลิก</button>
                                    <button onClick={editpromotion} className='bg-[#75C381] w-[173px] h-[71px] rounded-[24px] text-[40px] '>ตกลง</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {createpromo &&
                    <div className="border absolute">
                        <div className="loading-overlay absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
                            <div className='bg-white w-[677px] h-[534px] drop-shadow-[16px_16px_0_rgba(0,0,0,0.4)] rounded-[24px] animate-scaleIn'>
                                <p className='text-center text-[35px] mt-[30px]'>แก้ไขโปรโมชั่น</p>
                                <div className='flex justify-center  w-full'>
                                    <div className='w-[80%] '>
                                        <div className='ml-[40px]'>
                                            <p className='ml-[10px] text-[30px] mt-[20px]'>ชื่อส่วนลด</p>
                                            <input type="text" onChange={(e) => settitleedit(e.target.value)}  className=' border pl-[20px] border-black rounded-[50px] w-[90%] h-[80px] outline-none  text-[30px]' />
                                        </div>
                                        <div className='ml-[40px]'>
                                            <p className='ml-[10px] text-[30px] mt-[20px]'>จำนวนพอยท์</p>
                                            <input type="text" onChange={(e) => setpointedit(e.target.value)} className=' border pl-[20px] border-black rounded-[50px] w-[90%] h-[80px] outline-none  text-[30px]' />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center mt-[50px] mb-[30px]'>
                                    <button onClick={handlecloseedit} className='bg-[#FF9292] hover:bg-[#f45353] w-[173px] h-[71px] text-[40px] rounded-[24px] mr-[12px]'>ยกเลิก</button>
                                    <button onClick={Createpromo} className='bg-[#75C381] w-[173px] h-[71px] rounded-[24px] text-[40px] '>ตกลง</button>
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
            </div>
        </div>
    )
}

export default Addpromotion