import { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import SearchBar from '../components/SearchBar'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

export type image = {
    name: string
    title: string
    description: string
    _id: string
    __v: number
}

export default function Home() {
    const [images, setImages] = useState<image[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const fetchImages = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/images?page=${page}`
            )
            if (response.ok) {
                const data = await response.json()
                setImages((prev) => [...prev, ...data])
                setPage((prev) => prev + 1)
                if (data.length === 0 || data.length < 10) {
                    setHasMore(false)
                }
            } else {
                console.error('Failed to fetch images.')
            }
        } catch (error) {
            if (error instanceof Error)
                console.error('Error fetching images:', error.message)
            else console.error(error)
        }
    }

    useEffect(() => {
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
                <InfiniteScroll
                    dataLength={images.length}
                    next={fetchImages}
                    hasMore={hasMore}
                    loader={
                        <p className="text-center mt-4 text-xl">Loading...</p>
                    }
                    endMessage={
                        <p className="text-center mt-4 text-xl">
                            No more images to load.
                        </p>
                    }
                    refreshFunction={() => location.reload()}
                    scrollThreshold={.95}
                    pullDownToRefresh
                    pullDownToRefreshThreshold={150}
                    pullDownToRefreshContent={
                        <h3 className="text-center mb-2">
                            &#8595; Pull down to refresh
                        </h3>
                    }
                    releaseToRefreshContent={
                        <h3 className="text-center mb-2">
                            &#8593; Release to refresh
                        </h3>
                    }
                >
                    <div className="columns-1 sm:columns-2 md:columns-3 gap-8 sm:gap-4 md:gap-6 px-2">
                        {images.map((image) => {
                            return (
                                <Link
                                    to={`/image/${image._id}`}
                                    key={image._id}
                                    className='select-none'
                                >
                                    <div className="w-full mb-6 sm:mb-4 md:mb-6 rounded overflow-hidden border border-neutral-content/50 [@media(any-hover:hover){&:hover}]:scale-[1.025] duration-150 cursor-pointer">
                                        <img
                                            src={`http://localhost:5000/api/images/${image.name}`}
                                            alt={image.title}
                                    draggable="false"
                                    className="w-full h-full select-none"
                                        />
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    )
}
