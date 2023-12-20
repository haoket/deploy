import React, { useContext, useState } from 'react'
import './style.css'
import { Context } from '../../../context/Context';
import { apiDomain } from '../../../utils/utilsDomain';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
export const ChangePassword = () => {
    const navigate = useNavigate();


    const id = useContext(Context).user.id;
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');

    const handleChangePassword = async () => {

        if (newPassword !== confirmPassword) {
            alert('Mật khẩu xác nhận không đúng');
            return;
        }
        else {

            const data = {
                id: id,
                newPassword: newPassword,
                oldPassword: oldPassword

            }
            const response = await axios.put(`${apiDomain}/change-password/${id}`, data);
            if (response.status === 200) {
                toast.success('Thay đổi mật khẩu thành công');
                navigate('/profile');
            }
            else {
                toast.error('Thay đổi mật khẩu thất bại');
            }
        }



    }




    return (
        <div className="mainDiv">
            <div className="cardStyle">
                <div action="" method="post" name="signupForm" id="signupForm">

                    <img src="" id="signupLogo" />

                    <h2 className="formTitle text-xl font-bold">
                        Thay đổi mật khẩu
                    </h2>

                    <div className="inputDiv">
                        <label className="inputLabel" for="oldPassword">Mật khẩu hiển tại</label>
                        <input type="password" id="oldPassword" name="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                    </div>


                    <div className="inputDiv">
                        <label className="inputLabel" for="newPassword">Mật khẩu mới</label>
                        <input type="password" id="newPassword" name="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    </div>

                    <div className="inputDiv">
                        <label className="inputLabel" for="confirmPassword">Nhập lại mật khẩu</label>
                        <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="confirmPassword" />
                    </div>

                    <div className="buttonWrapper">
                        <button onClick={handleChangePassword} className="submitButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            <span>Continue</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
