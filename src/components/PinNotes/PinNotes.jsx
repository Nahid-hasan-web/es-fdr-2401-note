import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";

const PinNotes = () => {




  // ========== redux data
  const sliceUser =  useSelector((state)=>state.currentUser.value)

  // =========== custom variables
  const [allNotes ,setAllNotes]   = useState([])
  const [showOptions , setShowOptions] = useState(false)
  const [uniqCard, setuniqCard]      = useState('')
  // ============ firebase variables
  const database = getDatabase();

  // ============ fuctions part

  // =========== realtime databse data
  useEffect(() => {
    
    onValue(ref(database, "AllNote/" ), (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        if(item.val().creatorId == sliceUser.uid && item.val().pin == true){
          arr.push({...item.val() , key:item.key})
        }
      })
      setAllNotes(arr)
    });
  }, []);




  return (
    <>
        <div className="flex  flex-wrap gap-5">
          {
            allNotes.map((item)=>(
          <div key={item.key} style={{background: item.bgColor}} className={`todo_singel_card w-[200px] relative  h-[200px] rounded-lg border-2  border-gray-300 p-2 mt-5`}>
            {
              
            }
            <div className="cardIcon  absolute top-2 right-2">
                <HiOutlineDotsVertical onClick={()=>{setShowOptions(!showOptions) , setuniqCard(item)}} />
                {
                  showOptions && uniqCard.key == item.key&&
                <div className="p-2 absolute top-full right-0 bg-gray-100  rounded-sm text-center">
                  <p className="text-[12px] font-normal font-roboto text-gray-500">UpPin</p>
                  <hr />
                  <p className="text-[12px] font-normal font-roboto text-gray-500">Edit</p>
                  <hr />
                  <p className="text-[12px] font-normal font-roboto text-gray-500">Remove</p>
                </div>
  
                }
            </div>
           
            <h2 className="text-xl font-semibold text-gray-500">{item.todoTitle}</h2>
            <p className="text-[14px] font-normal text-gray-400">
              {item.todoNote}
            </p>
          </div>
  
            ))
          }
        </div>
    </>
  );
};

export default PinNotes;
