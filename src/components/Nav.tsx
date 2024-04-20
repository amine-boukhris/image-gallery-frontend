import { Link, useNavigate } from 'react-router-dom'

export default function Nav() {
    const navigate = useNavigate()

    return (
        <div className="container my-6 flex justify-between items-center gap-6">
            <Link to={'/'}><h1 className="text-xl sm:text-3xl italic font-bold">Amine's Gallery</h1></Link>
            <div className="flex gap-2 items-center">
                <button className='btn btn-sm sm:btn-md' type="button" onClick={() => navigate('/')}>
                    Home
                </button>
                <button className='btn btn-sm sm:btn-md' type="button" onClick={() => navigate('/add')}>
                    Add
                </button>
            </div>
        </div>
    )
}