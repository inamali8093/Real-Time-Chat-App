import React, { useCallback, useEffect, useState } from 'react'
import {Header,AppContainer, InputField, Button} from '../index'
import authSlice, { loginState,logoutState } from '../store/authSlice'
import { useSelector,useDispatch } from 'react-redux'
import service from '../appwrite/messages'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/authentication'
import { Trash } from 'react-feather'
import { Client } from 'appwrite'
import conf from '../envConfig/conf'

const ChatRoom = () => {
    
  const dispatch = useDispatch()
  const {register,handleSubmit} = useForm()
  const authStatus = useSelector(state => state.auth.status)
  //console.log(authStatus)
  const [messages,setMessages] = useState([])
  const [messageBody,setMessageBody] = useState('')
  const [user,setUser] = useState(null)

  const getMessage = async ()=>{
     const response = await service.getAllMessages()
    //console.log("ResponseMessage:",response.documents);
     setMessages(response.documents)
     //console.log(typeof(response.documents));
     
  }

  // const getUserOnLoad =  ()=>{
  //   const response = authService.getCurrentUser()
  //   .then((data)=>{
  //     return data
  //   })
  // }
  


  const getUserOnLoad = useCallback(()=>{
    authService.getCurrentUser()
    .then((data)=>{
      console.log("DATA:",data);
      setUser(data)
      console.log("USER:",user);
    })
  },[])

  
  

  useEffect(()=>{
       getMessage()
       getUserOnLoad()
       const unsubscribe = service.client.subscribe(`databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteCollectionId}.documents`, response => {
        // Callback will be executed on changes for documents A and all files.
        //console.log(response);

        if(response.events.includes( 
          "databases.*.collections.*.documents.*.create")){
            //console.log("MESSAGE WAS CREATED");
            setMessages(prev => [response.payload,...prev])
          }
          if(response.events.includes("databases.*.collections.*.documents.*.delete")){
            //console.log("MESSAGE WAS DELETED");
            setMessages(prev => prev.filter(message => message.$id !== response.payload.$id))
          }
    });

   // console.log('unsubscribe:',unsubscribe);

         return ()=>{
          unsubscribe()
         }

  },[])



  const createMessage = async (data)=>{
  
    console.log(messageBody);

    const payload = {
      // user_id: user.$id,
      // username: user.name,
      body: messageBody
    }
       

       let response = await service.createMessage(payload)
       //console.log("response:",response);

       setMessageBody('')

  }

  const messageDelete = async (messageId)=>{
     return await service.deleteMessage(messageId)
  }
  

  return (
    <>
     <Header/>
      <div className='max-w-full w-full flex flex-col justify-center items-center'>
        <div className='min-w-md outline w-[80%] md:w-[60%]  p-6'>
          {/* from here components starts */}
          {messages?.map((message)=>(
            <div className='outline bg-red-500 w-fit p-2 my-3 flex gap-6' key={message.$id}>
            {message.body}
            <Trash onClick={()=>{messageDelete(message.$id)}}/>
           </div>
          ))}

          {/* input for the message will start here */}
        <form onSubmit={handleSubmit(createMessage)} className='my-4 flex gap-3'>
          <InputField 
            placeholder = "Say Something..."
            {...register("message",{
              value: messageBody,
              required: true,
              maxLength:1000,
              onChange: (e)=>{setMessageBody(e.target.value)}
            })}
          />
          <Button>Send</Button>
        </form>
         {/* input for the message ends here  */}

        {/* here components ends */}
        </div>
        
      </div>
    </>
  )
}

export default ChatRoom
