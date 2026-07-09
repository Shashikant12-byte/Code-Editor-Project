import { createContext,useState,useEffect } from "react";
import axios from "axios";

export const data=createContext();


function UserContext({children}){
    let [currentUser,setCurrentUser]=useState(null);
    const serverUrl="http://localhost:8000";
    const getUserdata=async()=>{
        try{
            let userData=await axios.get(`${serverUrl}/auth/getUserData`,{withCredentials:true});
            setCurrentUser(userData.data);

            console.log("user data",userData.data);

        }
        catch(error){
            console.error("Error fetching user data:", error);
        }
    };

    const value={
        serverUrl,currentUser,setCurrentUser
    }
    useEffect(()=>{
        getUserdata();
    },[]);

    const [user,setUser]=useState(null);
    const [isLoggedIn,setIsLoggedIn]=useState(false);
 
 
    return(
     <>
       <data.Provider value={value}>
        {children}
       </data.Provider>
     </>
    )
}
export default UserContext;