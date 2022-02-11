import React from "react";
import Header from "../components/header";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/petDetails.css";
import { useNavigate } from "react-router";
import { message } from "antd";
import axios from "axios";
const Razorpay = require("razorpay");

const PetDetails = () => {
  const navigator = useNavigate();

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

  return (
    <>
      <Header />
      <div className="page_content">
        <div className="container">
          <div className="row text-center">
            <h1>Bruno</h1>
          </div>
          <div className="row">
            <Carousel autoplay className="carousel_product_details">
              <div>
                <img src="/images/homeDog.jpg" alt="pet" />
              </div>
              <div>
                <img src="/images/homeDog.jpg" alt="pet" />
              </div>
              <div>
                <img src="/images/homeDog.jpg" alt="pet" />
              </div>
              <div>
                <img src="/images/homeDog.jpg" alt="pet" />
              </div>
            </Carousel>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                <div className="dog-description-outline text-center">
                  <h2 className="">About Bruno</h2>
                  <br />
                  <p>By: Smile Foundation, Karnataka, Bengaluru</p>
                  <br />
                  <p>Breed: Golden Retriever</p>
                  <br />
                  <p>Gender: Male</p>
                  <br />
                  <p>Age: 4yrs</p>
                  <br />
                  <p>Size: Medium</p>
                  <br />
                  <p>
                    Bruno's story: Bruno was found in a wildlife preserve,
                    terrified and not wanting to be anywhere near humans. He had
                    a broken hip, cause unknown, but given the condition of the
                    dog, her rescuers had every reason to believe that she was
                    probably thrown from a car. Bruno was placed in a foster
                    home where he was able to heal from her injuries and later
                    placed in a forever home.
                  </p>
                  <br />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                <div className="dog-description-outline text-center">
                  <h2>Posted By</h2>
                  <br />
                  <h4>Smile Foundation</h4>
                  <br />
                  <p>
                    <i class="fa fa-map-marker pink" aria-hidden="true"></i>
                    near aphb colony, Bank Colony,
                    <br /> New Malakpet, Karnataka, Bengaluru
                  </p>
                  <br />
                  <p>
                    <a className="details-link" href="tel:+91 9826 311996">
                      <i class="fa fa-phone pink" aria-hidden="true"></i>
                      +91 9826 311996
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
                    onClick={() => navigator("/adoption-form")}
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
      </div>
    </>
  );
};

export default PetDetails;
