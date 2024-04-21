import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Add from './pages/Add'
import Search from './pages/Search'
import Image from './pages/Image'
import NotFound from './pages/NotFound'

export default function App() {
    return (
        <BrowserRouter>
            <Nav />

            <Routes>
                <Route index element={<Home />} />
                <Route path="/add" element={<Add />} />
                <Route path="/search/:query" element={<Search />} />
                <Route path='/image/:id' element={<Image />} />
                <Route path='/not-found' element={<NotFound />} />
                <Route path='*' element={<Navigate to={'not-found'} />} />
            </Routes>
        </BrowserRouter>
    )
}
