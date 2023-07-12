import React, { useState, useEffect } from "react";
import axios from "axios";
import DotsNav from "./DotsNav";
import "../Pages.css";
import Product from "./Product";
import ProductDetails from "./ProductDetails";
import useFormContext from "../hooks/useFormContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Grid } from "react-loader-spinner";
import { Cart } from "./Cart";
import { useNavigate, useLocation } from "react-router-dom";

const FormGift = () => {
  const { data, setData, handleChange } = useFormContext();
  const axiosPrivate = useAxiosPrivate();
  const [products, setProducts] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [productDetail, setProductDetail] = useState([]);

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  console.log(from)

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProd = async () => {
      try {
        const response = await axiosPrivate.get("/products", {
          signal: controller.signal,
        });
        // console.log(response.data);
        isMounted && setProducts(response.data);

      } catch (err) {
        console.error(err);
        // navigate('/login' , {state: {from: location}, replace:true});
      }
    };

    getProd();
    // console.log(products.length);
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // console.log(products);
  return (
    <>
      <div className="personal-form">
        {products?.length ? (
          <>
            <div className="inherit-width">
              <h2 className="form-title">Alege cadoul dorit</h2>

              <div className="form-info-suggestion insert-animation">
                Selecteaza minim un cadou din toate produsele noastre si cel
                mult un produs dintr-o categorie.
              </div>
              <div className="line-form"></div>
              <h3 className="form-title subs">Flori</h3>
            </div>
            <div className="gifts-container">
              {products
                .filter((item) => item.category === "flowers")
                .map((item) => (
                  <Product
                    product={item}
                    key={item.id}
                    onClick={() => [setIsOpen(true), setProductDetail(item)]}
                  />
                ))}
            </div>
            <div className="inherit-width cakes">
              <div className="line-form"></div>
              <h3 className="form-title subs">Tort</h3>
            </div>
            <div className="cake-details">
              <div className="inherit-width-cake">
                <label htmlFor="cakeFlavour">Aroma tortului:</label>
                <select
                  id="cakeFlavour"
                  onChange={handleChange}
                  value={data.cakeFlavour}
                  name="cakeFlavour"
                  required
                >
                  <option value="ciocolata">Ciocolata</option>
                  <option value="lamaie">Vanilie</option>
                  <option value="zmeura">Zmeura</option>
                  <option value="capsuni">Capsuni</option>
                  <option value="portocale">Portocale</option>
                  <option value="raffaello">Raffaello</option>
                  <option value="oreo">Oreo</option>
                  <option value="tiramisu">Tiramisu</option>
                </select>
              </div>
              <div className="inherit-width-cake">
                <label className="second-label" htmlFor="cakeKg">
                  Dimensiunea(kg):
                </label>
                <select
                  id="cakeKg"
                  onChange={handleChange}
                  value={data.cakeKg}
                  name="cakeKg"
                  required
                >
                  <option value="1">1</option>
                  <option value="1.5">1,5</option>
                  <option value="2">2</option>
                  <option value="2.5">2,5</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
            <div className="gifts-container">
              {products
                .filter((item) => item.category === "cake")
                .map((item) => (
                  <Product
                    product={item}
                    key={item.id}
                    onClick={() => [setIsOpen(true), setProductDetail(item)]}
                  />
                ))}
            </div>
            <div className="inherit-width cakes">
              <div className="line-form"></div>
              <h3 className="form-title subs">Ladita cu fructe</h3>
            </div>
            <div className="gifts-container">
              {products
                .filter((item) => item.category === "fruits")
                .map((item) => (
                  <Product
                    product={item}
                    key={item.id}
                    onClick={() => [setIsOpen(true), setProductDetail(item)]}
                  />
                ))}
            </div>

            <div className="inherit-width cakes">
              <div className="line-form"></div>
              <h3 className="form-title subs">Buchet DIY</h3>
            </div>
            <div className="gifts-container">
              {products
                .filter((item) => item.category === "bouquet")
                .map((item) => (
                  <Product
                    product={item}
                    key={item.id}
                    onClick={() => [setIsOpen(true), setProductDetail(item)]}
                  />
                ))}
            </div>

            <Cart objectProp={products}></Cart>
          </>
        ) : (
          <div className="loader">
            <Grid
              height="60"
              width="60"
              color="var(--pink)"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}

        {/* <div className="button-container">
                            <button className='button-purple' type="submit">Continua</button>

                        </div> */}
      </div>

      {isOpen && (
        <ProductDetails product={productDetail} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default FormGift;
