import { useParams } from "react-router-dom"

export default function Image() {
    const {id} = useParams()
    return <div>Image: {id}</div>
}
