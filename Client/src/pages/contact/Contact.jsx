import { Link } from "react-router-dom";

import './Contact.css'
import Loading from "../../user/components/amination/Loading";
import { useEffect, useState } from "react";
import axios from "axios";
const Contact = () => {

  const handlePayment = async () => {
    try {
      const { data } = await axios.post('http://localhost:8081/create_payment_url', {
        amount: 5000, // Provide a valid amount
        orderDescription: 'Description of the order',
        orderType: 'billpayment',
        language: 'vn',
        bankCode: '' // If applicable
      });

      // Log the response for debugging
      console.log('Payment response:', data);

      // Check if the payment link is available in the response
      if (data && data.paymentLink) {
        // Open the payment link in a new tab
        window.open(data.paymentLink, '_blank');
      } else {
        console.error('Payment link not found in the response');
      }
    } catch (error) {

      console.error('Error making payment:', error);
    }
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Thay đổi trạng thái loading thành false sau 2 giờ
    }, 1000);
  })
  return (
    <>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div className="contact-area d-flex align-items-center mt-5 mb-5 md:px-20">


            <div className="google-map">
              <div >
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.7332975516097!2d108.24978007468239!3d15.975298241946591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142108997dc971f%3A0x1295cb3d313469c9!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgVGjDtG5nIHRpbiB2w6AgVHJ1eeG7gW4gdGjDtG5nIFZp4buHdCAtIEjDoG4!5e0!3m2!1svi!2s!4v1701016608794!5m2!1svi!2s"
                  id="googleMap" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>

            <div className="contact-info">
              <h2>Liên hệ với chúng tôi</h2>
              <p>Chúng tôi hân hạnh đem đến cho khách hàng những sản phẩm chất lượng nhất, cửa hàng chúng tôi luôn đặt uy tín lên hàng đầu.</p>

              <div className="mt-50">
                <p><span>Địa chỉ:</span> Hòa Khánh, thành phố Đà Nẵng</p>
                <p><span>SĐT:</span> 0386043213</p>

                <p>
                  <span>Email:</span>
                  <a href="mailto:levanhao0304@gmail.com">levanhao0304@gmail.com</a></p>
              </div>
            </div>

          </div>
        )}

      </div> </>
  );
};

export default Contact;
