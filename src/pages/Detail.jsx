import React from 'react'
import { useGlobalContext } from '../context/GlobalContext'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const Detail = () => {
  const { car, fetchCar } = useGlobalContext()
  const { id } = useParams()

  useEffect(() => {
    fetchCar(id)
  }, [])
  console.log(car);


  const { title, brand, model, releaseYear, trasmissione, price, fuelType, doors, category, nationality, horsepower, topSpeed } = car

  return (
    <div className='container my-5 car-details'>
      <h1 className='mb-5'>{title}</h1>
      <p>Scuderia: <span>{brand}</span></p>
      <p>Modello: <span>{model}</span></p>
      <p>Anno di uscita: <span>{releaseYear}</span></p>
      <p>Cambio: <span>{trasmissione}</span></p>
      <p>Prezzo a partire da: <span>{price},00 €</span></p>
      <p>Carburante: <span>{fuelType}</span></p>
      <p>Numero di porte: <span>{doors}</span></p>
      <p>Categoria: <span>{category}</span></p>
      <p>Nazione della scuderia: <span>{nationality}</span></p>
      <p>Potenza motore in cavalli: <span>{horsepower} cv</span></p>
      <p>Velocità massima: <span>{topSpeed} km/h</span></p>

    </div>
  )
}

export default Detail