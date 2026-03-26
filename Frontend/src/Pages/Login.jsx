import React, { useState } from 'react'
import API from '../Api.js';
import { useNavigate } from "react-router-dom";

function Login() {

    const [isLogin, setIsLogin] = useState(true);
    const [signUpName, setSignUpName] = useState("")
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post('/login', { email, password });

            localStorage.setItem("user", "true");
            console.log(res.data);
            navigate("/home");
        } catch (error) {
            alert("Login failed ❌", error.response?.data?.message);
        }
    }

    const handleSignUp = async (e) => {

        e.preventDefault();
        
        if (signUpPassword !== confirmPassword) {
            alert("Password do not match ❌")
        }

        else {
            try {
                const res = await API.post('/signup', { name: signUpName, email: signUpEmail, password: signUpPassword })
                console.log(res.data);
                alert("User registerd Successfully!");
            } catch (error) {
                alert("User Already Exists!", error.response?.data?.message);
            }
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-950 to-blue-800  overflow-y-hidden'>
            <div className='flex h-screen justify-center items-center text-[#fff] gap-10'>
                <div className='md:flex items-stretch'>
                    <div className=' flex flex-col justify-center  bg-transparent p-10'>

                        <h1 className='text-4xl'>Welcome to <span className='text-4xl'>SmartNotes AI</span></h1>
                        <p className='text-lg font-light mt-2 max-w-md'>Smart extraction of important concepts and Study 2x faster with key highlights</p>
                    </div>
                    <div className=' flex flex-col p-10 text-gray-800 bg-[#fff] rounded-r-2xl'>
                        <h2 className='text-3xl'>Access your account</h2>
                        <p className='text-lg mt-2'>Sign in or craete a free account to continue</p>
                        <div className='flex gap-5 my-3'>
                            <button onClick={() => setIsLogin(true)} className={`cursor-pointer p-2 px-10 rounded-xl w-full ${isLogin ? "bg-gradient-to-l from-blue-800 to-blue-500 text-white" : "bg-white border"}`}>Login</button>
                            <button onClick={() => setIsLogin(false)} className={`cursor-pointer p-2 px-10 rounded-xl w-full ${!isLogin ? "bg-gradient-to-l from-blue-800 to-blue-500 text-white" : "bg-white border"}`}>Sign Up</button>
                        </div>

                        {isLogin ? (

                            <form className='' onSubmit={handleLogin}>
                                <label htmlFor='email ' className='block my-2'>Email</label>
                                <input id='email' value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='example@gmail.com' className='border rounded w-full p-2'></input>

                                <label htmlFor='password' className='block my-2'>Password</label>
                                <input id='password' value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Your Password' className='border rounded w-full p-2'></input>

                                <button type='submit' className='cursor-pointer w-full bg-gradient-to-l from-blue-800 to-blue-500  hover:bg-gradient-to-r from-blue-800 to-blue-500 p-2 px-10 rounded-xl mt-3 text-[#fff]' >Sign in</button>
                                <span className='my-3 block text-sm text-center'>Forgot password?</span>
                            </form>
                        ) : (

                            <form onSubmit={handleSignUp} className=''>
                                <label htmlFor='SignUpName' className='block my-2'>Name</label>
                                <input type='text' value={signUpName} onChange={(e) => setSignUpName(e.target.value)} id='SignUpName' placeholder='Full Name' className='border rounded w-full p-2'></input>

                                <label htmlFor='SignUpEmail ' className='block my-2'>Email</label>
                                <input id='SignUpEmail' value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} type='email' placeholder='example@gmail.com' className='border rounded w-full p-2'></input>

                                <label htmlFor='SignUpPassword' className='block my-2'>Password</label>
                                <input id='SignUpPassword' value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} type='password' placeholder='Your Password' className='border rounded w-full p-2'></input>

                                <label htmlFor='confirm' className='block my-2'>Confirm Password</label>
                                <input id='confirm' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type='password' placeholder='Re-enter Password' className='border rounded w-full p-2'></input>

                                <button type='submit' className='cursor-pointer w-full bg-gradient-to-l from-blue-800 to-blue-500  hover:bg-gradient-to-r from-blue-800 to-blue-500 p-2 px-10 rounded-xl mt-3 text-[#fff]'>Sign up</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login
