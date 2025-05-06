
import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {

  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([]);

  const fetchCars = async () => {
    const response = await fetch(`http://localhost:3001/cars`)
    const data = await response.json()
    setCars(data)
    setFilteredCars(data);
  }

  useEffect(() => {
    fetchCars()
  }, [])



  const value = { fetchCars, cars, filteredCars, setFilteredCars }
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(GlobalContext)
}

export { GlobalProvider, useGlobalContext }