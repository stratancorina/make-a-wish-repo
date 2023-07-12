import React, { useEffect, useState } from "react";
import "../Pages.css";
import axios from "axios";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import ModalPhoto from "../components/ModalPhoto";
import { Grid } from "react-loader-spinner";

function Gallery() {
  const [photoDescription, setPhotoDescription] = useState(null);
  const [clickedImg, setClickedImg] = useState(null);
  const [currentArray, setCurrentArray] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [products, setProducts] = useState([]);

  const handleClick = (item) => {
    setPhotoDescription(item.title);
    setClickedImg(
      `data:image/jpeg;base64,${btoa(
        new Uint8Array(item.image.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      )}`
    );
  };

  useEffect(() => {
    axios
      .all([
        axios.get("http://localhost:3001/products"),
        axios.get("http://localhost:3001/photos"),
      ])
      .then((responseArr) => {
        setProducts(responseArr[0].data);
        setPhotos(responseArr[1].data);
      })
      .catch((error) => console.error(error));
  }, []);
  //   console.log(photos);

  return (
    <div className="container-1">
      <div className="gallery-title-section">
        <h1 className="title1">Galerie</h1>
        <p>
          Aici veți găsi o galerie foto cu clienți fericiți, buchete
          impresionante și idei de cadouri unice pentru orice ocazie. Suntem
          pasionați de crearea de momente speciale și suntem aici pentru a vă
          ajuta să surprindeți persoana dragă cu un cadou memorabil si unic.
        </p>
      </div>
      <div className="triangle-container">
        <div className="tr1-container">
          {" "}
          <div className="tr1"></div>
        </div>
        <div className="tr2-container">
          <div className="tr2"></div>
        </div>
      </div>

      <div className="gallery ">
        <h1 className="title2">Clienții noștrii</h1>

        {photos?.length ? (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            navigation
            pagination={{ clickable: true }}
            slidesPerView="auto"
          >
            {photos
              .filter((item) => item.category === "delivery")
              .map((item) => (
                <SwiperSlide
                  onClick={() => [
                    handleClick(item, item.idphotos),
                    setCurrentArray(
                      photos.filter((item) => item.category === "delivery")
                    ),
                  ]}
                  className="gallery-photo"
                  key={item.idphotos}
                >
                  {/* {item.title} */}
                  <img
                    src={`data:image/jpeg;base64,${btoa(
                      new Uint8Array(item.image.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ""
                      )
                    )}`}
                    alt={item.title}
                  />
                  <button>Vezi Poza </button>
                </SwiperSlide>
              ))}
            {/* <SwiperNavButtons /> */}
          </Swiper>
        ) : (
          <div className="loader">
            <Grid
              height="60"
              width="60"
              color="var(--purple)"

              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            ></Grid>
          </div>
        )}
      </div>

      <div className="triangle-container tr-section2">
        <div className="tr1-container tr-white1 ">
          {" "}
          <div className="tr1"></div>
        </div>
        <div className="tr2-container tr-white2">
          <div className="tr2"></div>
        </div>
      </div>

      <div className="gallery  gall2">
        <h1 className="title2 gall2">Idei de seturi</h1>
        {photos?.length ? (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          navigation
          pagination={{ clickable: true }}
          slidesPerView="auto"
        >
          {photos
            .filter((item) => item.category === "set")
            .map((item) => (
              <SwiperSlide
                className="gallery-photo"
                key={item.idphotos}
                onClick={() => [
                  handleClick(item, item.idphotos),
                  setCurrentArray(
                    photos.filter((item) => item.category === "set")
                  ),
                ]}
              >
                <img
                  src={`data:image/jpeg;base64,${btoa(
                    new Uint8Array(item.image.data).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ""
                    )
                  )}`}
                  alt={item.title}
                />
                <button>Vezi Poza </button>
              </SwiperSlide>
            ))}
        </Swiper>
        ) : (
          <div className="loader">
            <Grid
              height="60"
              width="60"
              color="#482673"

              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            ></Grid>
          </div>
        )}
      </div>
      <div className="triangle-container">
        <div className="tr1-container">
          {" "}
          <div className="tr1"></div>
        </div>
        <div className="tr2-container">
          <div className="tr2"></div>
        </div>
      </div>

      <div className="gallery ">
        <h1 className="title2">Buchete comestibile</h1>
        {products?.length ? (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          navigation
          pagination={{ clickable: true }}
          slidesPerView="auto"
        >
          {products
            .filter((item) => item.category === "bouquet")
            .map((item) => (
              <SwiperSlide
                className="gallery-photo"
                key={item.id}
                onClick={() => [
                  handleClick(item, item.id),
                  setCurrentArray(
                    products.filter((item) => item.category === "bouquet")
                  ),
                ]}
              >
                {/* {item.title} */}
                <img
                  src={`data:image/jpeg;base64,${btoa(
                    new Uint8Array(item.image.data).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ""
                    )
                  )}`}
                  alt={item.title}
                />
                <button>Vezi Poza </button>
              </SwiperSlide>
            ))}
        </Swiper>
        ) : (
          <div className="loader">
            <Grid
              height="60"
              width="60"
              color="#482673"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            ></Grid>
          </div>
        )}
      </div>

      {clickedImg && (
        <ModalPhoto
          currentArray={currentArray}
          clickedImg={clickedImg}
          setClickedImg={setClickedImg}
          description={photoDescription}
          setDescription={setPhotoDescription}
        />
      )}
    </div>
  );
}

export default Gallery;
