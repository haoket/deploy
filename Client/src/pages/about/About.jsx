
import './about.css';
import videoAboutApp from '../img/1.mp4';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import Loading from '../../user/components/amination/Loading';

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Thay đổi trạng thái loading thành false sau 2 giờ
    }, 1000);
  })
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="bg-[#e2e2e2] w-screen p-16  mb-8 ">

            <i className="flex flex-col items-center w-full">
              <h1 className="font-bold text-4xl ">Về chúng tôi</h1>
            </i>
          </div>
          <div className='flex mb-20 md:mx-[10%]'>



            <div className="row">
              <div className='col-12  order-2  col-lg-7'>

                <h1 className='font-bold text-4xl m-6'>Beauty Shop</h1>
                <p className='m-8 text-[#686868]'>Chào mừng bạn đến với "Beauty Shop" - nơi bạn có thể khám phá và trải nghiệm sự quyến rũ và đẳng cấp trong thế giới mỹ phẩm. <br />
                  Chúng tôi tự hào là địa chỉ tin cậy cho những sản phẩm làm đẹp chất lượng, mang lại sự tự tin và nâng tầm vẻ đẹp tự nhiên của bạn.
                  <br />
                  Tại "Beauty Shop", chúng tôi không chỉ cung cấp những dòng sản phẩm mỹ phẩm hàng đầu từ các thương hiệu nổi tiếng, <br />
                  mà còn cam kết đem đến cho bạn trải nghiệm mua sắm độc đáo và thoải mái.<br />
                  Đội ngũ chuyên viên tư vấn làm đẹp của chúng tôi
                  sẽ luôn sẵn lòng hỗ trợ và tư vấn cho bạn những sản phẩm phù hợp với nhu cầu cụ thể của làn da và phong cách cá nhân.
                  <br />
                  Chất lượng là trên hết, và chúng tôi
                  cam kết mang đến cho bạn những sản phẩm mỹ phẩm được chọn lọc cẩn thận,<br />
                  từ son môi sang trọng đến kem chống nắng chăm sóc da. <br />
                  Với "Beauty Shop," việc làm đẹp không chỉ là một quy trình, mà là một trải nghiệm đầy thoải mái và phong cách.
                  <br />
                  Hãy đồng hành cùng chúng tôi trên hành trình làm đẹp và khám phá sức hút riêng của bạn.<br />
                  Mỗi sản phẩm tại "Glamour Beauty" là một câu chuyện về vẻ đẹp tự tin và sự lựa chọn thông thái.
                  <br />
                  Hãy đắm chìm vào thế giới mỹ phẩm tinh tế của chúng tôi và khám phá sức hút đặc biệt của bạn!</p>
                <Link to={'/products '} className='bg-[#f42c37] px-6 py-2 text-white rounded-[20px] mx-20 '>Mua sắm ngay</Link>
              </div>
              <section id="about-app" className="section-p1  order-1  col-12 col-lg-5">
                <div className="video">
                  <video autoPlay muted loop src={videoAboutApp}></video>
                </div>
              </section>

            </div>
          </div>
        </>
      )}

    </>

  );
};
export default About;
