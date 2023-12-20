import React from "react";
import { Link } from "react-router-dom";
import './signup.css'
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import { useForm } from "react-hook-form";
import { apiDomain } from "../../utils/utilsDomain";
const Signup = () => {

  const navigate = useNavigate();

  const schema = yup.object().shape({

    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //   "Password must contain at least 8 characters, one letter, one number, and one special character"
    // ),
  });


  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data)
    Axios.post(apiDomain + "/auth/signup", data)
      .then((response) => {
        response.data.message && alert(response.data.message)
        navigate("/auth/login")
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className="signup ">
      <div className="signup_image">
        <div>
          <h1>
            Bạn đã là thành viên? <strong>Đừng lo lắng</strong>
          </h1>
          <Link to="/auth/login" className="secondary-btn">
            Đăng nhập tại đây
          </Link>
        </div>
      </div>
      <div className="signup_form">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <h2>Dont Have an Account?</h2> */}
          <h1 className="font-bold text-2xl pt-4">Đăng ký thành viên</h1>
          <div>
            <label>Tên</label>
            <input
              type="text"
              className="text-input" required="required"  {...register("name")}
              placeholder="Nhập tên"
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              className="text-input" required="required"  {...register("email")}
              placeholder="Nhập Email"
            />
          </div>
          <div>
            <label>Số điện thoại</label>
            <input
              type="text"
              className="text-input" required="required"  {...register("phone")}
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div>
            <label>Địa chỉ</label>
            <input
              type="text"
              className="text-input" required="required"  {...register("address")}
              placeholder="Nhập địa chỉ"
            />
          </div>
          <div>
            <label>Mật khẩu</label>
            <input
              type="password"
              className="text-input" required="required"   {...register("password")}
              placeholder="Mật khẩu"
            />
          </div>
          <p className="error" style={{ color: "red" }} >{errors.password?.message}</p>
          <div>
            <label>Nhập lại mật khẩu</label>
            <input
              type="password"
              className="text-input" required="required"   {...register("confirmpassword")}
              placeholder="********"
            />
          </div>
          <p>{errors.confirmpassword?.message}</p>
          <div className="btn_wrapper">
            <button className="secondary-btn" type="submit" >Đăng ký</button>
          </div>

          <div className="or">
            <hr className="bar" />
            <span>hoặc</span>
            <hr className="bar" />
          </div>
          <div className="btn_wrapper">
            <Link to="/auth/login" className="secondary-btn">
              Đăng nhập
            </Link>
          </div>

          <footer className="main-footer">

            <div>
              <Link to="/terms">Terms of use</Link> |{" "}
              <Link to="/policy">Privacy Policy</Link>
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default Signup;
