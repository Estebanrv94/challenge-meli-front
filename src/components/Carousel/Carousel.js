import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.scss"; // Importa tu archivo SCSS aquí

class Carousel extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true, // Centra los slides
      autoplay: true, // Autoplay
      autoplaySpeed: 3000, // Intervalo de tiempo entre slides (en milisegundos)
    };

    return (
      <div className="carousel-container">
        <div className="carousel-wrapper">
          <Slider {...settings}>
            <div>
              <img
                src="https://http2.mlstatic.com/D_NQ_740569-MLA74541516857_022024-OO.webp"
                alt="slide1"
              />
            </div>
            <div>
              <img
                src="https://http2.mlstatic.com/D_NQ_992863-MLA75020993000_032024-OO.webp"
                alt="slide2"
              />
            </div>
            <div>
              <img
                src="https://http2.mlstatic.com/D_NQ_626938-MLA75109578741_032024-OO.webp"
                alt="slide3"
              />
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}

export default Carousel;
