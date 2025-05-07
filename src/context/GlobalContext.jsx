
import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {

  const [cars, setCars] = useState([])
  const [car, setCar] = useState({})
  const [filteredCars, setFilteredCars] = useState([]);

  const fetchCarsList = async () => {
    const response = await fetch(`http://localhost:3001/cars`)
    const data = await response.json()
    setCars(data)
    setFilteredCars(data);
  }

  const fetchCar = async (id) => {
    const response = await fetch(`http://localhost:3001/cars/${id}`)
    const data = await response.json()
    setCar(data.car)
  }

  useEffect(() => {
    fetchCarsList()
  }, [])



  const value = { fetchCarsList, cars, filteredCars, setFilteredCars, fetchCar, car }
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(GlobalContext)
}

export { GlobalProvider, useGlobalContext }