import React, { useState } from 'react';
import './input.css';

var displayedMembers = [{
  id:"1",
  name:"jeremy",
  amount:"1000",
  mitzva:"chichi",
  date:"korah"
},
{
  id:"2",
  name:"david",
  amount:"100",
  mitzva:"samoukh",
  date:"yitro"
},
{
  id:"3",
  name:"david",
  amount:"200",
  mitzva:"chichi",
  date:"yitro"
},
{
  id:"4",
  name:"aaron",
  amount:"226",
  mitzva:"hagbaa",
  date:"rosh hashana"
}]

export default function Input(props) {
  const [members,setMembers] = useState(displayedMembers)

  const [name,setName] = useState()
  const [amount,setAmount] = useState()
  const [mitzva,setMitzva] = useState()
  const [date,setDate] = useState()

  const [nameToSearch,setNameToSearch] = useState()
  const [isUpdating,setIsUpdating] = useState(false)
  const [memberToUpdate,setMemberToUpdate]=useState({
    id:"",
    name:"",
    amount:"",
    mitzva:"",
    date:""
  })

  async function handleSubmit(e){
    
    e.preventDefault()
    let indexMember = members.length +1;
    let newMember = {
      id:indexMember,
      name:name,
      amount:amount,
      mitzva:mitzva,
      date:date
    }
    await setMembers(prevState=>[...members,newMember])
    displayedMembers.push(newMember)
    setName('')
    setAmount('')
    setMitzva('')
    setDate('')
  }

  function deleteMember (id){
    const result = displayedMembers.filter((member)=>member.id !== id)
    setMembers(result)
    displayedMembers = result
  }

  function updateMember(id){
    setMemberToUpdate({
      id:id,
      name:"",
      amount:"",
      mitzva:"",
      date:""
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
      mitzva:memberToUpdate.mitzva,
      date:memberToUpdate.date
    }

    const result = displayedMembers.map((member)=>(member.id === newMember.id? newMember:member))
    await setMembers(result)
    displayedMembers = result
    setName('')
    setAmount('')
    setMitzva('')
    setDate('')
    setIsUpdating(prevState=>false)
  }

  function searchForName(input){
    setNameToSearch(input)
    const result = displayedMembers.filter((member)=>member.name.includes(input))
    console.log(input)
    setMembers(result)
  }
  return (
    <div>
      <h1>Exercise</h1>
          <form onSubmit={(e)=>handleSubmit(e)}>
           <div className="Forms">  
            <label>
              Name:
              <input required value ={name?name:''} onChange={e => setName(e.target.value)}/>
            </label>
            <label>
              Mitzva:
              <input required value ={mitzva?mitzva:''} onChange={e => setMitzva(e.target.value)}/>
            </label>
            <label>
              Amount:
              <input required value ={amount?amount:''} onChange={e => setAmount(e.target.value)}/>
            </label>
            <label>
            Paracha:
            <input required value ={date?date:''} onChange={e => setDate(e.target.value)}/>
            </label>
            

          </div>
            <input className="Add"type="submit" value="Add " />
          </form>
       
       <div className="Search">
        Search: <input value={nameToSearch?nameToSearch:''} onChange={e=>searchForName(e.target.value)}/>
       </div>
      <div className="Members">
     
        <div className="Title">
          <div className="UserItems">
            <span className="Item">
            Name
            </span>
            <span className="Item">
              Amount 
            </span>
            <span className="Item">
              Mitzva
            </span>
            <span className="Item">
              Date
            </span>
          </div>
          
        </div>
        {members.length>0?
          members.map((k)=>
            <div className="UserDetails" key={k.id}>

              <div className="UserItems">
                <span className="Item">
                  {k.name}
                </span>
                <span className="Item">
                  {k.amount}
                </span>
                <span className="Item">
                  {k.mitzva}
                </span>
                <span className="Item">
                  {k.date}
                </span>
               
              </div>

              <div className="Buttons">
                <button onClick={()=>deleteMember(k.id)}>delete</button>
                <button onClick={()=>updateMember(k.id)}>update</button>
              </div>
            
            </div>
        ):
        <p>no members </p>}
      </div>

      {isUpdating && (
        <div className="Updating"> 
          <div>
            <form onSubmit={(e)=>handleUpdate(e)} >
              <label>
                Name:
                <input 
                  required
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
                  required
                  value ={memberToUpdate.amount?memberToUpdate.amount:''} 
                  onChange={e => setMemberToUpdate({
                  "id":memberToUpdate.id,
                  "name":memberToUpdate.name,
                  "amount":e.target.value,
                  "mitzva":memberToUpdate.mitzva
                  })}/>
              </label>
              <label>
                Mitzva:
                <input 
                  required
                  value ={memberToUpdate.mitzva?memberToUpdate.mitzva:''} 
                  onChange={e => setMemberToUpdate({
                  "id":memberToUpdate.id,
                  "name":memberToUpdate.name,
                  "amount":memberToUpdate.amount,
                  "mitzva":e.target.value
                  })}/>
              </label>
              <label>
                Paracha:
                <input 
                  required
                  value ={memberToUpdate.date?memberToUpdate.date:''} 
                  onChange={e => setMemberToUpdate({
                  "id":memberToUpdate.id,
                  "name":memberToUpdate.name,
                  "amount":memberToUpdate.amount,
                  "mitzva":memberToUpdate.mitzva,
                  "date":e.target.value
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

