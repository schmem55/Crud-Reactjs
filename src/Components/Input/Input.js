import React, { useState } from 'react';
import './input.css';
import Members from '../Members/Members'

export default function Input(props) {
  const [members,setMembers] = useState([])
  const [value,setValue] = useState()
  
  async function handleSubmit(e){
    e.preventDefault()
    await setMembers(prevState=>[...members,value])
    setValue('')
    
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
      <Members members = {members}/>
    </div>
  );
}

