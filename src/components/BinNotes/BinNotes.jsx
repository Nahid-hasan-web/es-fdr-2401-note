import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { GiWaterRecycling } from "react-icons/gi";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";
const BinNotes = () => {
  // ================ redux data
  const sliceUser = useSelector((alu) => alu.currentUser.value);

  // =============== variables
  const [removeData, setRemoveData] = useState([]);

  // =============== firebase variables
  const db = getDatabase();

  // =============== functions
  const handelbaperjonmeDelete = (deleteData) => {
    remove(ref(db, "binNotes/" + deleteData.key));
  };
  const handelSobDelete = () => {
    remove(ref(db, "binNotes/"));
  };

  const handelRecover = (recoverData) => {
    set(push(ref(db, "AllNote/")), {
      todoTitle: recoverData.todoTitle,
      todoNote: recoverData.todoNote,
      bgColor: recoverData.bgColor,
      pin: recoverData.pin,
      creatorId: sliceUser.uid,
    });
    remove(ref(db, "binNotes/" + recoverData.key));
  };
  // =============== realtime database
  useEffect(() => {
    onValue(ref(db, "binNotes/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().creatorId == sliceUser.uid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setRemoveData(arr);
    });
  }, []);

  console.log(removeData);

  return (
    <>
      <div className="pr-5">
        <div className="text-right">
          <button
            className="w-fit py-1 px-5 bg-gray-200"
            onClick={handelSobDelete}
          >
            Delete All
          </button>
        </div>
        {removeData.map((item) => (
          <div
            key={item.key}
            className=" singelRemoveItem flex justify-between mt-5"
          >
            <h2 className="text-2xl font-roboto font-medium text-gray-400">
              {item.todoTitle}
            </h2>
            <div className="buttons flex gap-3">
              <button
                onClick={() => handelbaperjonmeDelete(item)}
                className="group flex items-center justify-start w-[30px] h-[30px] bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-[100px] hover:rounded-lg active:translate-x-1 active:translate-y-1"
              >
                <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                  <FaRegTrashAlt className="text-white" />
                </div>
                <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-[14px] font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  Delete
                </div>
              </button>
              <button onClick={()=>handelRecover(item)} className="group flex items-center justify-start w-[30px] h-[30px] bg-[#D9EAFD] rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-[100px] hover:rounded-lg active:translate-x-1 active:translate-y-1">
                <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                  <GiWaterRecycling className="text-black" />
                </div>
                <div className="absolute right-5 transform translate-x-full opacity-0 text-black text-[14px] font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  Recover
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BinNotes;
