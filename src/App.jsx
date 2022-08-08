import { useState,useEffect } from 'react'
import './App.css'
import Card from './Componentes/Card'

function App() {

  const [location, setLocation]=useState()
  //ESTADO DONDE SE  GUARDA LA INFORMACION


  //RECIBE UN CALLBACK Y ARREGLO DE DEPENDENCIAS
  useEffect(()=>{
    const success=ret=>  {const  latlon={
      lat:ret.coords.latitude,
      lon:ret.coords.longitude
    }
    setLocation(latlon)}

    navigator.geolocation.getCurrentPosition(success)},[])
console.log(location)
    //ESTA INFORMACION LA  OBTENGO DEL DOC API. ES PARA HACER EL API CALL. GETCURRENTPOSITON TE PERMITE OBTENER LA UBICACION ACTUAL. EN ELLA SE USA A CALLBACK FUNCTION SUCESS QUE LUEGO DEFINO EN UNA FUNCION EXPRESADA. CUANDDO MUESTRO ESTE ULTIMO EN CONSOLA ME PIDE PERMITIR LA UBICACION DEL LUGAR

    //EL USO DE USEEFFECT FUE SOLAMENTE PARA ACCEDER A LA LONGITUD Y LATITUD

  return (
    <div className="App">
      <Card lon={location?.lon} lat={location?.lat}/>
    </div>
  )
}

export default App
