import React, { useState } from 'react';
import './input.css';

export default function Input(props) {
  const [members,setMembers] = useState([])
  const [value,setValue] = useState()

  async function handleSubmit(e){
    e.preventDefault()


    let indexMember = members.length +1;

    let newMember = {
      id:indexMember,
      name:value
    }

    console.log(newMember)

    await setMembers(prevState=>[...members,newMember])
    setValue('')
  }

  function deleteMember (id){
    setMembers(members.filter((member)=>member.id !== id))
  }

  return (
    <div>
      <h1>CRUD EXCERCISE</h1>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <label>
          Name:
          <input value ={value?value:''} onChange={e => setValue(e.target.value)}/>
        </label>
        <input type="submit" value="Add Member" />
      </form>
      
      <div className="Members">
        {members.length>0?
          members.map((k)=>
            <p key={k.id}>
              {k.name}
              <button onClick={()=>deleteMember(k.id)}>delete</button>
            </p>
        ):
        <p>no members added</p>}
      </div>
     
     
    </div>
  );
}

