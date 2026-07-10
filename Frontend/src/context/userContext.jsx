import { createContext,useState,useEffect } from "react";
import axios from "axios";


export const data=createContext();


function UserContext({children}){
    console.log("UserContext loaded");
    let [currentUser,setCurrentUser]=useState(null);
    const [loading, setLoading] = useState(true);
    const serverUrl="http://localhost:8000";
    const getUserdata=async()=>{
        try{
            let userData=await axios.get(`${serverUrl}/auth/getUserData`,{withCredentials:true});
            console.log("User Data:", userData.data);

            setCurrentUser(userData.data.user);


        }
        catch(error){
            console.error("Error fetching user data:", error);
        }
        finally{
            setLoading(false);
        }
    };

    const value={
        serverUrl,currentUser,setCurrentUser,loading,getUserdata
    }
    useEffect(()=>{
        console.log("Fetching user data...");
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