import React, { useEffect, useState} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState("")

  useEffect(()=> {
    fetch("http://localhost:6001/plants")
    .then((response) => response.json())
    .then((plantData) => setPlants(plantData))
  }, [])
 
  function onAddNewItem (newPlant) {
    setPlants([...plants, newPlant])
  }

  const plantsToDisplay = plants.filter((plant) => {
    return plant.name.toLowerCase().includes(search.toLowerCase())
  })
  

  return (
    <main>
      <NewPlantForm onAddNewItem={onAddNewItem} />
      <Search search={search} setSearch={setSearch} />
      <PlantList plants={plantsToDisplay} />
    </main>
  );
}

export default PlantPage;
