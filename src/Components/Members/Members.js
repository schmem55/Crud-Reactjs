import React from 'react';
import './members.css';

export default function Members(props) {
  return (
    <div className="Members">
    {props.members.length>0? props.members.map((k,i)=>
        <p key={i}>{k}</p>
    ) :<p>no members added</p>}
    </div>
  );
}


