import { useEffect, useState } from "react";
import Form from "./form";

function Species() {
  const [species, setSpecies] = useState([]);

  const addSpecies = (newSpecies) => {
    setSpecies((species) => [...species, newSpecies]);
  };

  const deleteSpecies = async (deleteId) => {
    await fetch(`http://localhost:5000/api/species/${deleteId}`, {
      method: "DELETE",
    });

    await getSpecies(); //
  };
  const getSpecies = async () => {
    const response = await fetch(`http://localhost:5000/api/species`);
    const specie = await response.json();
    setSpecies(specie);
  };

  useEffect(() => {
    getSpecies();
  }, []);

  return (
    <section className="species">
      <h2>List of Species</h2>
      <ul id="species" className="spec-cards">
        {species.map((species, index) => {
          return (
            
            <li key={index} className="spec-card">
              
                <strong>Common Name:</strong>
                {species.common_name}
              
              <br />
              
                <strong>Scientific Name:</strong>
                {species.scientific_name}{" "}
              
              <br />
              
                <strong>Population:</strong>
                {species.population}
              
              <br />
              <button>
                <span
                  className="material-symbols-outlined"
                  onClick={() => deleteSpecies(species.id)}
                >
                  delete
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <Form addSpecies={addSpecies} />
    </section>
  );
}

export default Species;
