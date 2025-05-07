import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import CarsList from './pages/CarsList'
import Homepage from './pages/Homepage'
import Detail from './pages/Detail'
import { GlobalProvider } from './context/GlobalContext'

const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DefaultLayout />} >
            <Route path='/homepage' element={<Homepage />} />
            <Route path='/cars' element={<CarsList />} />
            <Route path='/cars/:id' element={<Detail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App