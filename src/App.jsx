import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalContext'
import DefaultLayout from './layouts/DefaultLayout'
import CarsList from './pages/CarsList'
import Homepage from './pages/Homepage'
import Detail from './pages/Detail'
import Comparator from './pages/Comparator'

const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DefaultLayout />} >
            <Route path='/homepage' element={<Homepage />} />
            <Route path='/cars' element={<CarsList />} />
            <Route path='/comparator' element={<Comparator />} />
            <Route path='/cars/:id' element={<Detail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App