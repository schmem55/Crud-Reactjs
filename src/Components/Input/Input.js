import React, { useState } from 'react';
import './input.css';

export default function Input(props) {
  const [members,setMembers] = useState([])

  const [name,setName] = useState()
  const [amount,setAmount] = useState()

  const [isUpdating,setIsUpdating] = useState(false)
  const [memberToUpdate,setMemberToUpdate]=useState({
    id:"",
    name:""
  })

  async function handleSubmit(e){
    
    e.preventDefault()
    let indexMember = members.length +1;
    let newMember = {
      id:indexMember,
      name:name,
      amount:amount
    }
    await setMembers(prevState=>[...members,newMember])
    setName('')
    setAmount('')
  }

  function deleteMember (id){
    setMembers(members.filter((member)=>member.id !== id))
  }

  function updateMember(id){
    setMemberToUpdate({
      id:id,
      name:"",
      amount:""
    })

    setIsUpdating(prevState => true)
  }


  async function handleUpdate(e){
    e.preventDefault()
    console.log(memberToUpdate)
    let newMember = {
      id:memberToUpdate.id,
      name:memberToUpdate.name
    }

    await setMembers(members.map((member)=>(member.id === newMember.id? newMember:member)))
    setName('')
    setIsUpdating(prevState=>false)
  }

  return (
    <div>
      <h1>CRUD EXCERCISE</h1>
      
      
          <form onSubmit={(e)=>handleSubmit(e)}>
           <div className="Forms">  
            <label>
              Name:
              <input value ={name?name:''} onChange={e => setName(e.target.value)}/>
            </label>
            <label>
              Amount:
              <input value ={amount?amount:''} onChange={e => setAmount(e.target.value)}/>
            </label>
          </div>
            <input className="Add"type="submit" value="Add " />
          </form>
       
      
    
      
      <div className="Members">
        {members.length>0?
          members.map((k)=>
            <p className="UserDetails" key={k.id}>
              {k.name}
              <div className="Buttons">
                <button onClick={()=>deleteMember(k.id)}>delete</button>
                <button onClick={()=>updateMember(k.id)}>update</button>
              </div>
            
            </p>
        ):
        <p>no members added</p>}
      </div>

      {isUpdating && (
        <div className="d-flex justify-content-center"> 
          <div className="p-2 col-example text-left Updating">
          <form  onSubmit={(e)=>handleUpdate(e)} >
            <label>
              Name:
              <input value ={memberToUpdate.name?memberToUpdate.name:''} 
                onChange={e => setMemberToUpdate({
                ["id"]:memberToUpdate.id,
                ["name"]:e.target.value
                })}/>
            </label>
          <input type="submit" value="Add Member" />
        </form>
      
          </div>

        </div>
       
      )}
     
     
     
    </div>
  );
}

