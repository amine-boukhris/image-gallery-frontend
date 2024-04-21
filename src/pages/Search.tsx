import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { image } from './Home'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function Search() {
    const { query } = useParams()
    const [images, setImages] = useState<image[]>([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)

    const fetchImages = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/images/search/${query}?page=${page}`
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
        <div className="container my-12 px-0">
            <div className='px-6'>
                <p className="text-xl sm:text-3xl text-neutral/50 font-medium">
                    Search results for:
                </p>
                <h1 className="text-3xl sm:text-6xl mt-2 sm:mt-4 font-medium">
                    {query}
                </h1>
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
                    pullDownToRefresh
                    pullDownToRefreshThreshold={50}
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
                                >
                                    <div className="w-full mb-6 sm:mb-4 md:mb-6 rounded overflow-hidden border border-neutral-content/50 [@media(any-hover:hover){&:hover}]:scale-[1.025] duration-150 cursor-pointer">
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
                </InfiniteScroll>
            </div>
        </div>
    )
}
