import React,{useEffect,useState} from 'react'
import profpic from '../assets/profpic.png'
import logo from '../assets/logo.png'
import {useNavigate} from 'react-router-dom'
import appIcon from '../assets/appIcon.png'
import { auth ,db,provider} from './Firebase'
import { addDoc, collection,deleteDoc,doc,getDoc, getDocs, updateDoc } from 'firebase/firestore'


function Content() {
  
  const[Tasks,setTasks]= useState([])
  const[Newtask,setNewtask] = useState('')
  const[EditTask,setEditTask]= useState(null)
  const navigate = useNavigate()
  const [name,setName] = useState()
  const [profpic,setDp] = useState()

  useEffect(() => //updating profile picture and name from user's account
    {
    const displayData = auth.onAuthStateChanged(user=>{
      if (user) {
        setName(user.displayName)
        setDp(user.photoURL)
      }
      else{
        navigate("/")
      }
  })

  return () => displayData()
  },[navigate])
// creating CRUD functionalities
  const taskref = collection(db,'Tasks-Collections')

  useEffect(() =>{
    const gettasks =async() =>{ //getting all the document data.that is, tasks in our case
      const data = await getDocs(taskref)
      const filteredData= data.docs.map(doc => ({...doc.data(),id:doc.id}))
      setTasks(filteredData)
    }   
    gettasks()
},[]);

  const Inputchange = (e)=>{
     setNewtask(e.target.value)
  }

  const Onsubmit = async()=>{
    setNewtask('')
    if(EditTask) {//if edittask variable is not null it updates a task
        const updateref = doc(db,'Tasks-Collections',EditTask.id)
        await updateDoc(updateref,{text:Newtask})
        setEditTask(null)
      }
    else{     //or else it adds a task
    await addDoc(taskref,{ text:Newtask,completed:false})
  }
  }

  const deletetask = async(tasks)=>{ // for deleting a tasks
    const docref = doc(db,'Tasks-Collections',tasks.id)
    await deleteDoc(docref)
  }

  const updatetask=async(tasks) =>{ //defining which task should be updated
    setNewtask(tasks.text)
    setEditTask(tasks)
  }
   
  const complete = async(tasks)=>{ //to show the completed and not completed tasks 
    const radioref = doc(db,'Tasks-Collections',tasks.id)
    await updateDoc(radioref,{completed:true})
  }

  return (
    
    <div className='mainContent' >
      <div className='secondaryContent'> 
        {/* LeftContent */}
        <div className='leftContent'>
          <div className='profileWithUsername'>
            <div className='profpicDiv'>
              <img src={profpic}  alt="" className='profpic'/>
            </div>
            <div className='usernamediv'>
            <h2>Hi,{name}</h2>
            </div>
          </div>
          <div className='animationHomeDiv'>
            <div className='animationHome'>
              <img src={logo} className='animation' alt="" />

            </div>
          </div>
        </div>


        {/* RightContent */}

        <div className='rightContent'>
          <div className='appNameDiv'>
            <div className='appName'>
              <h1>  To-Do-List-🗸</h1>
            </div>
          </div>
          
          <div className='taskListBox'>
            <div className='inputContent'>
{/*               this is where the users will add their tasks */}
                <input type='text' placeholder='Enter the task' value={Newtask} onChange={Inputchange}/>
                <button onClick={Onsubmit}> ✙ </button>                
            </div>
            <div className='tasklist'>
            <ul className='allTasks'>
            {
{/*               map function is used to renderthe list of tasks */}
            Tasks.map(tasks =>
            <li //li creates a template for each of the tasks in the list
              key={tasks.id}> 
              <div className='tasksdiv'> 
              
                <div className='taskContent'>   
{/*                   this is the radio button */}
                    <input type='radio' name='' id='' onClick={()=> complete(tasks) }checked = {taskref.completed} />
                    <span className={`${tasks.completed? 'completed': "notcompleted"}`} > {tasks.text}</span>
                </div>
                    
                <div className='buttons'>
                    <div className='updateButtondiv'>
{/*                       this is the update button  */}
                    <button className='updateButton' onClick={()=> updatetask(tasks)}> 🖍 </button>
                    </div>
                    <div className='deleteButtondiv'>
{/*                       this is the delete button  */}
                    <button className='deleteButton' onClick={()=> deletetask(tasks)}> ✘ </button>
                    </div>
                </div>
            </div>
            </li>
             )}
            </ul>
            </div>
          </div>      
        </div>
      </div>
    </div >
  )
}

export default Content
