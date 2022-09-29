import { useState } from "react";

const Form = (props) => {
  const [species, setSpecies] = useState({
    common_name: "",
    scientific_name: "",
    population:"",
    conservation_status: "CE"
  });

  //create functions that handle the event of the user typing into the form
  const handleCommonNameChange = (event) => {
    const common_name = event.target.value;
    setSpecies((species) => ({ ...species, common_name }));
  };

  const handleSciNameChange = (event) => {
    const scientific_name = event.target.value;
    setSpecies((species) => ({ ...species, scientific_name }));
  };

  const handlePopulation = (event) => {
    const population = event.target.value;
    setSpecies((species) => ({ ...species, population }));
  };

  const handleCodeChange = (event) => {
    const conservation_status = event.target.value;
    setSpecies((species) => ({ ...species, conservation_status }));
  };

  //A function to handle the post request
  const postSpecies = (newSpecies) => {
    return fetch("http://localhost:5000/api/species", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSpecies),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("From the post ", data);
        props.addSpecies(data);
      });
  };

  const handleSubmit = (e) => {
    let emptySpecies ={
      common_name: "",
      population: "",
      conservation_status: "",
    }
    e.preventDefault();
    setSpecies(species);
    postSpecies(species);
    setSpecies(emptySpecies);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
      <label>Common Name</label>
        <input
          type="text"
          id="add-common-name"
          placeholder="Common Name"
          required
          value={species.common_name}
          onChange={handleCommonNameChange}
        />
        <label>Scientific Name</label>
        <input
          type="text"
          id="add-scientific-name"
          placeholder="Scientific Name"
          required
          value={species.scientific_name}
          onChange={handleSciNameChange}
        />
        <label>Population</label>
        <input
          type="number"
          id="add-population"
          placeholder="Population"
          required
          value={species.population}
          onChange={handlePopulation}
        />
       <select name="conservationstatus" onChange={handleCodeChange}>
          <option value="EN">Endangered</option>
          <option value="TH">Threatened</option>
          <option value="WA">Watch</option>
          <option value="FI">Finew</option>
          <option value="NC">No Concern</option>
       </select>
      </fieldset>
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
