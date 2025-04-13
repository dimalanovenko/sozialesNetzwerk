import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendMoney} from "../features/transactionSlice.js";
import {getUser} from "../features/userSlice.js";
import {useLocation} from "react-router-dom";

const Transaction = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);

    const location = useLocation();

    const [amount, setAmount] = useState(0);
    const [userName, setUserName] = useState("");
    const [userAvatar, setUserAvatar] = useState("");

    const trDate = new Date()
    const trType = "out";

    const handleSend = () => {
        dispatch(getUser(userName));
        setUserAvatar(user.avatar)

        dispatch(sendMoney({amount, userName, userAvatar, trDate, trType}))

        setAmount(0)
        setUserName('')
    }

    return (
        <section className={`flex flex-col items-center justify-center h-[100vh] lg:w-1/5 lg:h-70 lg:fixed lg:right-1/20 lg:bg-white lg:rounded-lg lg:shadow-md ${location.pathname === '/profile' || location.pathname === '/change_profile' ? 'lg:top-102' : 'lg:top-35'}`}>
            <ul className="flex flex-col text-lg gap-4">
                <li className="hidden lg:block">
                    <h1 className='text-gray-700 text-2xl font-bold text-center mb-5'>
                        Transaktion
                    </h1>
                </li>
                <li>
                    <input
                        placeholder='Betrag'
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="text-[#4B5669] border rounded-lg border-[#E2E8F0] py-2 pl-6"
                        type="text"
                    />
                </li>
                <li className='flex flex-col'>
                    <input
                        placeholder='Benutzername'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="text-[#4B5669] border rounded-lg border-[#E2E8F0] py-2 pl-6"
                    />
                    <button
                        onKeyDown={(e) => e.key === 'Enter' ? handleSend() : null}
                        onClick={() => {
                            handleSend()
                        }}
                        className="flex justify-center items-center gap-2 bg-[#4C68D5] text-white rounded-2xl py-2 px-4 cursor-pointer mt-5"
                    >
                        Geld senden
                    </button>
                </li>
            </ul>
        </section>
    )
}

export default Transaction
