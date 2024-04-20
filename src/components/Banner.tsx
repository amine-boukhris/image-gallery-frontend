import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function Banner() {
    const carouselImages = [
        '/carouselImage4.jpg',
        '/carouselImage1.jpg',
        '/carouselImage2.jpg',
        '/carouselImage3.jpg',
        '/carouselImage5.jpg',
    ]
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    }
    return (
        <Slider {...settings} className='rounded overflow-hidden'>
            {carouselImages.map((image, index) => {
                return (
                    <div key={index} className="h-72">
                        <img
                            src={image}
                            alt={
                                image.substring(0, image.lastIndexOf('.')) ||
                                image
                            }
                            className="w-full h-full object-cover"
                        />
                    </div>
                )
            })}
        </Slider>
    )
}
