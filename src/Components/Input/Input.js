import React, { useState } from 'react';
import './input.css';

export default function Input(props) {
  const [members,setMembers] = useState([])

  const [name,setName] = useState()
  const [amount,setAmount] = useState()
  const [mitzva,setMitzva] = useState()

  const [isUpdating,setIsUpdating] = useState(false)
  const [memberToUpdate,setMemberToUpdate]=useState({
    id:"",
    name:"",
    amount:"",
    mitzva:""
  })

  async function handleSubmit(e){
    
    e.preventDefault()
    let indexMember = members.length +1;
    let newMember = {
      id:indexMember,
      name:name,
      amount:amount,
      mitzva:mitzva
    }
    await setMembers(prevState=>[...members,newMember])
    setName('')
    setAmount('')
    setMitzva('')
  }

  function deleteMember (id){
    setMembers(members.filter((member)=>member.id !== id))
  }

  function updateMember(id){
    setMemberToUpdate({
      id:id,
      name:"",
      amount:"",
      mitzva:""
    })

    setIsUpdating(prevState => true)
  }


  async function handleUpdate(e){
    e.preventDefault()
    console.log(memberToUpdate)
    let newMember = {
      id:memberToUpdate.id,
      name:memberToUpdate.name,
      amount:memberToUpdate.amount,
      mitzva:memberToUpdate.mitzva
    }

    await setMembers(members.map((member)=>(member.id === newMember.id? newMember:member)))
    setName('')
    setAmount('')
    setMitzva('')
    setIsUpdating(prevState=>false)
  }

  return (
    <div>
      <h1>Exercise</h1>
          <form onSubmit={(e)=>handleSubmit(e)}>
           <div className="Forms">  
            <label>
              Name:
              <input value ={name?name:''} onChange={e => setName(e.target.value)}/>
            </label>
            <label>
              Mitzva:
              <input value ={mitzva?mitzva:''} onChange={e => setMitzva(e.target.value)}/>
            </label>
            <label>
              Amount:
              <input value ={amount?amount:''} onChange={e => setAmount(e.target.value)}/>
            </label>
          </div>
            <input className="Add"type="submit" value="Add " />
          </form>
       
      
    
      
      <div className="Members">
        <div className="Title">
          <div className="UserItems">
            <span>
            Name
            </span>
            <span>
              Amount 
            </span>
            <span>
              Mitzva
            </span>
          </div>
          
        </div>
        {members.length>0?
          members.map((k)=>
            <div className="UserDetails" key={k.id}>

              <div className="UserItems">
                <span>
                  {k.name}
                </span>
                <span>
                  {k.amount}
                </span>
                <span>
                  {k.mitzva}
                </span>
               
              </div>

              <div className="Buttons">
                <button onClick={()=>deleteMember(k.id)}>delete</button>
                <button onClick={()=>updateMember(k.id)}>update</button>
              </div>
            
            </div>
        ):
        <p>no members added</p>}
      </div>

      {isUpdating && (
        <div className="d-flex justify-content-center"> 
          <div className="p-2 col-example text-left Updating">
            <form  onSubmit={(e)=>handleUpdate(e)} >
              <label>
                Name:
                <input 
                  value ={memberToUpdate.name?memberToUpdate.name:''} 
                  onChange={e => setMemberToUpdate({
                  "id":memberToUpdate.id,
                  "name":e.target.value,
                  "amount":memberToUpdate.amount,
                  "mitzva":memberToUpdate.mitzva
                  })}/>
              </label>
              <label>
                Amount:
                <input 
                  value ={memberToUpdate.amount?memberToUpdate.amount:''} 
                  onChange={e => setMemberToUpdate({
                  "id":memberToUpdate.id,
                  "name":memberToUpdate.name,
                  "amount":e.target.value,
                  "mitzva":memberToUpdate.mitzva
                  })}/>
              </label>
              <label>
                Amount:
                <input 
                  value ={memberToUpdate.mitzva?memberToUpdate.mitzva:''} 
                  onChange={e => setMemberToUpdate({
                  "id":memberToUpdate.id,
                  "name":memberToUpdate.name,
                  "amount":memberToUpdate.amount,
                  "mitzva":e.target.value
                  })}/>
              </label>
              <input type="submit" value="Update Member" />
            </form>
      
          </div>

        </div>
       
      )}
     
     
     
    </div>
  );
}

