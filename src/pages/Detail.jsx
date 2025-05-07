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
      <p><span>Scuderia:</span> {brand}</p>
      <p><span>Modello:</span> {model}</p>
      <p><span>Anno di uscita:</span> {releaseYear}</p>
      <p><span>Cambio:</span> {trasmissione}</p>
      <p><span>Prezzo a partire da:</span> {price && price.toLocaleString('it-IT')},00 €</p>
      <p><span>Carburante:</span> {fuelType ? fuelType.join(', ') : ''}</p>
      <p><span>Numero di porte:</span> {doors}</p>
      <p><span>Categoria:</span> {category}</p>
      <p><span>Nazione della scuderia:</span> {nationality}</p>
      <p><span>Potenza motore in cavalli:</span> {horsepower} cv</p>
      <p><span>Velocità massima:</span> {topSpeed} km/h</p>
    </div>
  )
}

export default Detail
