import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { getUser } from "../../api/UserRequests";
const Conversation = ({ data, currentUser, online }) => {

  const [userData, setUserData] = useState(null)
  const dispatch = useDispatch()

  useEffect(()=> {

    const userId = data.members.find((id)=>id!==currentUser)
    const getUserData = async ()=> {
      try
      {
        await fetch(`${process.env.REACT_APP_BASEURL}/chat/getUser/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(res => res.json())
        .then(data => {
          setUserData(data)
          
        })
         
        //  dispatch({type:"SAVE_USER", data:data})
      }
      catch(error)
      {
        console.log(error)
      }
    }
    
    getUserData();
    
  }, [])
  return (
    <>
      <div className="follower conversation">
        <div className="">
          {online && <div className="online-dot"></div>}
          <img
            src={userData?.profilePic ? userData.profilePic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{fontSize: '0.8rem'}}>
            <span>{userData?.userName}</span>
            <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;