import {useDispatch} from "react-redux";
import UserList from "../pages/UserList.jsx";
import UserModal from "./UserModal.jsx";
import {Link, Outlet, useLocation} from "react-router-dom";
import {logout} from "../features/authSlice.js";
import {useEffect, useState} from "react";

const Header = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

    const dispatch = useDispatch();

    const location = useLocation();
    const isViewingUser = location.pathname.startsWith("/feed/") && location.pathname.split("/").length > 2

    useEffect(() => {

        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <header className="w-full bg-white flex items-center justify-around fixed z-50 py-5 lg:py-0 shadow-md">
            <div className="lg:w-1/5 lg:h-24 lg:fixed lg:left-1/20 lg:top-0 flex items-center">
                <i>
                    <svg className='lg:hidden' width="32" height="32" viewBox="0 0 32 32" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20.4769 7.34854L14.204 3.55509C13.6119 3.19292 12.9388 3.0015 12.2532 3.00031C10.2094 3.00031 8.33475 4.71225 8.33475 7.10502V21.3073L20.4769 13.9669C22.9083 12.4947 22.9083 8.81996 20.4769 7.34854ZM11.8484 14.448V6.86793L18.1163 10.6567L11.8484 14.448Z"
                            fill="#4C68D5"/>
                        <path
                            d="M23.8489 28.9844C23.8489 29.0273 11.9908 28.966 11.9908 28.966L10.9434 28.8425C9.24672 28.644 7.94425 27.1233 8.00197 25.3346C8.00197 25.2917 8.00565 25.2519 8.00811 25.2103C8.05471 24.4365 8.32608 23.6961 8.78582 23.0885C8.97253 22.8461 9.20091 22.6425 9.45916 22.4882L18.4782 17.0725C20.3414 15.9535 21.8931 15.562 22.6999 13.5341C22.9974 12.7757 23.126 11.9562 23.0757 11.1379L23.0446 10.5865L23.9651 15.9204C24.083 16.8264 23.9013 17.7537 23.4211 18.5169C23.1326 18.9785 22.7475 19.3653 22.2951 19.6479L11.8295 24.8943C11.8191 24.9006 11.809 24.9074 11.7993 24.9149C11.5127 25.1293 11.6896 25.6069 12.0403 25.5867L20.7515 25.6403C22.4433 25.5417 23.8526 27.2112 23.8489 28.9844Z"
                            fill="#4C68D5"/>
                    </svg>
                    <svg className='hidden lg:flex lg:mr-3' width="40" height="40" viewBox="0 0 40 40"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="20" fill="#4C68D5"/>
                        <path
                            d="M24.4769 11.3485L18.204 7.55509C17.6119 7.19292 16.9388 7.0015 16.2532 7.00031C14.2094 7.00031 12.3348 8.71225 12.3348 11.105V25.3073L24.4769 17.9669C26.9083 16.4947 26.9083 12.82 24.4769 11.3485ZM15.8484 18.448V10.8679L22.1163 14.6567L15.8484 18.448Z"
                            fill="white"/>
                        <path
                            d="M27.8489 32.9844C27.8489 33.0273 15.9908 32.966 15.9908 32.966L14.9434 32.8425C13.2467 32.644 11.9443 31.1233 12.002 29.3346C12.002 29.2917 12.0057 29.2519 12.0081 29.2103C12.0547 28.4365 12.3261 27.6961 12.7858 27.0885C12.9725 26.8461 13.2009 26.6425 13.4592 26.4882L22.4782 21.0725C24.3414 19.9535 25.8931 19.562 26.6999 17.5341C26.9974 16.7757 27.126 15.9562 27.0757 15.1379L27.0446 14.5865L27.9651 19.9204C28.083 20.8264 27.9013 21.7537 27.4211 22.5169C27.1326 22.9785 26.7475 23.3653 26.2951 23.6479L15.8295 28.8943C15.8191 28.9006 15.809 28.9074 15.7993 28.9149C15.5127 29.1293 15.6896 29.6069 16.0403 29.5867L24.7515 29.6403C26.4433 29.5417 27.8526 31.2112 27.8489 32.9844Z"
                            fill="white"/>
                    </svg>
                </i>
                <h1 className="text-lg text-[#0C1024] font-black font-[Manrope]">
                    Sociales-Netzwerk
                </h1>
            </div>

            <div className='hidden lg:w-4/10 lg:flex lg:items-center'>
                <UserList/>
                {isDesktop && isViewingUser ? <UserModal/> : <Outlet/>}
            </div>

            {isDesktop ? (
                    <Link
                        className='lg:w-1/5 lg:h-24 lg:fixed lg:right-1/20 lg:top-0 lg:justify-end flex items-center gap-4'
                        onClick={() => dispatch(logout())}
                        to="/auth"
                    >
                                <span className='text-[#27364B] text-md'>
                                    Abmelden
                                </span>
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.6666 18V16.3333C16.6666 15.4493 16.3155 14.6014 15.6903 13.9763C15.0652 13.3512 14.2174 13 13.3333 13H6.66665C5.78259 13 4.93474 13.3512 4.30962 13.9763C3.6845 14.6014 3.33331 15.4493 3.33331 16.3333V18"
                                stroke="#27364B" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M10 9.66667C11.841 9.66667 13.3334 8.17428 13.3334 6.33333C13.3334 4.49238 11.841 3 10 3C8.15907 3 6.66669 4.49238 6.66669 6.33333C6.66669 8.17428 8.15907 9.66667 10 9.66667Z"
                                stroke="#27364B" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>
                )
                :
                (
                    <Link
                        onClick={() => dispatch(logout())}
                        to="/auth"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_125_226)">
                                <path d="M13.3333 13.3333L10 10L6.66666 13.3333" stroke="#5D6778"
                                      strokeWidth="1.75"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10 10V17.5" stroke="#5D6778" strokeWidth="1.75" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                                <path
                                    d="M16.9917 15.325C17.8044 14.8819 18.4465 14.1807 18.8166 13.3322C19.1866 12.4836 19.2635 11.536 19.0352 10.6389C18.8068 9.74179 18.2862 8.94626 17.5556 8.37787C16.8249 7.80948 15.9257 7.50061 15 7.5H13.95C13.6978 6.52436 13.2276 5.61861 12.575 4.85082C11.9223 4.08304 11.104 3.47321 10.1817 3.06717C9.25946 2.66113 8.25712 2.46946 7.25009 2.50657C6.24307 2.54367 5.25755 2.80858 4.36764 3.28138C3.47774 3.75419 2.70659 4.42258 2.11218 5.23631C1.51777 6.05005 1.11557 6.98794 0.935814 7.97949C0.756055 8.97104 0.803418 9.99044 1.07434 10.961C1.34527 11.9317 1.8327 12.8282 2.5 13.5833"
                                    stroke="#5D6778" strokeWidth="1.75" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                                <path d="M13.3333 13.3333L10 10L6.66666 13.3333" stroke="#5D6778"
                                      strokeWidth="1.75"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_125_226">
                                    <rect width="20" height="20" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </Link>
                )
            }
        </header>
    )
}

export default Header
