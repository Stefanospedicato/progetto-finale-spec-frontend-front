import React, { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { RiStarSFill, RiStarLine } from "react-icons/ri";

const Comparator = () => {

  const { cars, favorites, toggleFavorite, car } = useGlobalContext();
  const [firstCar, setFirstCar] = useState(null);
  const [lastCar, setLastCar] = useState(null);
  const isFavorite = favorites.some(fav => fav.id === car.id);
  const orderedCars = cars.sort((a, b) => a.title.localeCompare(b.title));

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
    <div className='container comparatore my-5'>
      <h1 className='text-center'>CONFRONTA DUE AUTOMOBILI</h1>
      <section className='my-5 d-flex justify-content-center'>
        <div className='mx-5 w-50'>
          <select className="form-select text-center " defaultValue={'default'} onChange={handleFirstCar}>
            <option value="default" disabled>Scegli un'automobile...</option>
            {favorites.length > 0 && <option value="default" disabled className='fw-bold'>Le tue scelte</option>}
            {favorites && favorites.map(car => (
              <option key={car.id} value={car.id} className='choises'>{car.title}</option>
            ))}
            {favorites && <option value="default" disabled className='fw-bold'>Altre automobili...</option>}
            {orderedCars.map(car => (
              <option key={car.id} value={car.id}>{car.title}</option>
            ))}
          </select>
          {firstCar && (
            <div className="mt-3 comparatore text-center">

              <img src={firstCar.logo} alt={firstCar.title} className='logo mb-5' />
              <p><span>Scuderia:</span> {firstCar.brand}</p>
              <p><span>Modello:</span> {firstCar.model}</p>
              <p><span>Anno di uscita:</span> {firstCar.releaseYear}</p>
              <p><span>Cambio:</span> {firstCar.trasmissione}</p>
              <p><span>Prezzo a partire da:</span> {firstCar.price ? firstCar.price.toLocaleString('it-IT') : ''},00 €</p>
              <p><span>Carburante:</span> {firstCar.fuelType ? firstCar.fuelType.join(', ') : ''}</p>
              <p><span>Numero di porte:</span> {firstCar.doors}</p>
              <p><span>Categoria:</span> {firstCar.category}</p>
              <p><span>Nazione della scuderia:</span> {firstCar.nationality}</p>
              <p><span>Potenza motore in cavalli:</span> {firstCar.horsepower} cv</p>
              <p><span>Velocità massima:</span> {firstCar.topSpeed} km/h</p>
              {favorites.some(fav => fav.id === firstCar.id) ?
                <button className='w-100 btn btn-dark mt-3' onClick={() => toggleFavorite(firstCar)}>Rimuovi dalle tue scelte</button> :
                <button className='w-100 btn btn-info mt-3' onClick={() => toggleFavorite(firstCar)}>Aggiungi alle tue scelte</button>
              }
            </div>
          )}
        </div>
        <div className='mx-5 w-50'>
          <select className="form-select text-center" defaultValue={'default'} onChange={handleLastCar}>
            <option value="default" disabled>Scegli un'automobile...</option>
            {favorites.length > 0 && <option value="default" disabled className='fw-bold'>Le tue scelte</option>}
            {favorites && favorites.map(car => (
              <option key={car.id} value={car.id} className='choises'>{car.title}</option>
            ))}
            {favorites && <option value="default" disabled className='fw-bold'>Altre automobili...</option>}
            {(orderedCars.map(car => (
              <option key={car.id} value={car.id}>{car.title}</option>
            )))}
          </select>
          {lastCar && (
            <div className="mt-3 comparatore text-center">
              <img src={lastCar.logo} alt={lastCar.title} className='logo mb-5' />
              <p><span>Scuderia:</span> {lastCar.brand}</p>
              <p><span>Modello:</span> {lastCar.model}</p>
              <p><span>Anno di uscita:</span> {lastCar.releaseYear}</p>
              <p><span>Cambio:</span> {lastCar.trasmissione}</p>
              <p><span>Prezzo a partire da:</span> {lastCar.price ? lastCar.price.toLocaleString('it-IT') : ''},00 €</p>
              <p><span>Carburante:</span> {lastCar.fuelType ? lastCar.fuelType.join(', ') : ''}</p>
              <p><span>Numero di porte:</span> {lastCar.doors}</p>
              <p><span>Categoria:</span> {lastCar.category}</p>
              <p><span>Nazione della scuderia:</span> {lastCar.nationality}</p>
              <p><span>Potenza motore in cavalli:</span> {lastCar.horsepower} cv</p>
              <p><span>Velocità massima:</span> {lastCar.topSpeed} km/h</p>
              {favorites.some(fav => fav.id === lastCar.id) ?
                <button className='w-100 btn btn-dark mt-3' onClick={() => toggleFavorite(lastCar)}>Rimuovi dalle tue scelte</button> :
                <button className='w-100 btn btn-info mt-3' onClick={() => toggleFavorite(lastCar)}>Aggiungi alle tue scelte</button>
              }
            </div>
          )}
        </div>
      </section >
    </div >
  );
};

export default Comparator;
