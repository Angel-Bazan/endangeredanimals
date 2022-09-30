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
    <section className="species container">
      <h2 className="list-of-species">List of Species</h2>
      <ul id="species" className="row justify-content-md-center list-unstyled">
        {species.map((species, index) => {
          return (
            <li key={index} className="col col-sm-4 mb-3">
             
              <div className="card" style={{width: "18rem"}}>
              <img src={species.image} class="card-img-top" alt="..."></img>
                <div className="card-body">
               
                <br />
               
                  <strong>Common Name:</strong>
                  
                  {species.common_name}
                  <br />
                  <strong>Scientific Name:</strong>
                  {species.scientific_name} <br />
                  <strong>Population:</strong>
                  {species.population}
                  <br />
                  <strong>Conservation Status:</strong>
                  {species.conservation_status}
                  <br />
                  <button className="btn btn-danger">
                    <span
                      className="material-symbols-outlined"
                      onClick={() => deleteSpecies(species.id)}
                    >
                      delete
                    </span>
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <Form addSpecies={addSpecies} />
    </section>
  );
}

export default Species;
