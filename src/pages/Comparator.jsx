import React, { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';

const Comparator = () => {
  const { cars } = useGlobalContext();
  const [firstCar, setFirstCar] = useState(null);
  const [lastCar, setLastCar] = useState(null);

  const fetchCar = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/cars/${id}`);
      const data = await response.json();
      return data.car;
    } catch (error) {
      console.error('Errore nel recupero dei dati:', error);
    }
  };

  const handleFirstCar = async (e) => {
    const carId = parseInt(e.target.value);
    setFirstCar(await fetchCar(carId));
  };

  const handleLastCar = async (e) => {
    const carId = parseInt(e.target.value);
    setLastCar(await fetchCar(carId));
  };

  return (
    <div className='container my-5'>
      <h1>Scegli due modelli da comparare:</h1>
      <section className='my-5 d-flex justify-content-center'>
        <div className='mx-5 w-50'>
          <select className="form-select" defaultValue={'default'} onChange={handleFirstCar}>
            <option value="default" disabled>Scegli un'automobile...</option>
            {cars.map(car => (
              <option key={car.id} value={car.id}>{car.title}</option>
            ))}
          </select>
          {firstCar && (
            <div className="mt-3">
              <p>Scuderia: <span>{firstCar.brand}</span></p>
              <p>Modello: <span>{firstCar.model}</span></p>
              <p>Anno di uscita: <span>{firstCar.releaseYear}</span></p>
              <p>Cambio: <span>{firstCar.trasmissione}</span></p>
              <p>Prezzo a partire da: <span>{firstCar.price},00 €</span></p>
              <p>Carburante: <span>{firstCar.fuelType}</span></p>
              <p>Numero di porte: <span>{firstCar.doors}</span></p>
              <p>Categoria: <span>{firstCar.category}</span></p>
              <p>Nazione della scuderia: <span>{firstCar.nationality}</span></p>
              <p>Potenza motore in cavalli: <span>{firstCar.horsepower} cv</span></p>
              <p>Velocità massima: <span>{firstCar.topSpeed} km/h</span></p>
            </div>
          )}
        </div>
        <div className='mx-5 w-50'>
          <select className="form-select" defaultValue={'default'} onChange={handleLastCar}>
            <option value="default" disabled>Scegli un'automobile...</option>
            {cars.map(car => (
              <option key={car.id} value={car.id}>{car.title}</option>
            ))}
          </select>
          {lastCar && (
            <div className="mt-3">
              <p>Scuderia: <span>{lastCar.brand}</span></p>
              <p>Modello: <span>{lastCar.model}</span></p>
              <p>Anno di uscita: <span>{lastCar.releaseYear}</span></p>
              <p>Cambio: <span>{lastCar.trasmissione}</span></p>
              <p>Prezzo a partire da: <span>{lastCar.price},00 €</span></p>
              <p>Carburante: <span>{lastCar.fuelType}</span></p>
              <p>Numero di porte: <span>{lastCar.doors}</span></p>
              <p>Categoria: <span>{lastCar.category}</span></p>
              <p>Nazione della scuderia: <span>{lastCar.nationality}</span></p>
              <p>Potenza motore in cavalli: <span>{lastCar.horsepower} cv</span></p>
              <p>Velocità massima: <span>{lastCar.topSpeed} km/h</span></p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Comparator;
