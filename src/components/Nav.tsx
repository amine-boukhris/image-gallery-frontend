import { useNavigate } from 'react-router-dom'

export default function Nav() {
    const navigate = useNavigate()

    return (
        <div className="container mt-4 flex justify-between items-center">
            <h1 className="text-3xl italic font-bold">Amine's Gallery</h1>
            <div className="flex gap-2">
                <button className='btn' type="button" onClick={() => navigate('/')}>
                    Home
                </button>
                <button className='btn' type="button" onClick={() => navigate('/add')}>
                    Add
                </button>
            </div>
        </div>
    )
}