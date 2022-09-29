import { useState, useEffect } from "react";
// import Form from "./form";

function Sightings() {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/sightings")
      .then((response) => response.json())
      .then((sightings) => {
            setSightings(sightings);
          });
  }, []);



  return (
    <div className="sightings">
      <h2> List of Sghtings </h2>
      <ul>
        {sightings.map((sighting) => (
          <li key={`sighting-${sighting.id}`}>
            {" "}
            Nick_Name:{sighting.nick_name} Location:{sighting.location}  
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default Sightings;
