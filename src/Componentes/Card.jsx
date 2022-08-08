import axios from "axios";
import  {useEffect, useState} from "react";
import LoadScreen from "./LoadScreen";


const Card = ({ lat, lon }) => {
  const [weather, setWeather] = useState();
  const [temperature, setTemperature] = useState();
  const [isCelsius, setIsCelsius] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (lat) {
      const myApi = "59786416189a932b63fc10f17ffff0d3";
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myApi}`;

      axios
        .get(URL)
        .then((ret) => {
          setWeather(ret.data);
          const temp = {
            celsius: `${Math.round(ret.data.main.temp - 273.15)}C°`,

            farenheit: `${(Math.round(ret.data.main.temp) * 9) / 5 + 32} F°`,
          };
          setTemperature(temp);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [lat, lon]);

  const handleClick = () => setIsCelsius(!isCelsius);

  if (isLoading) {
    return <LoadScreen/>
  } else {
    return (
      <div className="card-container">

        <div>
          <h1>WEATHER APP</h1>
          <h2>{`${weather?.name}, ${weather?.sys.country}`}</h2>
        </div>

        <div className='container_image_description'>
          <img className="image"
            src={
              weather &&
              `http://openweathermap.org/img/wn/${
                weather && weather?.weather[0].icon
              }@4x.png`
            }
            alt="weather image"
          />
          <div>
            <h3>`{weather?.weather[0].description}`</h3>
            <ul>
              <li>
                <span>Wind Speed: </span>
                {weather?.wind.speed} m/s
              </li>
              <li>
                <span>Clouds: </span>
                {weather?.clouds.all}%
              </li>
              <li>
                <span>Pressure: </span>
                {weather?.main.pressure}hPa
              </li>
            </ul>
          </div>
        </div>

          <div>
            <h2>{isCelsius ? temperature.celsius : temperature.farenheit}</h2>
            <button onClick={handleClick}>
              {" "}
              {isCelsius ? "change to °F" : "change to °C"}
            </button>
          </div>
      </div>
    );
  }
};

export default Card;
