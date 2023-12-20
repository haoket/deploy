import { useEffect, useState } from "react";
import '../../admin/css/app.css'
import { apiDomain } from "../../utils/utilsDomain";
import axios from "axios";



export const Dashboard = () => {

  const [data, setdata] = useState([]);
  const totalSales = data
    .filter(order => order.status === "2")
    .reduce((total, order) => total + order.TotalAmount, 0);



  const countDelivery = data
    .filter(order => order.status === "1")
    .length


  const countSuccess = data
    .filter(order => order.status === "3")
    .length


  const totalProducts = data
    .filter(order => order.status === "3")
    .reduce((total, order) => {

      return total + order.products.reduce((productTotal, product) => {
        return productTotal + product.Quantity;
      }, 0);
    }, 0);




  const handleGetDataOrder = async () => {

    try {
      const response = await axios.get(`${apiDomain}/getAllOrders`);
      setdata(response.data);
      console.log('====================================');
      console.log(response.data);
      console.log('====================================');
    } catch (error) {
      console.error('Error fetching data:', error);
    }


  }


  useEffect(() => {

    handleGetDataOrder();

  }, [])
  return (
    <div className=" w-full">
      {/* <!-- content --> */}
      <div className="content ">

        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col-lg-7 col-md-12">
            <div className="card widget h-100">
              <div className="card-header d-flex">
                <h6 className="card-title">
                  Tổng doanh thu
                  <a href="#" className="bi bi-question-circle ms-1 small" data-bs-toggle="tooltip"
                    title="Daily orders and sales"></a>
                </h6>
              </div>
              <div className="card-body">
                <div className="d-md-flex align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <div className="display-7 me-3">
                      <i className="bi bi-bag-check me-2 text-success"></i> {totalSales}.000 VNĐ
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex mb-3">
                  <div className="display-7">
                    <i className="bi bi-basket"></i>
                  </div>

                </div>
                <h4 className="mb-3">Tổng đơn hàng</h4>
                <div className="d-flex mb-3">
                  <div className="display-7">{data.length}</div>
                  <div className="ms-auto" id="total-orders"></div>
                </div>

              </div>
            </div>
          </div>
          {/* <div className="col-lg-4 col-md-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex mb-3">
                  <div className="display-7">
                    <i className="bi bi-credit-card-2-front"></i>
                  </div>

                </div>
                <h4 className="mb-3">Sales</h4>
                <div className="d-flex mb-3">
                  <div className="display-7">$3.759,00</div>
                  <div className="ms-auto" id="total-sales"></div>
                </div>
                <div className="text-danger">
                  Over last month 2.4% <i className="small bi bi-arrow-down"></i>
                </div>
              </div>
            </div>
          </div> */}


          <div className="col-lg-4 col-md-6">
            <div className="card h-100 bg-purple">
              <div className="card-body text-center">
                <div className="text-white-50">
                  <div className="bi bi-box-seam display-6 mb-3"></div>
                  <div className="display-8 mb-2">Số sản phẩm đã bán</div>
                  <h5>{totalProducts}</h5>
                </div>
                <div id="products-sold"></div>
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-md-12">
            <div className="card widget">
              <div className="card-header">
                <h5 className="card-title">Hoạt động</h5>
              </div>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card border-0">
                    <div className="card-body text-center">
                      <div className="display-5">
                        <i className="bi bi-truck text-secondary"></i>
                      </div>
                      <h5 className="my-3">Vận chuyển</h5>
                      <div className="text-muted">{countDelivery}</div>
                      <div className="progress mt-3" style={{ height: "5px" }}>
                        <div className="progress-bar bg-secondary" role="progressbar" style={{ width: "25%" }}
                          aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card border-0">
                    <div className="card-body text-center">
                      <div className="display-5">
                        <i className="bi bi-receipt text-warning"></i>
                      </div>
                      <h5 className="my-3">Đơn đã đặt</h5>
                      <div className="text-muted">{data.length}</div>
                      <div className="progress mt-3" style={{ height: "5px" }}>
                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: "67%" }}
                          aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card border-0">
                    <div className="card-body text-center">
                      <div className="display-5">
                        <i className="bi bi-cursor text-success"></i>
                      </div>
                      <h5 className="my-3">Giao thành công</h5>
                      <div className="text-muted">{countSuccess}</div>
                      <div className="progress mt-3" style={{ height: "5px" }}>
                        <div className="progress-bar bg-success" role="progressbar" style={{ width: "55%" }}
                          aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card border-0">
                    <div className="card-body text-center">
                      <div className="display-5">
                        <i className="bi bi-cart-x text-danger"></i>
                      </div>
                      <h5 className="my-3">Đơn đã hủy</h5>
                      <div className="text-muted">{countSuccess}</div>
                      <div className="progress mt-3" style={{ height: "5px" }}>
                        <div className="progress-bar bg-danger" role="progressbar" style={{ width: "55%" }}
                          aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
      {/* <!-- ./ content --> */}


    </div>

  );
};
