import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";

export default function Home() {
    return (
        <div className="container my-12 px-0 relative  ">
            <Banner />
            <div className="max-w-lg w-full absolute bottom-6 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <SearchBar />
            </div>
        </div>
    )
}
