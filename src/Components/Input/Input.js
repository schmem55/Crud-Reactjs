import React, { useState } from 'react';
import './input.css';
import Members from '../Members/Members'
function Input() {
  const [members,setMembers] = useState([])


  return (
    <div>
      <h1>CRUD EXCERCISE</h1>
      <input/>
      <button onClick={()=>setMembers("rien")}>Add new member</button>
      <Members/>
    </div>
  );
}

export default Input;
