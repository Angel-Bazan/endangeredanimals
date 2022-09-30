import { useState, useEffect } from "react";
import SightingsForm from "./sightingsForm";

function Sightings() {
  const [sightings, setSightings] = useState([]);

  const addSightings = (newSightings) => {
    setSightings((sightings) => [...sightings, newSightings]);
  };

  const deleteSightings = async (deleteId) => {
    await fetch(`http://localhost:5000/api/sightings/${deleteId}`, {
      method: "DELETE",
    });

    await getSightings(); //
  };
  const getSightings = async () => {
    const response = await fetch(`http://localhost:5000/api/sightings`);
    const sighting = await response.json();
    setSightings(sighting);
  };
  useEffect(() => {
    getSightings();
  }, []);

  return (
    <section className="sightings">
      <h2 className="list-of-sightings"> List of Sghtings </h2>
      <ul className="row justify-content-md-center list-unstyled">
        {sightings.map((sighting, index) => (
          <li key={index} className="col col-sm-6 mb-3" >
            <div className="card">
              <div className="card-body">
                <strong>Nick_Name:</strong>
                {sighting.nick_name} <br /> <strong>Location:</strong>
                {sighting.location} <br /> <strong>Date Time:</strong>
                {sighting.date_time} <br />
                <button  className="btn btn-danger">
                  <span
                   
                    onClick={() => deleteSightings(sightings.id)}
                  >
                    delete
                  </span>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <SightingsForm addSightings={addSightings} />
    </section>
  );
}

export default Sightings;
