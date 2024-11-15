import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { Posts, Task } from "./types";

  
export function useTaskFilter(
  text: string,
  fromDate: Date,
  toDate: Date,
  status: string[],
  toDateTriggred: boolean,
  fromDateTriggred: boolean
) {
    const tasks = useSelector((state: RootState) => state.taskStore.tasks);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    const timer = setTimeout(() => {
      const textFilter = text.trim().toLowerCase();
      const fromdate = new Date(fromDate);
      const todate = new Date(toDate);
      fromdate.setHours(0, 0, 0, 0);
      todate.setHours(23, 59, 59, 999);
      let filteredTasksArray = tasks;
      if (status.length > 0) {
        filteredTasksArray = filteredTasksArray.filter((task) => (
           status.includes(task.status)
        ));
      }
      if(fromDateTriggred) {
        filteredTasksArray = filteredTasksArray.filter(task => new Date(task.dueDate) >= fromdate);
      }
      if (toDateTriggred) {
        filteredTasksArray = filteredTasksArray.filter(task => new Date(task.dueDate) <= todate);
      }
      if (textFilter) {
        filteredTasksArray = filteredTasksArray.filter(task =>
          task.title.toLowerCase().includes(textFilter)
        );
      }
      setFilteredTasks(filteredTasksArray);
    }, 500);

    return () => clearTimeout(timer); 
  }, [text, tasks, status, fromDate, toDate, toDateTriggred, fromDateTriggred]);

  return filteredTasks;
}








export const useFetchTasks = async () => {
    const [result, setResult] = useState<string>("rendering");
    const [data, setDate] = useState<Posts[]>([]);
    async function getdetails() {
        const respose = await fetch("https://gorest.co.in/public/v2/posts");
        if (respose.ok) {
            const details = await respose.json();
            setDate(details);
            setResult("success");
        }
        else {
            setResult("failure");
        }
    }
    useEffect(() => {
        getdetails();
    }, [])

    return { result, data };
}


//                            in general approach


// const useFetchTasks = async(url:string,method:string,body) =>{
//     const [result, setResult] = useState<string>("rendering");
//     const [data, setDate] = useState([]);
//     async function getdetails(){
//          if(method == "get" || method == "delete"){
//                 const respose = await fetch(url,{
//                     method: method,
//                     headers: {
//                         'content-type': 'application/json',
//                         accept: 'application/json',
//                         authorization: 'Bearer token',
//                     },
//             }
//             );
//             if(respose.ok){
//                 const details = await respose.json();
//                 setDate(details);
//                 setResult("success");
//             }
//             else{
//                 setResult("failure");
//             }
//          }
//             else{
//                 const respose = await fetch(url,{
//                     method: method,
//                     headers: {
//                         'content-type': 'application/json',
//                         accept: 'application/json',
//                         authorization: 'Bearer token',
//                     },
//                     body:body
//             }
//             );
//             if(respose.ok){
//                 const details = await respose.json();
//                 setDate(details);
//                 setResult("success");
//             }
//             else{
//                 setResult("failure");
//             }
//             }
//     }
//     useEffect(()=>{
//         getdetails();
//     },[url,method])

//     return {result,data};
// }