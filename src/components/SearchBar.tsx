import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
    const navigate = useNavigate()
    const [query, setQuery] = useState('')

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        navigate(`/search/${query}`)
    }

    return (
        <form onSubmit={handleSearch}>
            <label className="input input-bordered flex items-center pr-0 gap-2 w-full">
                <input
                    type="text"
                    className="grow"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-neutral rounded-l-none"><SearchIcon /></button>
            </label>
        </form>
    )
}
