import React, { useState } from 'react'

// ==========------ReactIcons
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

// ==============-------FireBase
import { initializeApp } from "firebase/app";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Bounce, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userData } from '../../slice/UserSlice';

// =========----Tost




const Login = () => {
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==========  use state part

    const [show, setShow] = useState(false);
    const [formDaat, setFormData] = useState({ email: '', password: '',});
    const [error, setError] = useState({ emailError: '', passwordError: '',  });
    const navigate = useNavigate()
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==========  firebase dom part
    const auth = getAuth();
    const dispatch = useDispatch()
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= function part
    const handelSubmit = (e) => {
        e.preventDefault();
        if (formDaat.password == '') {
            setError((pera) => ({ ...pera, passwordError: 'Enter your password⚠' }));
        }
        if (formDaat.email == '') {
            setError((pera) => ({ ...pera, emailError: 'Enter your e-mail⚠' }));
        } else {
        signInWithEmailAndPassword(auth, formDaat.email, formDaat.password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log(user)
                if(user.emailVerified == true) {
                    //---------------- Navigate to the home page
                    navigate('/')
                    toast.success('loggin Success', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    }); 
 //----------------- store the users data 
                dispatch(userData(user)
            )   
            localStorage.setItem('currentUser' , JSON.stringify(user) )
        }else{
                    toast.info('Email is not verified',{
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });      
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                // console.log(errorCode)
                if(errorCode){
                    toast.info('Somthing went wrong', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                        });
                    
                }

            });
        }

    };





    return (
        <>
            <div className='flex justify-center items-center h-screen'>
                <div id="login" className="w-64 h-90 bg-indigo-50 rounded shadow flex flex-col justify-between p-3 ">
                    <form className="text-indigo-500">
                        <div className="border-4 border-dotted border-indigo-500 p-5">

                            {/* -=-==-=--==-=- welcome */}
                            <legend className="px-[10px] italic -mx-[8.8px]">Welcome again!</legend>
                            {/* -=-==-=--==-=- Mail */}
                            <div className="">
                                <label className="text-xs font-bold after:content-['*'] after:text-red-400" htmlFor="email">Mail </label>
                                <p className=' text-[12px] text-red-500 '>{error.emailError}</p>
                                <input onChange={(e) => { setFormData((para2) => ({ ...para2, email: e.target.value })), setError((pera) => ({ ...pera, emailError: '' })); } } className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500" type="email" />

                            </div>
                            {/* -=-==-=--==-=- Password */}
                            <div className="relative">
                                <label className="text-xs font-bold after:content-['*'] after:text-red-400" htmlFor="password">Password  </label>
                                <p className=' text-[12px] text-red-500 '>{error.passwordError}</p>
                                <input onChange={(e) => { setFormData((para3) => ({ ...para3, password: e.target.value })), setError((pera) => ({ ...pera, passwordError: '' })); } } className="w-[170px] p-2 mb-2 mt-1 outline-none ring-none focus:ring-2  focus:ring-indigo-500" type={show ? 'text' : 'password'} />
                                {show ?
                                    <VscEye onClick={() => { setShow(false); } } className=' absolute top-[55%] right-[-8px]   ' />
                                    :

                                    <VscEyeClosed onClick={() => setShow(true)} className=' absolute top-[55%] right-[-8px]   ' />}
                            </div>
                            {/*-=-=-=-=-=-=- Login page e jawar button */}
                            <Link to='/register' className=' text-[10px] '>Apnar jodi account na thake, <span className=' text-[12px] font-bold  '>Resister</span> </Link>



                            {/* -=-==-=--==-=- Loggin Button */}
                            <button onClick={handelSubmit} className="w-full rounded bg-indigo-500 text-indigo-50 p-2 text-center font-bold hover:bg-indigo-400" type='submit'>Login</button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login