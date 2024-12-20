import React, { useState } from 'react'

// ==========------ReactIcons
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

// ==============-------FireBase
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";

// =========----Tost
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, Flip, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';



const Resister = () => {

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==========  use state part
    
    const  [show , setShow] = useState(false)
    const [formDaat , setFormData] = useState({email: '' , password: '' , user: ''})
    const [error , setError] = useState({emailError: '' , passwordError: '' , userError: ''})
    const navigate = useNavigate()
    
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==========  firebase dom part

    const auth = getAuth();


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= function part

    const handelSubmit = (e) =>{
        e.preventDefault()
        if(formDaat.user == '' ){
            setError((pera)=>({...pera , userError: 'Enter your name⚠'}))
        }
        if(formDaat.password == '' ){
            setError((pera)=>({...pera , passwordError: 'Enter your password⚠' }))
        }
        if(formDaat.email == '' ){
                setError((pera)=>({...pera , emailError: 'Enter your e-mail⚠'}))
        }else{
            createUserWithEmailAndPassword(auth, formDaat.email, formDaat.password)
                .then((userCredential) => {
                    const user = userCredential.user;
// =----------------wsers photo & name update
                updateProfile(auth.currentUser, {
                displayName: formDaat.user, 
                photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy5LFtCqVlxw8xQ6psvzksbcgvXwEWK_eZkO6-TNawL5WUbOlmzcECyu9rN7ZjExvoGhI&usqp=CAU",
                }).then(() => {
                    
                    // -=-=-------------- sent email verification
                    sendEmailVerification(auth.currentUser)
                    .then(() => {
// ---------------------------- Navigate to the login page ----------------
                    navigate('/login')
//=----------------------------------success tost ------------------------- 
                    toast.info('Verify your e-mail', {
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
                    });


                }).catch((error) => {
                  
                });

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorCode == 'auth/email-already-in-use'){
                    toast.error('This email already in use', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Flip,
                        });
                }
                if(errorCode == 'auth/weak-password'){
                    toast.warn('This is a weak password ', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Flip,
                        });
                }

            });
       }
            
    }
         
       



  return (
    <>
        <div className='flex justify-center items-center h-screen'>
            <div id="login" className="w-64 h-90 bg-indigo-50 rounded shadow flex flex-col justify-between p-3 ">       
                <form className="text-indigo-500" >
                    <div className="border-4 border-dotted border-indigo-500 p-5" >

                        {/* -=-==-=--==-=- welcome */}
                            <legend className="px-[10px] italic -mx-[8.8px]">Welcome!</legend>

                        {/* -=-==-=--==-=- Name */}
                          <div className="">
                                <label className="text-xs font-bold after:content-['*'] after:text-red-400" htmlFor="email">Name </label>     
                                <p className=' text-[12px] text-red-500 '>{error.userError}</p>
                                <input onChange={(e)=>{setFormData((para)=>({...para ,user:e.target.value })), setError((pera)=>({...pera , userError: ''}))}} className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500" type="text" />   
                          </div>
                        {/* -=-==-=--==-=- Mail */}
                           <div className="">
                                <label className="text-xs font-bold after:content-['*'] after:text-red-400" htmlFor="email">Mail </label>     
                                <p className=' text-[12px] text-red-500 '>{error.emailError}</p>
                                <input onChange={(e)=>{setFormData((para2)=>({...para2 ,email: e.target.value})),  setError((pera)=>({...pera , emailError: ''}))}} className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500" type="email" />   
                            
                           </div>
                        {/* -=-==-=--==-=- Password */}
                           <div className="relative">
                                <label className="text-xs font-bold after:content-['*'] after:text-red-400" htmlFor="password">Password  </label>
                                <p className=' text-[12px] text-red-500 '>{error.passwordError}</p>
                                <input onChange={(e)=>{setFormData((para3)=>({...para3, password: e.target.value})),  setError((pera)=>({...pera , passwordError: ''}))}} className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2  focus:ring-indigo-500" type={show? 'text' : 'password'} />
                                    {
                                        show?
                                        <VscEye onClick={()=>{setShow(false)}} className=' absolute top-[55%] right-[6%]   '/>
                                        :
                                     
                                       <VscEyeClosed onClick={()=>setShow(true)} className=' absolute top-[55%] right-[6%]   '/>
                                    }
                            </div>      
                         {/*-=-=-=-=-=-=- Login page e jawar button */}
                        <Link to='/login' className=' text-[10px] ' >Apnar jodi account thake, <span className=' text-[12px] font-bold  '>Login</span> </Link>



                        {/* -=-==-=--==-=- Loggin Button */}
                            <button onClick={handelSubmit} className="w-full rounded bg-indigo-500 text-indigo-50 p-2 text-center font-bold hover:bg-indigo-400" type='submit'>Register</button>

                    </div >
                </form>
            </div>
        </div>
    </>
  )
}

export default Resister