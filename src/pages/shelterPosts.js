import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import { useParams } from "react-router";
import Spinner from "../components/spinner";
import { message } from "antd";
import DogCard from "../components/dogCard";

const ShelterPosts = () => {
  const userId = localStorage.getItem("userId");
  let a = [];

  const [load, setLoad] = useState(false);
  const [list, setList] = useState([]);
  const params = useParams();

  useEffect(() => {
    setLoad(true);
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/pet_api/?animalshelter_id=${params.shelterId}`
      )
      .then((res) => {
        console.log(res.data);
        setLoad(false);
        setList(res.data);
      })
      .catch((e) => {
        a = [];
        setLoad(false);
        message.error("Something went wrong");
      });
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
        <div className="container m-auto">
          <div className="row mt-3">
            {!load && list.length == 0 ? (
              <h1 className="text-center">No Posts Yet</h1>
            ) : (
              <h1 className="text-center">
                Posts By {list[0]?.animal_shelter_name}
              </h1>
            )}
            {!load &&
              list?.length > 0 &&
              list.map((res) => (
                <DogCard
                  name={res.name}
                  img={res.first_image}
                  location={res.city}
                  id={res.id}
                  key={res.id}
                  is_adopted={res.is_adopted}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShelterPosts;
