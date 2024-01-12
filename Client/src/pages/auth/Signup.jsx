import React, { useState } from "react";
import { Link } from "react-router-dom";
import './signup.css'
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { apiDomain } from "../../utils/utilsDomain";
const Signup = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
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

  const validateConfirmPassword = () => {
    if (confirmPassword !== password) {
      setConfirmPasswordError('Mật khẩu xác nhận không khớp.');
      return false;
    }

    setConfirmPasswordError('');
    return true;
  };
  const validateName = () => {
    if (!name) {
      setNameError('Vui lòng nhập họ tên');
      return false;
    }
    setNameError('');
    return true;
  }
  const validatePhone = () => {
    const phoneRegex = /^\d{10}$/;

    if (!phone) {
      setPhoneError('Vui lòng nhập số điện thoại.');
      return false;
    }

    if (!phoneRegex.test(phone)) {
      setPhoneError('Số điện thoại phải có 10 chữ số.');
      return false;
    }

    setPhoneError('');
    return true;
  };
  const validateAddress = () => {
    if (!address) {
      setAddressError('Vui lòng nhập địa chỉ');
      return false;
    }
    setAddressError('');
    return true;
  }


  const onSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra hợp lệ của email, mật khẩu và mật khẩu xác nhận
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isNameValid = validateName();
    const isPhoneValid = validatePhone();
    const isAddressValid = validateAddress();

    if (isEmailValid && isPasswordValid && isConfirmPasswordValid && isNameValid && isPhoneValid && isAddressValid) {

      const data = {
        email,
        password,
        name,
        address,
        phone
      }
      console.log(data)
      Axios.post(apiDomain + "/auth/signup", data)
        .then((response) => {
          response.data.message && alert(response.data.message)
          navigate("/auth/login")
        })
        .catch((error) => {
          console.log(error);
        })
      console.log('Đã đăng ký với:', { email, password });
    }

  }

  return (
    <div id="wrapper ">
      <div class="container h-100 ">
        <div class="row h-100 justify-content-center align-items-center">
          <form class="col-md-9">
            <div class="AppForm shadow-lg">
              <div class="row">
                <div class="col-md-6 d-flex justify-content-center align-items-center">
                  <div class="AppFormLeft pl-2">

                    <h1 className="mb-1 0 text-center">Đăng ký tài khoản</h1>
                    <div class="form-group position-relative mb-4">
                      <input type="text"
                        class="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none "
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={validateName}
                        placeholder="Họ và Tên" />
                      <i class="bi bi-person mr-2"></i>
                      {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
                    </div>
                    <div class="form-group position-relative mb-4">
                      <input
                        type="email"
                        class="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={validateEmail}
                        placeholder="Email"
                      />
                      <i class="bi bi-envelope mr-2"></i>
                      {emailError && <p style={{ color: 'red' }}>{emailError}</p>}

                    </div>
                    <div class="form-group position-relative mb-4">
                      <input type="number"
                        maxLength={10}
                        class="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                        value={phone}
                        onChange={(e) => {
                          // Giới hạn độ dài của số điện thoại thành 10 kí tự
                          if (e.target.value.length <= 10) {
                            setPhone(e.target.value);
                          }
                        }}
                        onBlur={validatePhone}

                        placeholder="Số điện thoại" />

                      <i class="bi bi-telephone mr-2"></i>
                      {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}
                    </div>
                    <div class="form-group position-relative mb-4 ">
                      <input type="text"
                        class="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        onBlur={validateAddress}

                        placeholder="Địa chỉ" />

                      <i class="bi bi-buildings mr-2"></i>
                      {addressError && <p style={{ color: 'red' }}>{addressError}</p>}
                    </div>
                    <div class="form-group position-relative mb-4">
                      <input
                        type="password"
                        class="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={validatePassword}
                        placeholder="Mật khẩu"
                      />
                      <i class="bi bi-lock mr-2"></i>
                      {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}


                    </div>
                    <div class="form-group position-relative mb-4">
                      <input
                        type="password"
                        class="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none "
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={validateConfirmPassword}
                        placeholder="Xác nhận mật khẩu"
                      />
                      <i class="bi bi-lock mr-2"></i>
                      {confirmPasswordError && <p style={{ color: 'red' }}>{confirmPasswordError}</p>}

                    </div>


                    <button class="btn btn-success btn-block shadow border-0 py-2 text-uppercase " onClick={onSubmit}>
                      Đăng ký
                    </button>

                    <p class="text-center mt-5">
                      Đã có tài khoản?

                      <Link to="/auth/login">
                        <span>
                          Đăng nhập tại đây
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
