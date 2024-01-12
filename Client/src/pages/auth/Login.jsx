import { Link } from "react-router-dom";
import './login.css'
import { useContext, useState } from 'react';
import Axios from "axios";
import { Context } from "../../../src/context/Context";
import { apiDomain } from '../../utils/utilsDomain';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { dispatch } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');



  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError('Vui lòng nhập email.');
      return false;
    }

    if (!emailRegex.test(email)) {
      setEmailError('Email không hợp lệ.');
      return false;
    }

    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError('Mật khẩu phải có ít nhất 6 kí tự.');
      return false;
    }

    setPasswordError('');
    return true;
  };

  const onSubmit = (e) => {


    e.preventDefault();

    // Kiểm tra hợp lệ của email và mật khẩu
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      // Đây là nơi xử lý logic đăng nhập, bạn có thể gọi API ở đây hoặc thực hiện các bước xác thực khác.
      const data = {
        email,
        password
      }

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
      console.log('Đã đăng nhập với:', { email, password });
    }
  };

  return (
    <div id="wrapper mb-[-20px] ">
      <div class="container h-100 ">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-9">
            <div class="AppForm shadow-lg">
              <div class="row">
                <div class="col-md-6 d-flex justify-content-center align-items-center">
                  <div class="AppFormLeft">

                    <h1 className="mb-10 text-center">Đăng nhập </h1>
                    <div class="form-group position-relative mb-4">
                      <input
                        type="email"
                        class="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={validateEmail}
                        placeholder="Email"
                      />
                      <i class="bi bi-envelope mr-2"></i>
                      {emailError && <p style={{ color: 'red' }}>{emailError}</p>}

                    </div>
                    <div class="form-group position-relative mb-4">
                      <input
                        type="password"
                        class="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={validatePassword}
                        placeholder="Password"
                      />
                      <i class="bi bi-lock mr-2"></i>
                      {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

                    </div>
                    <div class="row  mt-4 mb-4">
                      <div class="col-md-6">

                      </div>
                      <div class="col-md-6 text-right">
                        <a href="#">Quên mật khẩu?</a>
                      </div>
                    </div>

                    <button type="submit" onClick={onSubmit} class="btn btn-success btn-block shadow border-0 py-2 text-uppercase ">
                      Đăng nhập
                    </button>

                    <p class="text-center mt-5">
                      Bạn chưa có tài khoản?

                      <Link to="/auth/signup">
                        <span>
                          Đăng ký tại đây
                        </span>
                      </Link>

                    </p>

                  </div>

                </div>
                <div class="col-md-6 md:block hidden">
                  <div class="AppFormRight position-relative d-flex justify-content-center flex-column align-items-center text-center p-5 text-white ">
                    <h2 class="position-relative px-4 pb-3 mb-4">Welcome</h2>
                    <p>Chào mừng bạn đến với Beauty Shop, hi vọng bạn hài lòng với các dịch vụ của chúng tôi, chúng tôi luôn đặt uy tín lên hàng đầu, lợi ích khách hàng là trên hết! </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
