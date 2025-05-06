import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import CarsList from './pages/CarsList'
import Homepage from './pages/Homepage'
import { GlobalProvider } from './context/GlobalContext'

const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DefaultLayout />}>
          </Route>
          <Route path='/' element={<DefaultLayout />}>
            <Route index element={<Homepage />} />
          </Route>
          <Route path='/cars' element={<DefaultLayout />}>
            <Route index element={<CarsList />} />
          </Route> 
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App