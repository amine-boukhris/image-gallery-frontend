import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
    const navigate = useNavigate()
    const [query, setQuery] = useState('')

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!query) return
        navigate(`/search/${query}`)
    }

    return (
        <form onSubmit={handleSearch}>
            <label className="input input-bordered flex items-center  gap-2 w-full input-sm sm:input-md" style={{paddingRight: 0, border: '1px'}}>
                <input
                    type="text"
                    className="grow"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-neutral btn-sm sm:btn-md rounded-l-none"><SearchIcon /></button>
            </label>
        </form>
    )
}
