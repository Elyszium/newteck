import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/config";


const useGetDoc = (collectionName, id) => {
    const [course, setCourse] = useState(null)

    const getCourse = async()=>{    
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef, )
            if (docSnap.exists()) {               
                //  setCourse(docSnap.data())   
                const obj = {
                    id: IdleDeadline,
                    ...docSnap.data(),
                  };     
                  setCourse(obj)         
            }   
            else{
                toast.error("Courses not found");
            }
        } 
     useEffect(() => {  
        getCourse();   
    },[])
    
  return {course}
}

export default useGetDoc