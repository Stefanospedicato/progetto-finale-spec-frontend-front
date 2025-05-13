import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalContext'
import DefaultLayout from './layouts/DefaultLayout'
import CarsList from './pages/CarsList'
import Homepage from './pages/Homepage'
import Detail from './pages/Detail'
import Comparator from './pages/Comparator'
import Favorites from './pages/Favorites'
import Create from './pages/Create'

const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DefaultLayout />} >
            <Route path='/' element={<Homepage />} />
            <Route path='/cars' element={<CarsList />} />
            <Route path='/comparator' element={<Comparator />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/create' element={<Create />} />
            <Route path='/cars/:id' element={<Detail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App