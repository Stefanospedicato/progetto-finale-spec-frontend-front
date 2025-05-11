import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { IoIosStar, IoIosStarOutline } from "react-icons/io";


const Detail = () => {
  const { car, fetchCar, favorites, toggleFavorite } = useGlobalContext();
  const { id } = useParams();
  const isFavorite = favorites.some(fav => fav.id === car.id);

  useEffect(() => {
    fetchCar(id);
  }, [id]);


  return (
    <div className='container p-5'>
      <div className='d-flex justify-content-between'>
        <div className='noselect mb-3 w-100 w-md-75 align-self-center'>
          <h1>
            {isFavorite ?
              <IoIosStar className='full-star-detail p-2' onClick={() => toggleFavorite(car)} /> :
              <IoIosStarOutline className='empty-star-detail p-2' onClick={() => toggleFavorite(car)} />
            }
            {car.title}
          </h1>
        </div>
        <img src={car.logo} alt={car.title} className='logo' />
      </div>
      <p className='my-3 description'> {car.description}</p>
      <div className='d-flex flex-lg-row flex-column justify-content-between'>
        <div className=''>
          <h3 className='my-4'>Modello:</h3>
          <p><span>Scuderia:</span> {car.brand}</p>
          <p><span>Nazione della scuderia:</span> {car.nationality}</p>
          <p><span>Modello:</span> {car.model}</p>
          <p><span>Anno di uscita:</span> {car.releaseYear}</p>
          <p><span>Prezzo a partire da:</span> {car.price && car.price.toLocaleString('it-IT')},00 €</p>
          <h3 className='my-4'>Dati tecnici:</h3>
          <p><span>Cambio:</span> {car.trasmissione}</p>
          <p><span>Carburante:</span> {car.fuelType ? car.fuelType.join(', ') : ''}</p>
          <p><span>Numero di porte:</span> {car.doors}</p>
          <p><span>Categoria:</span> {car.category}</p>
          <p><span>Potenza motore in cavalli:</span> {car.horsepower} cv</p>
          <p><span>Velocità massima:</span> {car.topSpeed} km/h</p>
        </div>
        <div className='align-self-center car-image mt-5'>
          <img src={car.image || ''} alt={car.title} className='car-image' />
        </div>
      </div>
    </div>
  );
};

export default Detail;
