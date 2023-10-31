/* eslint-disable jsx-a11y/alt-text */
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import b1 from "../../assets/img/b1.jpg";
import b2 from "../../assets/img/b2.jpg";
import b3 from "../../assets/img/b3.png";
import b4 from "../../assets/img/b4.png";
import { Typography } from "@mui/material";
const Carouse = () => {
  return (
    <Carousel
      autoFocus={true}
      autoPlay={true}
      centerMode={false}
      showArrows={true}
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}
    >
      <div className="full-screen-image">
        <img src={b1} alt="Imagen 1" />
      </div>
      <div className="full-screen-image">
        <img src={b2} alt="Imagen 2" />
      </div>
      <div className="full-screen-image">
        <img src={b3} alt="Imagen 2" />
      </div>
      <div className="full-screen-image">
        <img src={b4} alt="Imagen 3" />
      </div>
    </Carousel>
  );
};

export default Carouse;
