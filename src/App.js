import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [city, setCity] = useState("");
  const [searchcity, setSearchCity] = useState("");
  const [loading , setLoading] = useState(false);
  useEffect(() => {
    if (!searchcity) return;
    setLoading(true);
    axios
      .get(`https://api.weatherapi.com/v1/current.json?key=fea46b0f9c084e41a34164814251112&q=${searchcity}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the weather data", error);
      })
      .finally(() => {
        setLoading(false); 
      });
  }, [searchcity]);


  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"30px",backgroundColor:"#f0f8ff",height:"100vh",paddingTop:"80px"}}>
      <div style={{display:"flex",gap:"10px"}}>
      <input
        placeholder='Enter city name'
        type='text'
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{width:"250px",height:"30px",borderRadius:"5px",border:"1px solid gray",paddingLeft:"10px"}}
      />
      <button onClick={() => setSearchCity(city)}  style={{width:"150px",backgroundColor:"#998d8dff",border:"none",borderRadius:"5px"}}>Search</button>
      </div>
      {loading && <p>Loading data...</p>}
      {data.location && !loading && (
        <div style={{display:"flex",gap:"60px"}} className='weather-cards'>
          <div className='weather-card' style={{backgroundColor:"white",height:"150px",width:"200px",borderRadius:"20px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            <h2 style={{margin:"0"}}>Temperaure</h2>
            <p>{data.current.temp_c} °C</p>
          </div>
          <div className='weather-card' style={{backgroundColor:"white",height:"150px",width:"200px",borderRadius:"20px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            <h2 style={{margin:"0"}}>Humidity</h2>
            <p>{data.current.humidity} %</p>
          </div>
          <div className='weather-card' style={{backgroundColor:"white",height:"150px",width:"200px",borderRadius:"20px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            <h2 style={{margin:"0"}}>
              Condition
            </h2>
            <p>{data.current.condition.text}</p>
          </div>
         <div className='weather-card' style={{backgroundColor:"white",height:"150px",width:"200px",borderRadius:"20px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            <h2 style={{margin:"0"}}>Wind Speed</h2>
            <p>{data.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>

  );
}

export default App;
