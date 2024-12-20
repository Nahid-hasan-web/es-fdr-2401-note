import React, { useState } from 'react'
import './Popup.css'
import { GiCancel } from "react-icons/gi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { IoMdColorFilter } from "react-icons/io";
import { IoSaveOutline } from "react-icons/io5";
import { getDatabase, push, ref, set } from "firebase/database";
import { useSelector } from 'react-redux';


const Popup = ({showValue , popCross}) => {
    // ============= redux data 
    const sliceUser =  useSelector((state)=>state.currentUser.value)


    const  [showColore , setShowColore]  = useState(false)
    const  [todoData , setTodoData]      = useState({todoTitle: '' , todoNote: '' , todoError: '' } )
    const [colors ,setColors]            = useState('#F8FAFC')

    // ============= firebase variables 
    const db = getDatabase();

    

    // ============= all fucntions part start
    
    
    // ----- seting data to database 
    const handelTodo = ()=>{
        if(todoData.todoTitle == ''){
            setTodoData((prev)=>({...prev , todoError:'enter yout todo title'}))
        }
        else if(todoData.todoNote == ''){
            setTodoData((prev)=>({...prev , todoError:'enter yout todo Note'}))
            console.log('ok')
        }else{
            set(push(ref(db, 'AllNote/')), {
                todoTitle:todoData.todoTitle,
                todoNote:todoData.todoNote ,
                bgColor: colors ,
                pin:false,
                creatorId:sliceUser.uid
              });
            popCross()
            setTodoData((prev)=>({...prev  , todoTitle: '' , todoNote: '' , todoError: ''}))
        }
    }


  return (
    <>
    
        <div className={`popup z-[999]  ${showValue? 'w-full' : 'w-0' } `}>
                <button onClick={popCross} className={`PopupCrossButton ${showValue? 'block':'hidden'} `}  >
                    <GiCancel />
                </button>
            {/* -=-=-= input fields */}
            <div style={{background: colors  }} className={`PopupInputField ${showValue? 'block':'hidden'}  `}>
                <p className='text-[12px] text-red-500'>{todoData.todoError}</p>
                <h2 className='PopupInputFieldTitle'>Title</h2>
                <input value={todoData.todoTitle} onChange={(e)=>setTodoData((prev)=>({...prev  ,todoTitle:e.target.value }))}  placeholder='Title.....' className='PopupInputFieldInput ' type="text" />
                <h2 className='PopupInputFieldTitle mt-2 '>Note</h2>
                <textarea value={todoData.todoNote} onChange={(e)=>setTodoData((prev)=>({...prev  ,todoNote:e.target.value }))} placeholder='Note.....' className=' PopupInputFieldNote shadow-[0px_6px_28px_16px_rgba(0,_0,_0,_0.2)]' type="text" />
                {/* -=-=-= All colors */}
               
               
                <div className=" relative flex justify-between  mt-2 md:mt-3 overflow-hidden ">
                    <div className=" flex gap-4  ">
                        <IoColorPaletteOutline onClick={()=>setShowColore(!showColore)} className='popupColorIcon overflow-hidden' />
                       
                        <div className={`PopupColors absolute bottom-0 flex gap-1 ${showColore? 'left-10' : 'left-[-195px]' } `}>
                        <button onClick={()=>setColors('#A294F9')} className="PopupColorButtons1"></button>
                        <button onClick={()=> setColors('#FF8000')} className="PopupColorButtons2"></button>
                        <button onClick={()=>setColors('#FCC737')} className="PopupColorButtons3"></button>
                        <div className="PopupCustomColor">
                            <label htmlFor="PopupCustomC">
                            <IoMdColorFilter className=' PopupCustomColorIcon  ' />
                            </label>
                        <input onChange={(e)=>setColors(e.target.value)} className='hidden' id='PopupCustomC' type="color" />
                        </div>
                        </div>
                    </div>
                    <div>
                    <button onClick={handelTodo} className="bg-white text-center w-[130px] rounded-2xl h-[50px] relative text-black text-xl font-semibold group" type="button">
                    <div className="bg-green-400 rounded-xl text-white h-[45px] w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[125px] z-10 duration-500">
                        <IoSaveOutline />
                    </div>
                    <p className="translate-x-2">Save</p>
                    </button>
                    </div>
                </div>
           
           
            </div>
        </div>
    
    </>
  )
}

export default Popup