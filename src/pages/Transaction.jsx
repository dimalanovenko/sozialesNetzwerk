import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendMoney} from "../features/transactionSlice.js";
import {getUser} from "../features/userSlice.js";

const Transaction = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);

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
        <div className="flex flex-col items-center justify-between">
            <ul className="flex flex-col mt-40 font-bold text-xl">
                <li className="flex flex-col gap-2 mt-2 text-white">
                    <h1>Amount</h1>
                    <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? handleSend() : null}
                        onChange={(e) => setUserName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? handleSend() : null}
                        className="border rounded-lg border-teal-400"
                        type="text"
                    />
                </li>
                <li className="flex flex-col gap-2 mt-2 text-white">
                    <h1>userName</h1>
                    <input
                        value={userName}
                        className="border rounded-lg border-teal-400"
                        onClick={() => {
                            handleSend()
                        }}
                    />
                    <button
                        className="bg-zinc-800 text-teal-400 rounded-2xl py-2 px-4 cursor-pointer mt-5"
                    >
                        Send Money
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Transaction
