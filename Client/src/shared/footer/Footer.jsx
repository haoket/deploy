import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div className='sm:flex justify-between bg-black text-white   p-[2rem]'>
        <div className='flex flex-col gap-2'>
          <Link className='text-[#f77b82] font-bold tracking-widest mb-5'>Beauty</Link>
          <p className='mb-5 text-[#8e8d8d]'>Đặt uy tín lên hàng đầu<br /> Sự hài lòng của bạn là niềm vui của chúng tôi</p>
          <p className='flex gap-5'><FaFacebook /><FaInstagram /> <FaLinkedin /><FaTwitter /></p>

        </div>
        <div className='flex flex-col gap-2'>
          <Link className='font-bold mb-3'> Liên kết</Link>
          <Link>Trang chủ</Link>
          <Link>Về chúng tôi</Link>
          <Link>Cửa hàng</Link>
          <Link>Liên hệ</Link>
        </div>
        <div className='flex flex-col gap-2'>
          <Link className='font-bold'>Liên hệ</Link>
          <Link>0386043213 - Lê Văn hào</Link>
          <Link>Nguyễn Lương Bằng, phường Hòa Khánh</Link>
          <Link>Đà Nẵng, Việt Nam</Link>

        </div>
        <div className=" grid">
          <h3 className="font-bold">Liên hệ chúng tôi qua Email</h3>

          <div className="flex bg-[#ededed] items-center p-3 h-[4rem] rounded-[50px]">
            <input
              type="email"
              placeholder="Nhập địa chỉ Email của bạn"
              className="  bg-[#ededed] border-none text-[13px]"
            />
            <button className="bg-[#f42c37] rounded-[50px] py-1 px-6  text-[#ffffff]  ">
              Theo dõi
            </button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Footer