import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { Carousel } from "react-responsive-carousel";
import Spinner from "../components/spinner";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/petDetails.css";
import { useNavigate } from "react-router";
import { message } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

const Razorpay = require("razorpay");

const PetDetails = (props) => {
  const navigator = useNavigate();
  const [load, setLoad] = useState(false);
  const [details, setDetails] = useState([]);
  const [arrayImg, setArrayImg] = useState([]);

  const params = useParams();

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePaymentSuccess = () => {
    message.success("Payment successful");
  };

  const showRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    //     try {
    //       const instance = new Razorpay({
    //         key_id: process.env.REACT_APP_PUBLIC_KEY,
    //         key_secret: process.env.REACT_APP_SECRET_KEY,
    //       });

    //       const options = {
    //         amount: 50000, // amount in smallest currency unit
    //         currency: "INR",
    //         receipt: "receipt_order_74394",
    //       };

    //       var order = await instance.orders.create(options);
    // console.log(order);
    //       if (!order) alert("Some error occured");

    //       // res.json(order);
    //     } catch (error) {
    //       // res.status(500).send(error);
    //       console.log(error);
    //     }

    const options = {
      key: process.env.REACT_APP_PUBLIC_KEY, // Enter the Key ID generated from the Dashboard
      amount: 1000,
      currency: "INR",
      name: "Soumya Corp.",
      description: "Test Transaction",
      image: "",
      order_id: "",
      handler: async function (response) {
        message.info("Success");
      },
      prefill: {
        name: "Soumya Dey",
        email: "SoumyaDey@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const getDetails = (params) => {
    setLoad(true);
    if (params?.id) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/v1/pet_api/${params?.id}`)
        .then((res) => {
          let a = [];
          console.log(res.data);
          setDetails(res.data);
          if (res.data.first_image != undefined) {
            a.push({ image: res.data.first_image, caption: "" });
          }
          if (res.data.second_image != undefined) {
            a.push({ image: res.data.second_image, caption: "" });
          }
          if (res.data.third_image != undefined) {
            a.push({ image: res.data.third_image, caption: "" });
          }
          setArrayImg(a);
          setLoad(false);
        })
        .catch((e) => {
          setLoad(false);
          setDetails();
          message.error("Something went wrong");
        });
    } else {
      message.error("Details cannot be displayed");
      setLoad(false);
    }
  };

  useEffect(() => {
    // console.log(params);
    getDetails(params);
  }, []);

  return (
    <>
      <Header />
      {load ? (
        <div className="spinner-container">
          <div className="d-flex justify-content-center">
            <Spinner size="large" show={true} />
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="page_content">
        {!load && details && (
          <div className="container">
            <div className="row text-center">
              <h1>{details?.name}</h1>
            </div>
            <div className="row">
              <Carousel autoplay className="carousel_product_details">
                {arrayImg.map((_) => (
                  <div className="product_image_details">
                    <img src={_.image} alt="first_image" />
                    {/* <p>{_.image}</p> */}
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                  <div className="dog-description-outline text-center">
                    <h2 className="">About {details?.name}</h2>
                    <br />
                    <p>
                      By: {details.animal_shelter_name}, {details.city},{" "}
                      {details?.state}
                    </p>
                    <br />
                    <p>Breed: {details?.breed}</p>
                    <br />
                    <p>Gender: {details?.gender}</p>
                    <br />
                    <p>Age: {details?.age}</p>
                    <br />
                    <p>Size: {details?.size}</p>
                    <br />
                    {details?.story ? (
                      <p>
                        {details?.name}'s story: {details?.story}
                      </p>
                    ) : (
                      <></>
                    )}
                    <br />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                  <div className="dog-description-outline text-center">
                    <h2>Posted By</h2>
                    <br />
                    <h4>{details?.animal_shelter_name}</h4>
                    <br />
                    <p>
                      <i class="fa fa-map-marker pink" aria-hidden="true"></i>
                      <br />
                      {details?.city}, {details?.state}
                    </p>
                    <br />
                    <p>
                      <a className="details-link" href="tel:+91 9826 311996">
                        <i class="fa fa-phone pink" aria-hidden="true"></i>
                        {details?.phone}
                      </a>
                    </p>
                    <br />
                    <p>
                      <a className="details-link" href="mailto:info@ngo.com">
                        <i class="fa fa-envelope pink" aria-hidden="true"></i>
                        info@ngo.com
                      </a>
                    </p>
                    <br />
                    <button
                      className="theme-color-pink text-center p-2 col-12 align-items-center login-submit mb-3"
                      onClick={() =>
                        navigator(
                          `/adoption-form/${details?.animalshelter}/${details?.id}`
                        )
                      }
                    >
                      Apply for adoption
                    </button>
                    <br />
                    <br />
                    <button
                      className="theme-color-pink text-center p-2 col-12 align-items-center login-submit mb-3"
                      onClick={() => navigator("/findpets")}
                    >
                      Look for other dogs
                    </button>
                    <br />
                    <br />
                    <button
                      className="theme-color-pink text-center p-2 col-12 align-items-center login-submit mb-3"
                      onClick={() => showRazorpay()}
                    >
                      Donate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PetDetails;
