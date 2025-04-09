import { useNavigate } from "react-router-dom";
import User from "../pages/User.jsx";

const UserModal = () => {
    const navigate = useNavigate();

    const handleClose = () => navigate('/feed');

    return (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
            <div className="relative bg-white p-6 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl border border-zinc-200">
                <button
                    onClick={handleClose}
                    className="cursor-pointer absolute top-4 right-4 text-zinc-500 hover:text-zinc-800 text-3xl"
                >
                    ×
                </button>
                <User />
            </div>
        </div>
    );
};

export default UserModal;
