import { Outlet } from "react-router-dom"
// import './layout.css'
import Footer from "../shared/footer/Footer"
import Navbar from "../shared/navbars/Nav"
import ChatComponent from "../pages/chatbox"

const UserLayout = () => {
    return (
        <>
            <div className="user-layout overflow-hidden " style={{ padding: "-20px" }}>
                <div>
                    <Navbar />
                    <div className="pt-[80px] " >
                        <Outlet />
                    </div>
                    <ChatComponent />
                </div>

                <Footer />


            </div>
        </>
    )
}

export default UserLayout