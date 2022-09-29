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
      <table id="species">
        {species.map((species, index) => {
          return (
            <tr key={index}>
              <td>
                <strong>Common Name:</strong>
                {species.common_name}
              </td>
                <br />
              <td>
                <strong>Scientific Name:</strong>
                {species.scientific_name}{" "}
              </td>
              <br />
              <td>
                <strong>Population:</strong>
                {species.population}
              </td>
              <br />
              <button>
                <span
                  className="material-symbols-outlined"
                  onClick={() => deleteSpecies(species.id)}>
                  delete
                </span>
              </button>
            </tr>
          );
        })}
      </table>
      <Form addSpecies={addSpecies} />
    </section>
  );
}

export default Species;
