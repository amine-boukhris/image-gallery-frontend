import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { image } from './Home'
import toast, { Toaster } from 'react-hot-toast'
import { Trash2 } from 'lucide-react'

export default function Image() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [image, setImage] = useState<image>()

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/image/${id}`
                )
                if (response.ok) {
                    const data = await response.json()
                    setImage(data)
                } else if (response.status === 404 || response.status === 400) {
                    console.error('Image not found')
                    navigate('/not-found')
                } else {
                    console.error('Failed to fetch image.')
                }
            } catch (error) {
                if (error instanceof Error)
                    console.error('Error fetching image:', error.message)
                else console.error(error)
            }
        }

        fetchImage()
    }, [id])

    const deleteImage = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/image/${id}`,
                { method: 'DELETE' }
            )
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                toast.success('Image was deleted successfully.')
                setTimeout(() => navigate('/'), 1000)
            } else if (response.status === 404 || response.status === 400) {
                toast.error('Image not found.')
            } else {
                console.error('Failed to fetch image.')
            }
        } catch (error) {
            if (error instanceof Error)
                console.error('Error deleting image:', error.message)
            else console.error(error)
        }
    }

    const openModal = () => {
        const body = document.body
        const html = document.documentElement
        const windowHeight = window.innerHeight
        const documentHeight = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        )
        const scrollable = documentHeight > windowHeight
        if (!scrollable)
            document.documentElement.classList.add('not_scrollable')
        else document.documentElement.classList.remove('not_scrollable')
        // @ts-ignore
        const modal: HTMLDialogElement = document.getElementById(
            'confirm_delete_modal'
        )
        modal.showModal()
    }

    const containerStyles = 'container my-12 p-2'
    if (!image)
        return (
            <div className={containerStyles}>
                <div className="skeleton w-full min-h-96"></div>
            </div>
        )
    return (
        <div className={containerStyles}>
            <Toaster />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-6 md:gap-8 lg:gap-10">
                <div className="lg:col-span-6">
                    <img
                        src={`http://localhost:5000/api/images/${image.name}`}
                        alt={image.title}
                        className="w-full"
                    />
                </div>
                <div className="lg:col-span-4 md:py-8 lg:py-16 px-2">
                    <div className="my-4">
                        <p className="text-neutral/50 text-lg sm:text-xl">
                            Image title
                        </p>
                        <h1 className="text-3xl sm:text-4xl font-medium break-words first-letter:ml-4">
                            {image.title}
                        </h1>
                    </div>

                    <div className="my-4">
                        <p className="text-neutral/50 text-base sm:text-lg">
                            Image description
                        </p>
                        <h2 className="text-xl sm:text-2xl font-medium first-letter:ml-4">
                            {image.description}
                        </h2>
                    </div>
                    <div className="flex gap-4 mt-6">
                        <button className="btn btn-secondary">Edit</button>
                        <button className="btn btn-error" onClick={openModal}>
                            <Trash2 size={20} />
                            Delete
                        </button>
                        <dialog id="confirm_delete_modal" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">
                                    Confirm delete
                                </h3>
                                <p className="py-4">
                                    Are you sure you want to delete this image?
                                </p>
                                <div className="modal-action">
                                    <form method="dialog">
                                        <button className="btn mr-4">
                                            Cancel
                                        </button>
                                        <button
                                            className="btn btn-error"
                                            onClick={deleteImage}
                                        >
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
        </div>
    )
}
