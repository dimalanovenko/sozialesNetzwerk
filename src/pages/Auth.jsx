import {useDispatch} from "react-redux";
import {loginSuccess} from "../features/authSlice.js";

import axios from "axios";

import {useForm} from "react-hook-form";
import {useState} from "react";
import {useNavigate} from "react-router";

const Auth = () => {
    const dispatch = useDispatch();
    const {handleSubmit, register, reset, formState: {errors}} = useForm();
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const url = isSignUp
                ? "http://49.13.31.246:9191/signup"
                : "http://49.13.31.246:9191/signin";

            const body = isSignUp
                ? {
                    username: data.username,
                    password: data.password,
                    confirm_password: data.confirm_password,
                }
                : {
                    username: data.username,
                    password: data.password,
                };

            const response = await axios.post(url, body, {
                headers: {"Content-Type": "application/json"},
            });

            console.log("Ответ сервера:", response.data);

            if (response.data.token) {
                dispatch(loginSuccess(response.data.token));
                reset();
                navigate("/feed");
            }
            if (response.data.jwt) {
                dispatch(loginSuccess(response.data.jwt));
                reset();
                navigate("/feed");
            }
        } catch
            (error) {
            console.error("Ошибка запроса:", error.response?.data || error.message);
        }
    };

    return (
        <div className="flex flex-col items-center text-white gap-3 mt-[25%]">
            <div className="flex items-center">
                <i>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.4769 7.34854L14.204 3.55509C13.6119 3.19292 12.9388 3.0015 12.2532 3.00031C10.2094 3.00031 8.33475 4.71225 8.33475 7.10502V21.3073L20.4769 13.9669C22.9083 12.4947 22.9083 8.81996 20.4769 7.34854ZM11.8484 14.448V6.86793L18.1163 10.6567L11.8484 14.448Z" fill="#4C68D5"/>
                        <path d="M23.8489 28.9844C23.8489 29.0273 11.9908 28.966 11.9908 28.966L10.9434 28.8425C9.24672 28.644 7.94425 27.1233 8.00197 25.3346C8.00197 25.2917 8.00565 25.2519 8.00811 25.2103C8.05471 24.4365 8.32608 23.6961 8.78582 23.0885C8.97253 22.8461 9.20091 22.6425 9.45916 22.4882L18.4782 17.0725C20.3414 15.9535 21.8931 15.562 22.6999 13.5341C22.9974 12.7757 23.126 11.9562 23.0757 11.1379L23.0446 10.5865L23.9651 15.9204C24.083 16.8264 23.9013 17.7537 23.4211 18.5169C23.1326 18.9785 22.7475 19.3653 22.2951 19.6479L11.8295 24.8943C11.8191 24.9006 11.809 24.9074 11.7993 24.9149C11.5127 25.1293 11.6896 25.6069 12.0403 25.5867L20.7515 25.6403C22.4433 25.5417 23.8526 27.2112 23.8489 28.9844Z" fill="#4C68D5"/>
                    </svg>
                </i>
                <h1 className="text-lg text-[#0C1024] font-black font-[Manrope]">
                    Sociales-Netzwerk
                </h1>
            </div>
            <form
                className="flex flex-col items-center gap-4 text-[#707988] font-normal"
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    className="w-80 h-[44px] border border-[#E2E8F0] rounded-[6px] py-3 px-6 mt-16"
                    type="text"
                    placeholder="Benutzername"
                    {...register("username", {required: "username required"})}
                />
                {errors.username && <span className="text-red-500">{errors.username.message}</span>}

                <input
                    className="w-80 h-[44px] border border-[#E2E8F0] rounded-[6px] py-3 px-6"
                    type="password"
                    placeholder="Passwort"
                    {...register("password", {required: "password required"})}
                />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}

                {isSignUp && (
                    <>
                        <input
                            className="w-80 h-[44px] border border-[#E2E8F0] rounded-[6px] py-3 px-6"
                            type="password"
                            placeholder="Passwort bästätigen"
                            {...register("confirm_password", {required: "confirm password..."})}
                        />
                        {errors.confirm_password &&
                            <span className="text-red-500">{errors.confirm_password.message}</span>}
                    </>
                )}
                <button
                    // onClick={() => dispatch(getPosts())}
                    className="w-full bg-[#0C1024] text-white rounded-[6px] py-3 px-6 cursor-pointer mt-[24px]"
                    type="submit"
                >
                    {isSignUp ? "Registrieren" : "Anmelden"}
                </button>
            </form>
            <button
                className='text-[#4B5669] mt-4'
                onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? <p className='cursor-pointer'>Haben Sie schon ein Konto? <span className='font-bold'>Anmelden</span></p>  :
                    <p className='cursor-pointer'>Don't have an account?  <span className='font-bold'>Registrieren</span></p>
                }
            </button>
        </div>
    );
};

export default Auth;

