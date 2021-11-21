import React from "react";
import DogCard from "../components/dogCard";
import Header from "../components/header";

const DogList = () => {
  return (
    <>
      <Header />
      <div className="page_content">
        <div className="row d-flex flex-wrap">
          <DogCard />
          <DogCard />
          <DogCard />
          <DogCard />
          <DogCard />
          <DogCard />
          <DogCard />
          <DogCard />
          <DogCard />
        </div>
      </div>
    </>
  );
};

export default DogList;
