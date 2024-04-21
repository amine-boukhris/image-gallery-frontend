import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="container min-h-96 flex items-center justify-center flex-col text-center gap-4">
            <h2 className="text-primary font-bold tracking-wider text-8xl sm:text-9xl">404</h2>
            <h1 className="text-2xl sm:text-3xl">Page or image not found</h1>
            <p className="text-neutral/50">The page or image you're looking for doesn't exist</p>
            <Link to={'/'} className="btn btn-primary">Back to homepage</Link>
        </div>
    )
}
