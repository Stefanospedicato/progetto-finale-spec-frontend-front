import { useGlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
const Favorites = () => {
  const { favorites, toggleFavorite } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <div className='container my-5 car-details'>
      <h1 className='text-center my-5'>I TUOI DESIDERI</h1>
      <div className='d-flex flex-wrap justify-content-around'>
        {favorites.length > 0 ? (
          favorites.map(car => (
            <div key={car.id} className='info-card text-center col-12 d-flex justify-content-between'>
              <img src={car.logo} alt={car.title} className='favorite-logo' />
              <h4 className='text-uppercase align-self-center fw-bold'>{car.title}</h4>
              <div>
                <p><span>Scuderia:</span> {car.brand}</p>
                <p><span>Modello:</span> {car.model}</p>
                <p><span>Prezzo a partire da:</span> {car.price && car.price.toLocaleString('it-IT')},00 €</p>
                <div className='d-flex'>
                  <button className='btn btn-info m-2' onClick={() => navigate(`/cars/${car.id}`)}>Più dettagli</button>
                  <button className='btn btn-dark m-2' onClick={() => toggleFavorite(car)}>Rimuovi dai desideri</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>Aggiungi un'automobile ai tuoi desideri per visualizzarla qui</p>
            <button className='btn btn-dark m-2 w-100' onClick={() => navigate('/cars')}>Scopri</button>
          </div>

        )}

      </div>
    </div>
  );
};

export default Favorites;
