import { Link } from "react-router-dom";
import './login.css'
import { useContext } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import Axios from "axios";
import { Context } from "../../../src/context/Context";
import { apiDomain } from '../../utils/utilsDomain';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { dispatch } = useContext(Context);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    Axios.post(apiDomain + "/auth/login", data)
      .then(({ data }) => {
        // console.log(data);
        if (data.token) {
          dispatch({ type: "LOGIN_SUCCESS", payload: data.token });
          localStorage.setItem("user", JSON.stringify(data));
          console.log(data)
          if (data.role === "admin") {
            navigate('/admin')
          } else if (data.role === "user") {

            navigate('/')
          }
          else {
            navigate("/auth/login")
          }
        }
      })
      .catch(({ response }) => {
        console.log(response);
        alert(response.data.error);
      });
  };

  return (
    <div id="wrapper">
      <div id="left">
        <div id="signin">
          <div className="logo">
            <Link to="/">Beauty </Link>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>


            <div>
              <label>Email</label>
              <input
                type="text"
                className="text-input" required="required"  {...register("email")}
                placeholder="name@gmail.com"
              />
            </div>
            <p className="error">{errors.email?.message}</p>
            <div>
              <label>Mật khẩu</label>
              <input
                type="password"
                className="text-input" required {...register("password")}
                placeholder="Nhập mật khẩu"
              />
            </div>
            <p>{errors.password?.message}</p>
            <button type="submit" className="btn primary-btn">Đăng nhập</button>
          </form>
          <div className="links">
            <Link to="#">Quên mật khẩu </Link>
          </div>
          <div className="or">
            <hr className="bar" />
            <span>hoặc</span>
            <hr className="bar" />
          </div>
          <Link to="/auth/signup" className="secondary-btn">
            Tạo tài khoản
          </Link>
        </div>
        <footer id="main-footer">
          <div>
            <Link to="/terms">Terms of Use</Link> |{" "}
            <Link to="/policy">Privacy Policy</Link>
          </div>
        </footer>
      </div>
      <div id="right">
        <div id="showcase">
          <div className="showcase-content">
            <h1 className="showcase-text">
              Không phải là thành viên <strong>Đừng lo lắng</strong>
            </h1>
            <Link to="/auth/signup" className="secondary-btn">
              Đăng ký tại đây
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
