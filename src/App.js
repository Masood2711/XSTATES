import React, {useEffect,useState} from "react";
import "./App.css"

function App(){
  const [countries,setCountries]=useState([]);
  const [states,setStates]=useState([]);
  const [cities,setCities]=useState([]);
  const [selectedCountry,setSelectedCountry]=useState("");
  const [selectedState,setSelectedState]=useState("");
  const [selectedCity,setSelectedCity]=useState("");
  
  const BaseUrl="https://location-selector.labs.crio.do"

  useEffect(()=>{
    const getCountries = async ()=>{
      try{
        const response= await fetch(`${BaseUrl}/countries`);
        if(!response.ok){
          throw new Error("Failed to fetch countries");
        }
        const data=await response.json();
        setCountries(data);
      }catch(error){
        console.error("Error fetching countries",error);
      }
    }
    getCountries();
  },[]);

  const handleCountryChange =async(event)=>{
    const country=event.target.value;
    setSelectedCountry(country);

    setSelectedState("");
    setSelectedCity("");

    setStates([]);
    setCities([]);

    if(!country){
      return;
    }

    try{
      const response= await fetch(`${BaseUrl}/country=${encodeURIComponent(country)}/states`);
      if(!response.ok){
        throw new Error("Failed to fetch countries");
      }
      const data=await response.json();
      setStates(data);
    }
    catch(error){
      console.error("Error fetching states",error);
    }
  }

  const handleStateChange =async(event)=>{
    const state=event.target.value;

    setSelectedState(state);

    setSelectedCity("");

    setCities([]);

    if(!state){
      return;
    }

    try{
      const response= await fetch(`${BaseUrl}/country=${encodeURIComponent(selectedCountry)}/state=${encodeURIComponent(state)}/cities`);
      if(!response.ok){
        throw new Error("Failed to fetch countries");
      }
      const data=await response.json();
      setCities(data);
    }
    catch(error){
      console.error("Error fetching states",error);
    }

  }

  const handleCityChange =async(event)=>{
    const city=event.target.value;
    setSelectedCity(city);
  }

  return(
    <div className="App">
      <h1>Select Location</h1>
        <div className="location-container">
          <select value={selectedCountry} onChange={handleCountryChange}>
            <option value="" >Select Country</option>
            {countries.map((country)=>{
              return(
                <option key={country} value={country}>{country}</option>
              )
              
            })}
          </select>
          <select value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
            <option value="" >Select States</option>
            {states.map((state)=>{
              return(
                <option key={state} value={state}>{state}</option>
              )
              
            })}

          </select>
          <select value={setSelectedCity} onChange={handleCityChange} disabled={!selectedState}>
            <option value="" >Select City</option>
            {cities.map((city)=>{
              return(
                <option key={city} value={city}>{city}</option>
              )
              
            })}
          </select>
        </div>
        {selectedCity && (
          <p className="selected-location">
            You selected <strong>{selectedCity}</strong>,{" "}
            <strong>{selectedState}</strong>,{" "}
            <strong>{selectedCountry}</strong>,{" "}
          </p>
        )}
    </div>
  )
}

export default App;