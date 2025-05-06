import React from 'react'
import { useGlobalContext } from '../context/GlobalContext'

const CarsList = () => {

  const { cars, filteredCars, setFilteredCars } = useGlobalContext()


  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = cars.filter(car => car.title.toLowerCase().includes(searchTerm));
    setFilteredCars(filtered);
  };



  return (
    <div className='container my-5'>
      <label className='mb-3 w-100'>
        <div class="input-group mb-3">
          <input type="text" className="form-control w-100" placeholder="Cerca un'automobile..."
            onChange={handleSearch} />
        </div>
      </label>
      {filteredCars && filteredCars.length > 0 ? (
        filteredCars.map((car, index) => <p key={index} className='car text-center'>{car.title}</p>)
      ) : (
        <p>Nessuna macchina disponibile</p>
      )}


    </div>
  )
}

export default CarsList