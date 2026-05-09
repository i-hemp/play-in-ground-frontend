import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo Area */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center shadow-xl shadow-green-500/20 mb-4 transform rotate-12">
                        <span className="text-3xl font-black text-black">P</span>
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-white">PlayInGround</h1>
                    <p className="text-gray-500 mt-2 font-medium">Elevate your game today.</p>
                </div>

                {/* Card Container */}
                <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-[3rem] p-8 md:p-12 shadow-2xl">
                    {isLogin ? (
                        <Login onSwitch={() => setIsLogin(false)} />
                    ) : (
                        <Signup onSwitch={() => setIsLogin(true)} />
                    )}
                </div>
                
                {/* Support Text */}
                <p className="mt-8 text-center text-gray-600 text-sm font-medium">
                    Secure. Fast. Simple.
                </p>
            </div>
        </div>
    );
}
