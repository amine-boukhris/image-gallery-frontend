import { useState } from 'react'

const ACCEPTED_IMAGE_MIME_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
]

export default function Add() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState<File>()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!image) return alert('image not defined')
        if (!ACCEPTED_IMAGE_MIME_TYPES.includes(image.type))
            return alert('bad image type')
        const formData = new FormData()
        formData.append('title', title)
        if (description) formData.append('description', description)
        formData.append('image', image)

        try {
            const response = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData,
            })
            if (response.ok) {
                console.log('File uploaded successfully!')
            } else {
                const errorData = await response.json()
                console.log(errorData.message || 'Failed to upload file.')
            }
        } catch (error) {
            if (error instanceof Error)
                console.error('Error uploading file:', error.message)
            else console.error(error)
        }
    }

    return (
        <div className="container my-12 border">
            <form
                className="space-y-6 max-w-2xl mx-auto"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
            >
                {/* title input */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-base">
                            Enter your image title
                        </span>
                    </div>
                    <input
                        required
                        type="text"
                        placeholder="Title"
                        className="input input-bordered w-full text-base"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                {/* description input */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-base">
                            Enter your image description{' '}
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
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                {/* image input */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-base">
                            Pick a file
                        </span>
                    </div>
                    <input
                        required
                        type="file"
                        name="image"
                        id="image"
                        className="file-input file-input-bordered w-full"
                        onChange={(e) => setImage(e.target.files?.[0])}
                    />
                </label>
                <input
                    type="submit"
                    value="Submit"
                    className="btn btn-neutral"
                />
            </form>
        </div>
    )
}
