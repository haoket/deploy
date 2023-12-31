import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Product from "../../user/components/product/Product"
import BlogHome from './BlogHome';
import Loading from '../../user/components/amination/Loading';
import ProductSale from '../../user/components/product/ProductSale';
const Home = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))
  const [slideIndex, setSlideIndex] = useState(0);
  const [slidePlay, setSlidePlay] = useState(true);
  const [loading, setLoading] = useState(true);




  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Thay đổi trạng thái loading thành false sau 2 giờ
    }, 1000);
  })
  const slides = [
    {
      name: 'Khám Phá Vẻ Đẹp Tự Tin với Sự Chăm Sóc Đặc Biệt ',
      title: 'Khám Phá Vẻ Đẹp Tự Tin ',
      description: 'Trải nghiệm làm đẹp tuyệt vời với những sản phẩm chăm sóc da độc đáo, giúp bạn tỏa sáng và tự tin mỗi ngày. Không chỉ là làm đẹp, mà còn là cơ hội để bạn thể hiện bản thân.',
      image: '/images/a1.png',
      animationDirection: 'top-down',
    },
    {
      name: 'Bảo Vệ Da Mỗi Ngày với Chống Nắng Hiệu Quả',
      title: 'Bảo Vệ Da Mỗi Ngày ',
      description: 'Mang lại sự an tâm cho làn da của bạn mỗi khi bạn bước ra khỏi nhà. Sử dụng chống nắng hiệu quả để bảo vệ làn da khỏi tác động có hại của tia UV',
      image: '/images/a2.png',
      animationDirection: 'right-left',
    },
    {
      name: ' Chăm Sóc Da Tự Nhiên - Bí Quyết Cho Làn Da Khỏe Mạnh ',
      title: 'Chăm Sóc Da Tự Nhiên',
      description: 'Tận hưởng sức mạnh của thiên nhiên với bộ sản phẩm chăm sóc da tự nhiên và an toàn. Làn da của bạn xứng đáng được chăm sóc bằng những điều tốt nhất từ tự nhiên.',
      image: '/images/a3.png',
      animationDirection: 'left-right',
    },
  ];
  const nextSlide = () => setSlideIndex((prevIndex) => (prevIndex + 1 === slides.length ? 0 : prevIndex + 1));
  const prevSlide = () => setSlideIndex((prevIndex) => (prevIndex - 1 < 0 ? slides.length - 1 : prevIndex - 1));
  useEffect(() => {
    const interval = setInterval(() => {
      if (!slidePlay) return;
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [slideIndex, slidePlay]);


  useEffect(() => {
    if (!user) {
      return navigate("/auth/login")
    }
  }, [user])
  if (user) {
    return (
      <>
        {loading ? (
          <Loading />
        ) : (

          <div>


            <div className="hero">
              <div className="slider">
                <div className="container">
                  {slides.map((slide, index) => (
                    <div key={index} className={`slide ${index === slideIndex ? 'active' : ''}`}>
                      <div className="info">
                        <div className="info-content">
                          <h3 className={slide.animationDirection}>{slide.name}</h3>
                          <h2 className={`${slide.animationDirection} trans-delay-0-2 `}>{slide.title}</h2>
                          <p className={`${slide.animationDirection} trans-delay-0-4 text-xl mt-[-30px]`}>{slide.description}</p>
                          <div className={`${slide.animationDirection} trans-delay-0-6`}>
                            <button className="btn-flat btn-hover">
                              <Link to='/products'>Ghé ghop</Link>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className={`img ${slide.animationDirection}`}>
                        <img src={slide.image} alt="" />
                      </div>
                    </div>
                  ))}
                </div>
                <button className="slide-controll slide-next" onClick={() => { nextSlide(); }}>
                  <i className='bx bxs-chevron-right'></i>
                </button>
                <button className="slide-controll slide-prev" onClick={() => { prevSlide(); }}>
                  <i className='bx bxs-chevron-left'></i>
                </button>
              </div>
            </div>
            {/* <!-- end hero section --> */}

            {/* <SellerProducts /> */}
            <Product />
            <ProductSale />
            <BlogHome />
          </div>
        )}
      </>

    )
  }
}

export default Home;