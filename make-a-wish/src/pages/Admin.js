import React from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useEffect, useState, useRef } from "react";
import ProductsComponent from "../components/AdminChildren/ProductsComponent";
import UsersComponent from "../components/AdminChildren/UsersComponent";
import OrdersComponent from "../components/AdminChildren/OrdersComponent";
import PhotoOrders from "../components/AdminChildren/PhotoOrders";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ReviewStars from "../components/ReviewStars";
import { Bar } from "react-chartjs-2";

import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);

ChartJS.register(ArcElement, Tooltip, Legend);

function Admin() {
  const [orders, setOrders] = useState([]);
  const [selectedContent, setSelectedContent] = useState("general");
  const [lastOrder, setLastOrder] = useState(null);

  const [reviews, setReviews] = useState([]);

  const handleNavButtonClick = (content) => {
    setSelectedContent(content);
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3001/orders");
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      orders.sort((a, b) => b.id - a.id);
      const lastOrder = orders[0];
      setLastOrder(lastOrder);
      console.log(lastOrder);
    }
  }, [orders]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/reviews`);
        const reversedReviews = response.data.reverse();
        setReviews(reversedReviews);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    console.log("Reviews:", reviews);
  }, [reviews]);

  const completedOrders =
    orders && orders.filter((order) => order.status === "completed");
  const pendingOrders =
    orders && orders.filter((order) => order.status === "pending");

  const data = {
    labels: ["Comenzi complete", "Comenzi in asteptare"],
    datasets: [
      {
        label: "# of Orders",
        data: [completedOrders.length, pendingOrders.length],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const gradeCounts = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  reviews?.forEach((review) => {
    const grade = review.grade.toString();
    if (gradeCounts.hasOwnProperty(grade)) {
      gradeCounts[grade]++;
    }
  });

  useEffect(() => {
    console.log("Grade Counts:", gradeCounts);
  }, [gradeCounts]);

  const reversedData = Object.values(gradeCounts).reverse();
  // data for reviews
  const dataRev = {
    labels: ["5", "4", "3", "2", "1"],
    datasets: [
      {
        axis: "y",
        data: reversedData,
        fill: false,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: false,
        text: "Recenzii", // Optional: Provide a title text if needed
      },
      legend: {
        display: false, // Hide the legend
      },
    },
  };

  return (
    <div className="page-container admin-page-container">
      <div className=" above-background admin-container">
        <div className="admin-nav">
          <div
            className={`admin-nav-button ${
              selectedContent === "general" ? "active" : ""
            }`}
            onClick={() => handleNavButtonClick("general")}
          >
            <svg
              className="svg-admin"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M12 12C12 11.4477 12.4477 11 13 11H19C19.5523 11 20 11.4477 20 12V19C20 19.5523 19.5523 20 19 20H13C12.4477 20 12 19.5523 12 19V12Z"
                  stroke="#000000"
                  stroke-width="1.104"
                  strokeLinecap="round"
                ></path>{" "}
                <path
                  d="M4 5C4 4.44772 4.44772 4 5 4H8C8.55228 4 9 4.44772 9 5V19C9 19.5523 8.55228 20 8 20H5C4.44772 20 4 19.5523 4 19V5Z"
                  stroke="#000000"
                  stroke-width="1.104"
                  strokeLinecap="round"
                ></path>{" "}
                <path
                  d="M12 5C12 4.44772 12.4477 4 13 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H13C12.4477 8 12 7.55228 12 7V5Z"
                  stroke="#000000"
                  stroke-width="1.104"
                  strokeLinecap="round"
                ></path>{" "}
              </g>
            </svg>
            <p>General </p>
          </div>
          <div
            className={`admin-nav-button ${
              selectedContent === "orders" ? "active" : ""
            }`}
            onClick={() => handleNavButtonClick("orders")}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <rect
                  x="5"
                  y="4"
                  width="14"
                  height="17"
                  rx="2"
                  stroke="#222222"
                ></rect>{" "}
                <path
                  d="M9 9H15"
                  stroke="#222222"
                  strokeLinecap="round"
                ></path>{" "}
                <path
                  d="M9 13H15"
                  stroke="#222222"
                  strokeLinecap="round"
                ></path>{" "}
                <path
                  d="M9 17H13"
                  stroke="#222222"
                  strokeLinecap="round"
                ></path>{" "}
              </g>
            </svg>
            <p>Comenzi </p>
          </div>
          <div
            className={`admin-nav-button ${
              selectedContent === "users" ? "active" : ""
            }`}
            onClick={() => handleNavButtonClick("users")}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  opacity="0.15"
                  d="M12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"
                  fill="#000000"
                ></path>{" "}
                <path
                  d="M3 19H1V18C1 16.1362 2.27477 14.5701 4 14.126M6 10.8293C4.83481 10.4175 4 9.30621 4 7.99999C4 6.69378 4.83481 5.58254 6 5.1707M21 19H23V18C23 16.1362 21.7252 14.5701 20 14.126M18 5.1707C19.1652 5.58254 20 6.69378 20 7.99999C20 9.30621 19.1652 10.4175 18 10.8293M10 14H14C16.2091 14 18 15.7909 18 18V19H6V18C6 15.7909 7.79086 14 10 14ZM15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z"
                  stroke="#000000"
                  stroke-width="0.984"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <p> Useri </p>
          </div>
          <div
            className={`admin-nav-button ${
              selectedContent === "products" ? "active" : ""
            }`}
            onClick={() => handleNavButtonClick("products")}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M5 10.0802V20.0802H19V14M5 10.0802H4V7.0802H20V10.0802H5ZM12 7.0802C12.8333 5.24687 14.9999 1.5802 16.9999 3.5802C18.9999 5.5802 14.5 6.91353 12 7.0802ZM12 7.0802C11.1667 5.24687 8.99999 1.5802 6.99999 3.5802C4.99999 5.5802 9.5 6.91353 12 7.0802Z"
                  stroke="#000000"
                  stroke-width="1.008"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <p>Produse </p>
          </div>
          <div
            className={`admin-nav-button ${
              selectedContent === "photos_orders" ? "active" : ""
            }`}
            onClick={() => handleNavButtonClick("photos_orders")}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M5 10.0802V20.0802H19V14M5 10.0802H4V7.0802H20V10.0802H5ZM12 7.0802C12.8333 5.24687 14.9999 1.5802 16.9999 3.5802C18.9999 5.5802 14.5 6.91353 12 7.0802ZM12 7.0802C11.1667 5.24687 8.99999 1.5802 6.99999 3.5802C4.99999 5.5802 9.5 6.91353 12 7.0802Z"
                  stroke="#000000"
                  stroke-width="1.008"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <p>Poze comenzi </p>
          </div>
        </div>

        <div className="admin-nav admin-content">
          {selectedContent === "general" && (
            <>
              <div className="display-flex-adm">
                <h1 className="personal-info-title in-admin">General</h1>
              </div>

              <div className="admin-dashboard">
                <div className="pie1 admin-dash-child">
                  <h3>Numar comenzi totale: {orders.length}</h3>

                  <Pie data={data} />
                </div>

                {lastOrder && (
                  <div className="admin-dash-child">
                    <h3>Ultima comanda inregistrata: </h3>
                    <table className="dash-ord-summery">
                      <tbody>
                        <tr>
                          <td>Order ID:</td>
                          <td>{lastOrder.id}</td>
                        </tr>
                        <tr>
                          <td>Utilizator:</td>
                          <td>{lastOrder.username}</td>
                        </tr>
                        <tr>
                          <td>Pentru:</td>
                          <td>
                            {lastOrder.receiverFirstName}{" "}
                            {lastOrder.receiverLastName}
                          </td>
                        </tr>
                        <tr>
                          <td>Data:</td>
                          <td>
                            {new Date(
                              lastOrder.deliveryDate
                            ).toLocaleDateString()}
                          </td>
                        </tr>
                        <tr>
                          <td>Ora:</td>
                          <td>{lastOrder.deliveryTime}</td>
                        </tr>
                        <tr>
                          <td>Suma:</td>
                          <td>{lastOrder.totalPrice} lei</td>
                        </tr>
                        <tr>
                          <td>Status:</td>
                          <td>
                            {lastOrder.status === "pending" ? (
                              <>În așteptare</>
                            ): ( <>Completat</>)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="admin-dash-child">
                  <h3>Recenzii: </h3>

                  <Bar data={dataRev} options={options} />

                  <div className="reviews-container">
                    {reviews?.length > 0 ? (
                      reviews.slice(0, 2).map((review) => (
                        <div className="show-review">
                          <div className="p-flex">
                            <p>{review.user}</p>
                            <p>
                              {new Date(
                                review.date_review
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <ReviewStars score={review.grade} maxStars={5} />
                          <p> {review.text} </p>
                        </div>
                      ))
                    ) : (
                      <p> nu ai recenzii </p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
          {selectedContent === "products" && <ProductsComponent />}
          {selectedContent === "users" && <UsersComponent />}
          {selectedContent === "orders" && <OrdersComponent />}
          {selectedContent === "photos_orders" && <PhotoOrders />}

          {/* {selectedContent === 'users' && <UsersComponent />} */}
        </div>
      </div>
    </div>
  );
}

export default Admin;
