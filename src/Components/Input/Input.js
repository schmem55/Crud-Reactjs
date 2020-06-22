import React, { useState } from 'react';
import './input.css';

export default function Input(props) {
  const [members,setMembers] = useState([])
  const [value,setValue] = useState()

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
      name:value
    }
    await setMembers(prevState=>[...members,newMember])
    setValue('')
  }

  function deleteMember (id){
    setMembers(members.filter((member)=>member.id !== id))
  }

  function updateMember(id){
    setMemberToUpdate({
      id:id,
      name:""
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
    setValue('')
    setIsUpdating(prevState=>false)
  }

  return (
    <div>
      <h1>CRUD EXCERCISE</h1>
      
        <div className="Forms">  
          <form onSubmit={(e)=>handleSubmit(e)}>
            <label>
              Name:
              <input value ={value?value:''} onChange={e => setValue(e.target.value)}/>
            </label>
            <input type="submit" value="Add Member" />
          </form>
        </div>
      
    
      
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

