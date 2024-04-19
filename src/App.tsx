import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Add from './pages/Add'
import Search from './pages/Search'

export default function App() {
    return (
        <BrowserRouter>
            <Nav />

            <Routes>
                <Route index element={<Home />} />
                <Route path="/add" element={<Add />} />
                <Route path="/search/:query" element={<Search />} />
            </Routes>
        </BrowserRouter>
    )
}
