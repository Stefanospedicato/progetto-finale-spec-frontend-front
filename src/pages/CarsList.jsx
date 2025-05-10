import { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { RiStarSFill, RiStarLine } from "react-icons/ri";

const CarsList = () => {
  const { cars, favorites, toggleFavorite } = useGlobalContext();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('default');
  const [sortOrder, setSortOrder] = useState(null);

  const categories = [];
  cars.forEach(car => {
    if (!categories.includes(car.category)) {
      categories.push(car.category);
    }
  });

  const filteredCars = [...cars]
    .filter(car => car.title.toLowerCase().includes(search.toLowerCase()))
    .filter(car => selectedCategory === 'default' || car.category === selectedCategory);

  if (sortOrder) {
    filteredCars.sort((a, b) =>
      sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  return (
    <div className='container my-5 car-list'>
      <div className="d-flex flex-column flex-md-row justify-content-between mb-3">
        <div className="input-group w-100 w-md-50 me-md-3 mb-3 mb-md-0">
          <input type="text" className="form-control" placeholder="Cerca un'automobile..."
            onChange={handleSearch} />
        </div>
        <div className='d-flex w-100 w-md-50'>
          <span className='align-self-center text-white'>Seleziona categoria: </span>
          <select className='form-select w-100 mx-3' onChange={handleFilter} value={selectedCategory}>
            <option value="default">Scegli una categoria...</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {filteredCars.length > 0 && (
            sortOrder === 'asc' ? <button className='btn btn-light' style={{ width: '20%', marginLeft: '1em' }} onClick={() => handleSort('desc')}>Z-A</button> : <button className='btn btn-light' style={{ width: '20%', marginLeft: '1em' }} onClick={() => handleSort('asc')}>A-Z</button>
          )}
        </div>
      </div>
      {filteredCars.length > 0 ? (
        filteredCars.map(car => {
          const isFavorite = favorites.some(fav => fav.id === car.id);
          return (
            <div className='info-card pointer text-center' key={car.id}>
              <h4 onClick={() => navigate(`/cars/${car.id}`)}>
                {car.title}
              </h4>
              <h6>Categoria: {car.category}</h6>
              {isFavorite ? (
                <div className='toggle-favorite'>
                  <span className='align-self-center'>Rimuovi dalla lista desideri </span>
                  <RiStarSFill className='full-star' onClick={(event) => {
                    event.stopPropagation();
                    toggleFavorite(car);
                  }} />
                </div>
              ) : (
                <div className='toggle-favorite'>
                  <span className='align-self-center'>Aggiungi alla lista desideri</span>
                  <RiStarLine className='empty-star' onClick={(event) => {
                    event.stopPropagation();
                    toggleFavorite(car);
                  }} />
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p className='text-danger text-center my-5'>Nessuna macchina disponibile in base ai criteri selezionati. Riprova con un altro filtro o cerca un altro modello.</p>
      )}
    </div>
  );
};

export default CarsList;
