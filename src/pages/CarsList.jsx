import { useState, useCallback } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { FaArrowDownAZ } from "react-icons/fa6";
import { FaArrowUpAZ } from "react-icons/fa6";

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

  const filteredCars = [...cars].filter(car => car.title.toLowerCase().includes(search.toLowerCase())).filter(car => selectedCategory === 'default' || car.category === selectedCategory);

  if (sortOrder) {
    filteredCars.sort((a, b) =>
      sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
  }

  function debounce(func, delay) {
    let timer;
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(value);
      }, delay);
    };
  }

  const handleSearch = useCallback(
    debounce((e) => {
      setSearch(e.target.value);
    }, 600),
    []
  );

  const handleFilter = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  return (
    <div className='container my-5 car-list'>
      {/* //FILTRI */}
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
            sortOrder === 'asc' ? <button className='btn btn-info' style={{ width: '20%', marginLeft: '1em' }} onClick={() => handleSort('desc')}><FaArrowDownAZ /></button>
              :
              <button className='btn btn-dark' style={{ width: '20%', marginLeft: '1em' }} onClick={() => handleSort('asc')}><FaArrowUpAZ /></button>
          )}
        </div>
      </div>
      {/* FILTRI */}
      {/* LISTA */}
      {filteredCars.length > 0 ? (
        filteredCars.map(car => {
          const isFavorite = favorites.some(fav => fav.id === car.id);
          return (
            <div className='info-card pointer text-center d-flex justify-content-between' onClick={() => navigate(`/cars/${car.id}`)} key={car.id}>
              <div className='d-flex flex-column justify-content-center mx-auto'>
                <h4 className='mx-auto'>{car.title}</h4>
                <h6 className='mx-auto'>Categoria: {car.category}</h6>
              </div>
              <div className='align-self-center'>
                {isFavorite ? (
                  <IoIosStar className='full-star pointer' onClick={(event) => {
                    event.stopPropagation();
                    toggleFavorite(car);
                  }} />
                ) : (
                  <IoIosStarOutline className='empty-star pointer' onClick={(event) => {
                    event.stopPropagation();
                    toggleFavorite(car);
                  }} />
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p className='text-danger text-center my-5'>Nessuna macchina disponibile in base ai criteri selezionati. Riprova con un altro filtro o cerca un altro modello.</p>
      )}
      {/* LISTA */}
    </div>
  );
};

export default CarsList;

