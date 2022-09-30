import { useState } from "react";


const SightingsForm = (props) => {
  const [sightings, setSightings] = useState({
    nick_name: "",
    date_time: "",
    location:"",
    
  });

  //create functions that handle the event of the user typing into the form
  const handleNickNameChange = (event) => {
    const nick_name = event.target.value;
    setSightings((sightings) => ({ ...sightings, nick_name }));
  };

  const handleDateTime = (event) => {
    const date_time = event.target.value;
    setSightings((sightings) => ({ ...sightings, date_time }));
  };

  const handleLocation = (event) => {
    const location = event.target.value;
    setSightings((sightings) => ({ ...sightings, location }));
  };


  //A function to handle the post request
  const postSightings = (newSightings) => {
    return fetch("http://localhost:5000/api/sightings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSightings),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("From the post ", data);
        props.addSightings(data);
      });
  };

  const handleSubmit = (e) => {
    let emptySightings ={
      nick_name: "",
      date_time: "",
      location: "",
    }
    e.preventDefault();
    setSightings(sightings);
    postSightings(sightings);
    setSightings(emptySightings);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
      <label>Nick Name</label>
        <input
          type="text"
          id="add-nick-name"
          placeholder="Nick Name"
          required
          value={sightings.nick_name}
          onChange={handleNickNameChange}
        />
        <label>Date Time</label>
        <input
          type="datetime-local"
          id="add-date-time"
          placeholder="Date Time"
          required
          value={sightings.date_time}
          onChange={handleDateTime}
        />
        <label>Location</label>
        <input
          type="text"
          id="add-location"
          placeholder="Location"
          required
          value={sightings.location}
          onChange={handleLocation}
        />

      </fieldset>
      <button type="submit">Add</button>
    </form>
  );
};

export default SightingsForm;
