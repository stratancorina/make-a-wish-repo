import React from "react";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "../../Pages.css";
import AddProdModal from "./AddProdModal";
import ProductDetails from "../ProductDetails";
import { Grid } from "react-loader-spinner";

function ProductsComponent() {
  const axiosPrivate = useAxiosPrivate();

  const [products, setProducts] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProd = async () => {
      try {
        const response = await axiosPrivate.get("/products", {
          signal: controller.signal,
        });
        isMounted && setProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getProd();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [products]);

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axiosPrivate.delete(`/products/${selectedProduct.id}`);

      setProducts(products.filter((prod) => prod.id !== selectedProduct.id));

      setSelectedProduct(null);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelDelete = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  const [showModalAdd, setShowModalAdd] = useState(false);

  const handleOpenModalAdd = () => {
    setShowModalAdd(true);
  };

  const handleCloseModal = () => {
    setShowModalAdd(false);
  };

  const handleAddProduct = () => {
    // Perform any necessary actions after adding the product
    // ...
  };
  const [isOpen, setIsOpen] = useState(false);
  const [productDetail, setProductDetail] = useState([]);

  return (
    <>
        <div className="display-flex-adm">
          <h1 className="personal-info-title in-admin">Produse</h1>
          <button
            onClick={handleOpenModalAdd}
            className="login-register-button add-prod-btn"
          >
            Adauga un produs
          </button>
        </div>
        <div> 
        {products ? (
      <>
          
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nume produs</th>
              <th>Pret</th>
              <th>Categorie</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products?.length > 0 ? (
              products.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.id}</td>
                  <td>{prod.name}</td>
                  <td>{prod.price}</td>
                  <td>{prod.category}</td>
                  <td className="edit-btns">
                    <div onClick={() => handleDeleteClick(prod)}>
                      <svg
                        className="delete-svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLineJoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M4 7H20"
                            stroke="var(--purple)"
                            stroke-width="2"
                            strokeLinecap="round"
                            strokeLineJoin="round"
                          ></path>{" "}
                          <path
                            d="M6 7V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7"
                            stroke="#000000"
                            stroke-width="2"
                            strokeLinecap="round"
                            strokeLineJoin="round"
                          ></path>{" "}
                          <path
                            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                            stroke="#000000"
                            stroke-width="2"
                            strokeLinecap="round"
                            strokeLineJoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    </div>

                    <div
                      onClick={() => [setIsOpen(true), setProductDetail(prod)]}
                    >
                      <svg
                        className="delete-svg"
                        fill="#000000"
                        viewBox="0 0 32 32"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLineJoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path d="M16.108 10.044c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.686 6-6-2.686-6-6-6zM16.108 20.044c-2.206 0-4.046-1.838-4.046-4.044s1.794-4 4-4c2.206 0 4 1.794 4 4s-1.748 4.044-3.954 4.044zM31.99 15.768c-0.012-0.050-0.006-0.104-0.021-0.153-0.006-0.021-0.020-0.033-0.027-0.051-0.011-0.028-0.008-0.062-0.023-0.089-2.909-6.66-9.177-10.492-15.857-10.492s-13.074 3.826-15.984 10.486c-0.012 0.028-0.010 0.057-0.021 0.089-0.007 0.020-0.021 0.030-0.028 0.049-0.015 0.050-0.009 0.103-0.019 0.154-0.018 0.090-0.035 0.178-0.035 0.269s0.017 0.177 0.035 0.268c0.010 0.050 0.003 0.105 0.019 0.152 0.006 0.023 0.021 0.032 0.028 0.052 0.010 0.027 0.008 0.061 0.021 0.089 2.91 6.658 9.242 10.428 15.922 10.428s13.011-3.762 15.92-10.422c0.015-0.029 0.012-0.058 0.023-0.090 0.007-0.017 0.020-0.030 0.026-0.050 0.015-0.049 0.011-0.102 0.021-0.154 0.018-0.090 0.034-0.177 0.034-0.27 0-0.088-0.017-0.175-0.035-0.266zM16 25.019c-5.665 0-11.242-2.986-13.982-8.99 2.714-5.983 8.365-9.047 14.044-9.047 5.678 0 11.203 3.067 13.918 9.053-2.713 5.982-8.301 8.984-13.981 8.984z"></path>{" "}
                        </g>
                      </svg>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <p>Nu exista comenzi</p>
            )}
          </tbody>
        </table>
      </>

        ) : (
          <div className="loader admin-loader display-flex-adm">
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
      {/* Modal component */}
      {showModal && (
        <div className="modal-add-prod">
          <div className="modal-add-content">
            <h2 className="title1">Confirmare</h2>
            <p className="modal-prod-description ">
              Esti sigur ca vrei sa stergi acest produs?
            </p>
            <div className="modal-actions">
              <button
                className="login-register-button"
                onClick={handleConfirmDelete}
              >
                Da
              </button>
              <button
                className="login-register-button cancel-btn"
                onClick={handleCancelDelete}
              >
                Nu
              </button>
            </div>
          </div>
        </div>
      )}

      <AddProdModal
        showModal={showModalAdd}
        onCloseModal={handleCloseModal}
        onAddProduct={handleAddProduct}
      />

      {isOpen && (
        <ProductDetails product={productDetail} setIsOpen={setIsOpen} />
      )}
    </div>
    </>
  );
}

export default ProductsComponent;
