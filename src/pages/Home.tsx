import { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import SearchBar from '../components/SearchBar'
import { Link } from 'react-router-dom'

export type image = {
    name: string
    title: string
    description: string
    _id: string
    __v: number
}

export default function Home() {
    const [images, setImages] = useState<image[]>([])
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/images')
                if (response.ok) {
                    const data = await response.json()
                    setImages(data)
                } else {
                    console.error('Failed to fetch images.')
                }
            } catch (error) {
                if (error instanceof Error)
                    console.error('Error fetching images:', error.message)
                else console.error(error)
            }
        }

        fetchImages()
    }, [])

    return (
        <div className="container px-0">
            <div className="relative">
                <div className="absolute z-10 max-w-lg w-full bottom-4 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 md:px-0">
                    <SearchBar />
                </div>
                <Banner />
            </div>
            <div className="my-12 px-2 sm:px-4 md:px-2">
                <div className="columns-1 sm:columns-2 md:columns-3 gap-8 sm:gap-4 md:gap-6">
                    {images.map((image) => {
                        return (
                            <Link to={`/image/${image._id}`} key={image._id} >
                                <div
                                    className="w-full mb-6 sm:mb-4 md:mb-6 rounded overflow-hidden border border-neutral-content/50 [@media(any-hover:hover){&:hover}]:scale-[1.025] duration-150 cursor-pointer"
                                >
                                    <img
                                        src={`http://localhost:5000/api/images/${image.name}`}
                                        alt={image.title}
                                        className="w-full h-full"
                                    />
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
