import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { RiStarSFill, RiStarLine } from "react-icons/ri";


const Detail = () => {
  const { car, fetchCar, favorites, toggleFavorite } = useGlobalContext();
  const { id } = useParams();
  const isFavorite = favorites.some(fav => fav.id === car.id);

  useEffect(() => {
    fetchCar(id);
  }, [id]);


  return (
    <div className='container info-card p-5'>
      <div className='d-flex justify-content-between'>
        <h1 className='mb-5 align-self-center'>
          {isFavorite ?
            <RiStarSFill className='full-star-detail p-2' onClick={() => toggleFavorite(car)} /> :
            <RiStarLine className='empty-star-detail p-2' onClick={() => toggleFavorite(car)} />
          }
          {car.title}
        </h1>
        <img src={car.logo} alt={car.title} className='logo' />
      </div>
      <div>
        <p><span>Scuderia:</span> {car.brand}</p>
        <p><span>Modello:</span> {car.model}</p>
        <p><span>Anno di uscita:</span> {car.releaseYear}</p>
        <p><span>Cambio:</span> {car.trasmissione}</p>
        <p><span>Prezzo a partire da:</span> {car.price && car.price.toLocaleString('it-IT')},00 €</p>
        <p><span>Carburante:</span> {car.fuelType ? car.fuelType.join(', ') : ''}</p>
        <p><span>Numero di porte:</span> {car.doors}</p>
        <p><span>Categoria:</span> {car.category}</p>
        <p><span>Nazione della scuderia:</span> {car.nationality}</p>
        <p><span>Potenza motore in cavalli:</span> {car.horsepower} cv</p>
        <p><span>Velocità massima:</span> {car.topSpeed} km/h</p>
      </div>
    </div>
  );
};

export default Detail;
