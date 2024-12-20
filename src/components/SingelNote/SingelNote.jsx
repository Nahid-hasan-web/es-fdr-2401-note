import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, update, remove, set, push } from "firebase/database";
import { useSelector } from "react-redux";
import { HiOutlineDotsVertical } from "react-icons/hi";

const SingelNote = ({}) => {
  // ========== redux data
  const sliceUser =  useSelector((state)=>state.currentUser.value)

  // =========== custom variables
  const [allNotes ,setAllNotes]   = useState([])
  const [showOptions , setShowOptions] = useState(false)
  const [uniqCard, setuniqCard]      = useState('')
  // ============ firebase variables
  const db = getDatabase();

  // ============ fuctions part
  const handelPin =(pinNoteData)=>{
    
      update(ref(db , "AllNote/" + pinNoteData.key),{
        pin:true
      })
      setShowOptions(false)
  }
  const handelRemove  = (removeItem)=>{
    set(push(ref(db, 'binNotes/' )), {
      todoTitle:removeItem.todoTitle,
      todoNote:removeItem.todoNote ,
      bgColor: removeItem.bgColor ,
      pin:removeItem.pin,
      creatorId:sliceUser.uid , 
    });
    // ======= remove data 
    remove(ref(db , 'AllNote/' +removeItem.key))
  }
  // =========== realtime databse data
  useEffect(() => {
    
    onValue(ref(db, "AllNote/" ), (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        if(item.val().creatorId == sliceUser.uid){
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
                <button className="text-[12px] font-normal font-roboto text-gray-500" onClick={()=>handelPin(item)}>Pin</button>
                <hr />
                <button className="text-[12px] font-normal font-roboto text-gray-500">Edit</button>
                <hr />
                <button onClick={()=>handelRemove(item)} className="text-[12px] font-normal font-roboto text-gray-500">Remove</button>
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

export default SingelNote;
