import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState({});
  const [filteredCars, setFilteredCars] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchCarsList();
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const fetchCarsList = async () => {
    const response = await fetch(`http://localhost:3001/cars`);
    const data = await response.json();
    setCars(data);
    setFilteredCars(data);
  };

  const fetchCar = async (id) => {
    const response = await fetch(`http://localhost:3001/cars/${id}`);
    const data = await response.json();
    setCar(data.car);
  };

  const toggleFavorite = useCallback(async (car) => {
    if (!car.logo) {
      const response = await fetch(`http://localhost:3001/cars/${car.id}`);
      const data = await response.json();
      car = data.car;
    }
    const isFavorite = favorites.some(fav => fav.id === car.id);
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter(fav => fav.id !== car.id);
    } else {
      updatedFavorites = [...favorites, car];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }, [favorites]);

  const createCar = async (car) => {
    const response = await fetch(`http://localhost:3001/cars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
    const data = await response.json();
    setCars(prevCars => [...prevCars, data.car]);
    setFilteredCars(prevFilteredCars => [...prevFilteredCars, data.car]);
    return data.car;
  };


  const value = { fetchCarsList, cars, filteredCars, setFilteredCars, fetchCar, car, favorites, toggleFavorite, createCar };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
