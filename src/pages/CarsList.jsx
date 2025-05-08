import React from 'react'
import { useGlobalContext } from '../context/GlobalContext'
import { useNavigate } from 'react-router-dom'
import { RiStarSFill, RiStarLine } from "react-icons/ri";

const CarsList = () => {

  const { cars, filteredCars, setFilteredCars, favorites, toggleFavorite } = useGlobalContext()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = cars.filter(car => car.title.toLowerCase().includes(searchTerm));
    setFilteredCars(filtered);
  };

  return (
    <div className='container my-5 car-list'>
      <label className='mb-3 w-100'>
        <div className="input-group mb-3">
          <input type="text" className="form-control w-100" placeholder="Cerca un'automobile..."
            onChange={handleSearch} />
        </div>
      </label>
      {filteredCars && filteredCars.length > 0 ? (
        filteredCars.map((car, index) => {
          const isFavorite = favorites.some(fav => fav.id === car.id);
          return (
            <p key={index} className='car text-center' onClick={() => navigate(`/cars/${car.id}`)}>
              {isFavorite ?
                <RiStarSFill className='full-star p-2' onClick={(event) => {
                  event.stopPropagation();
                  toggleFavorite(car);
                }} /> :
                <RiStarLine className='empty-star p-2' onClick={(event) => {
                  event.stopPropagation();
                  toggleFavorite(car);
                }} />
              }
              {car.title}
            </p>
          )
        })
      ) : (
        <p>Nessuna macchina disponibile</p>
      )}


    </div>
  )
}

export default CarsList
