import {getPosts} from "../features/feedSlice.js";
import {logout} from "../features/authSlice.js";
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {Link} from "react-router";
import Post from "../components/Post.jsx";
import AddPost from "./AddPost.jsx";

const Feed = () => {
    const dispatch = useDispatch();
    const filteredPosts = useSelector((state) => state.feed.filteredPosts);

    useEffect(() => {
        dispatch(getPosts());
    }, []);

    return (
        <div className="w-full flex flex-col items-center justify-between bg-[#FAFBFF]">
            <div className="w-full flex justify-around items-center text-white fixed bg-white px-2 py-3 z-50">
                <div className="flex items-center">
                    <i>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20.4769 7.34854L14.204 3.55509C13.6119 3.19292 12.9388 3.0015 12.2532 3.00031C10.2094 3.00031 8.33475 4.71225 8.33475 7.10502V21.3073L20.4769 13.9669C22.9083 12.4947 22.9083 8.81996 20.4769 7.34854ZM11.8484 14.448V6.86793L18.1163 10.6567L11.8484 14.448Z"
                                fill="#4C68D5"/>
                            <path
                                d="M23.8489 28.9844C23.8489 29.0273 11.9908 28.966 11.9908 28.966L10.9434 28.8425C9.24672 28.644 7.94425 27.1233 8.00197 25.3346C8.00197 25.2917 8.00565 25.2519 8.00811 25.2103C8.05471 24.4365 8.32608 23.6961 8.78582 23.0885C8.97253 22.8461 9.20091 22.6425 9.45916 22.4882L18.4782 17.0725C20.3414 15.9535 21.8931 15.562 22.6999 13.5341C22.9974 12.7757 23.126 11.9562 23.0757 11.1379L23.0446 10.5865L23.9651 15.9204C24.083 16.8264 23.9013 17.7537 23.4211 18.5169C23.1326 18.9785 22.7475 19.3653 22.2951 19.6479L11.8295 24.8943C11.8191 24.9006 11.809 24.9074 11.7993 24.9149C11.5127 25.1293 11.6896 25.6069 12.0403 25.5867L20.7515 25.6403C22.4433 25.5417 23.8526 27.2112 23.8489 28.9844Z"
                                fill="#4C68D5"/>
                        </svg>
                    </i>
                    <h1 className="text-lg text-[#0C1024] font-black font-[Manrope]">
                        Sociales-Netzwerk
                    </h1>
                </div>

                <Link
                    onClick={() => dispatch(logout())}
                    to="/auth"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_125_226)">
                            <path d="M13.3333 13.3333L10 10L6.66666 13.3333" stroke="#5D6778" strokeWidth="1.75"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 10V17.5" stroke="#5D6778" strokeWidth="1.75" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path
                                d="M16.9917 15.325C17.8044 14.8819 18.4465 14.1807 18.8166 13.3322C19.1866 12.4836 19.2635 11.536 19.0352 10.6389C18.8068 9.74179 18.2862 8.94626 17.5556 8.37787C16.8249 7.80948 15.9257 7.50061 15 7.5H13.95C13.6978 6.52436 13.2276 5.61861 12.575 4.85082C11.9223 4.08304 11.104 3.47321 10.1817 3.06717C9.25946 2.66113 8.25712 2.46946 7.25009 2.50657C6.24307 2.54367 5.25755 2.80858 4.36764 3.28138C3.47774 3.75419 2.70659 4.42258 2.11218 5.23631C1.51777 6.05005 1.11557 6.98794 0.935814 7.97949C0.756055 8.97104 0.803418 9.99044 1.07434 10.961C1.34527 11.9317 1.8327 12.8282 2.5 13.5833"
                                stroke="#5D6778" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13.3333 13.3333L10 10L6.66666 13.3333" stroke="#5D6778" strokeWidth="1.75"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_125_226">
                                <rect width="20" height="20" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </Link>
            </div>
            <AddPost/>
            <ul className="flex flex-col items-center justify-between mt-2 pb-18 gap-2">
                {filteredPosts.map((post) => (
                    <Post
                        post={post}
                        key={post._id}
                    />
                ))}
            </ul>
        </div>
    )
}

export default Feed
