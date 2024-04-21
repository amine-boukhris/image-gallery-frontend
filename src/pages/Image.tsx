import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { image } from './Home'
import toast, { Toaster } from 'react-hot-toast'
import { Pencil, Trash2 } from 'lucide-react'

export default function Image() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [image, setImage] = useState<image>()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/image/${id}`
                )
                if (response.ok) {
                    const data = await response.json()
                    setImage(data)
                    setTitle(data.title)
                    setDescription(data.description)
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
                toast.success('Image was deleted successfully.')
                setImage(undefined)
                setTimeout(() => navigate('/'), 750)
            } else if (response.status === 404 || response.status === 400) {
                toast.error('Image not found.')
            } else {
                console.error('Failed to delete image.')
            }
        } catch (error) {
            if (error instanceof Error)
                console.error('Error deleting image:', error.message)
            else console.error(error)
        }
    }

    const editImage = async () => {
        if (!title) return toast.error("Title can't be empty.")
        if (title === image?.title && description === image?.description)
            return toast.error('Image data is the same.')
        try {
            const response = await fetch(
                `http://localhost:5000/api/image/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({ title, description }),
                }
            )
            if (response.ok) {
                const data = await response.json()
                setImage(data)
                toast.success('Image was updated successfully.')
            } else if (response.status === 404 || response.status === 400) {
                toast.error('Image not found.')
            } else {
                console.error('Failed to update image.')
            }
        } catch (error) {
            if (error instanceof Error)
                console.error('Error updating image:', error.message)
            else console.error(error)
        }
    }

    const openModal = (modalName: 'edit' | 'delete') => {
        // config root scroll bar space based on document height
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

        // open modal
        const modalId =
            modalName === 'edit'
                ? 'edit_image_modal'
                : modalName === 'delete'
                ? 'confirm_delete_modal'
                : ''

        if (!modalId) return
        const modal = document.getElementById(modalId)
        // @ts-ignore
        if (modal) modal.showModal()
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
                    
                        <button
                            className="btn btn-secondary"
                            onClick={() => openModal('edit')}
                        >
                            <Pencil size={20} />
                            Edit
                        </button>
                        <dialog id="edit_image_modal" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">
                                    Edit image data
                                </h3>
                                <div className="mt-3">
                                    {/* title input */}
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text text-base">
                                                Enter image title
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            className="input input-bordered w-full text-base"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                        />
                                    </label>
                                    {/* description input */}
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text text-base">
                                                Enter image description{' '}
                                                <span className="text-neutral-content">
                                                    (optional)
                                                </span>
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="description"
                                            className="input input-bordered w-full text-base"
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                        />
                                    </label>
                                </div>
                                <div className="modal-action">
                                    <form method="dialog">
                                        <button className="btn mr-4">
                                            Cancel
                                        </button>
                                        <button
                                            className="btn btn-primary"
                                            onClick={editImage}
                                        >
                                            Save
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                        <button
                            className="btn btn-error"
                            onClick={() => openModal('delete')}
                        >
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
