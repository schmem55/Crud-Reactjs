import React from 'react';
import './input.css';

function Input() {
  return (
    <div>
      <h1>CRUD EXCERCISE</h1>
      <input/>
      <button>Add new member</button>
      <div className="Members">
        <p>No members added</p>
      </div>
    </div>
  );
}

export default Input;
