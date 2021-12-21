import React, {useState} from "react";
import {v4 as uuidv4} from 'uuid';  

function NewPlantForm({ onAddNewItem }) {
  const [newPlant, setNewPlant] = useState({
    id: uuidv4,
    name: "",
    image: "",
    price: ""
  })

  function handleSubmit(event) {
    event.preventDefault()
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPlant)
    })
    .then((response) => response.json)
    .then((newPlant) => onAddNewItem(newPlant))
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setNewPlant({
      ...newPlant,
      [name]: value,
    })
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" name="name" placeholder="Plant name" value={newPlant.name} />
        <input onChange={handleChange} type="text" name="image" placeholder="Image URL" value={newPlant.image} />
        <input onChange={handleChange} type="number" name="price" step="0.01" placeholder="Price" value={newPlant.price} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
