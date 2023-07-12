import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../Background.css";
import axios from "axios";
import { Link } from "react-router-dom";
import OrderPhotoResult from "../components/OrderPhotoResult";
import OrderDetail from "../components/AdminChildren/OrderDetail";

const MyProfile = () => {
  const { auth, setAuth } = useAuth();
  const [orders, setOrders] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState([]);

  const navigate = useNavigate();
  const hangleLogout = () => {
    setAuth({});
    navigate("/");
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/orders/${auth.username}`
        );
        console.log(auth.id);
        setOrders(response.data);
        console.log(response.data);
        console.log("found.order");
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, []);

  return (
    <>
    <div className="page-container background">
      <div class="elements">
        <div class="square sq1"></div>
        <div class="square sq2"></div>
        <div class="square sq3"></div>
      </div>

      <div className=" above-background my-profile-container ">
        <div className="personal-info-wrapper">
          <div className="personal-info1">
            <div className="personal-info">
              <h1
                className="personal-info-title logout-myprofile"
                onClick={hangleLogout}
              >
                {" "}
                {auth.username}{" "}
              </h1>
            </div>
          </div>
        </div>

        <div className="my-orders" style={{ overflow: 'auto' }}>
          <h1 className="personal-info-title">Comenzile mele</h1>

          {orders?.length > 0 ? (
            orders.map((order) => (
              // < div className="display-flex">
              <div className={`order-info ${order.status === "pending" ? "pending-order" : "completed-order"}`}
                key={order.id}>
                <div>
                <p>Comanda id: {order.id}</p>
                <p>
                  Pentru: {order.receiverFirstName} {order.receiverLastName}
                </p>
                <p>Suma: {order.totalPrice} lei</p>
                <p>
                  Status: {order.status === "pending" && <span >În așteptare</span>}{" "}
                  {order.status === "completed" && <span className="completed-order-p">Completat</span>}
                </p>
                </div>

                {order.status === "completed" ? (<> <div  className="btn-small btn-reset" onClick={() => [setIsOpen(true), setOrder(order)]}> Vezi detalii</div> </>) : (
                  <Link className="btn-small btn-reset" to="/contact">Contacteaza <br/> administratorul </Link>
                )}

              </div>


            ))
          ) : (
            <p>
              Nu ai efectuat nicio comandă. Dacă dorești să faci asta, accesează
              pagina <Link to="/comanda">comandă</Link>.
            </p>
          )}
        </div>
      </div>
    </div>

{isOpen && (
  <OrderDetail order={order} setIsOpen={setIsOpen} />
)}
</>
  );
};

export default MyProfile;
