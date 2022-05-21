import { message, Modal, Upload } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import Header from "../components/header";
import { v4 as uuidv4 } from "uuid";
import { Dropdown, Form, FormControl, FormLabel } from "react-bootstrap";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";
import { useNavigate } from "react-router";

export default function PetInfoForm() {
  const userId = localStorage.getItem("userId");
  const animalShelterId = localStorage.getItem("userInfoId");
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [isRescued, setIsRescued] = useState(false);

  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState("");
  const [breed2, setBreed2] = useState("");
  const [story, setStory] = useState("");
  const [color, setColor] = useState("");
  const [vaccination, setVaccination] = useState(false);
  const [fee, setFee] = useState(0);

  const navigate = useNavigate();

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const onChange = ({ fileList: newFileList }) => {
    var arr = [];
    newFileList.forEach((e) => {
      if (
        (e.type === "image/jpeg" || e.type === "image/png") &&
        e.size <= 250000
      ) {
        arr.push(e);
      }
    });
    setFileList(arr);
    setImage1(arr[0]);
    setImage2(arr[1]);
    setImage3(arr[2]);
    console.log(image1, image2, image3);
  };

  const handleCancel = () => setPreviewVisible(false);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handlePreview = async (file) => {
    if (file) {
      if (!file.url || !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      console.log(file.preview);
      setPreviewImage(file.url || file.preview);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
      setPreviewVisible(true);
      console.log(previewImage);
    }
  };

  const uploadToFb = () => {
    if (fileList.length > 0) {
      const storage = getStorage();
      for (var key in fileList) {
        console.log(fileList[key]);
        const storageRef = ref(storage, `images/${uuidv4()}`);
        const uploadTask = uploadBytesResumable(
          storageRef,
          fileList[key].originFileObj
        );

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            switch (error.code) {
              case "storage/unauthorized":
                console.log("jjjjjjjjhh");
                break;
              case "storage/canceled":
                console.log("wwwwwwwww");
                break;
              case "storage/unknown":
                message.error("An unknown error occured, please try later!");
                console.log("hhhhhhhh");
                break;
              default:
                break;
            }
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
            });
          }
        );
      }
    }
  };

  const sendPetInfo = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", name);
    breed != "Others"
      ? formData.append("breed", breed)
      : formData.append("breed", breed2);
    formData.append("gender", gender);
    formData.append("color", color);
    formData.append("age", age);
    formData.append("size", size);
    formData.append("vaccination", vaccination);
    formData.append("adoption_fee", fee);
    formData.append("is_rescued", isRescued);
    formData.append("first_image", image1.originFileObj);
    image2 && formData.append("second_image", image2?.originFileObj);
    image3 && formData.append("third_image", image3?.originFileObj);
    formData.append("animalshelter", animalShelterId);
    formData.append("story", story);

    console.log(formData);

    if (!image1) {
      message.error("Please upload atleast 1 photo");
    } else if (!gender) {
      message.error("Please specify the gender");
    } else if (!age) {
      message.error("Please specify the age");
    } else if (!breed) {
      message.error("Please specify the breed");
    } else if (breed == "Others" && !breed2) {
      message.error("Please specify the breed");
    } else if (!size) {
      message.error("Please specify the size");
    } else if (!vaccination) {
      message.error("Please specify the vaccination status");
    } else {
      axios
        .post(process.env.REACT_APP_BASE_URL + `/api/v1/pet_api/`, formData, {
          headers: {
            Accept: "application/json, text/plain",
            "Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
          },
        })
        .then((res) => {
          // setFileList([]);
          // setImage1("");
          // setImage2("");
          // setImage3("");
          console.log(res);
          message.success("The information has been posted");
          navigate(`/organisation/posts/${animalShelterId}`);
        })
        .catch((e) => {
          console.log(e.message);
          // setFileList([]);
          // setImage1("");
          // setImage2("");
          // setImage3("");
          message.success("Something went wrong!");
        });
    }
  };

  return (
    <>
      <Header />
      <div className="page_content">
        <div className="container">
          <div className="row">
            <h1 className="text-center">Pet Information Form</h1>
            <h5 className="text-center mb-4">
              Please fill in this form carefully
            </h5>
            <div className="form-container">
              <Form onSubmit={(e) => sendPetInfo(e)}>
                <FormLabel>Pet Name</FormLabel>
                <FormControl
                  type="text"
                  placeholder=""
                  className="mb-3 "
                  onChange={(e) => setName(e.target.value)}
                  required
                  value={name}
                />

                <FormLabel>Age (in yrs)</FormLabel>
                <Form.Select
                  aria-label="Select"
                  className="theme-color-pink mb-3"
                  onChange={(e) => setAge(e.target.value)}
                  value={age}
                >
                  <option value="">Select</option>
                  <option value="less than 1">less than 1</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="more than 15">more than 15</option>
                </Form.Select>

                <FormLabel>Size</FormLabel>
                <Form.Select
                  aria-label="Select"
                  className="theme-color-pink mb-3"
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Puppy">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Adult">Large</option>
                </Form.Select>

                <FormLabel>Gender</FormLabel>
                <Form.Select
                  aria-label="Select"
                  className="theme-color-pink mb-3"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>

                <FormLabel>Color Description</FormLabel>
                <FormControl
                  type="text"
                  placeholder=""
                  className="mb-3 "
                  onChange={(e) => setColor(e.target.value)}
                  required
                />

                <FormLabel>Breed</FormLabel>
                <Form.Select
                  aria-label="Select"
                  className="theme-color-pink mb-3"
                  onChange={(e) => setBreed(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Unknown">Unknown</option>
                  <option value="American Bulldog">American Bulldog</option>
                  <option value="Beagle">Beagle</option>
                  <option value="Bhakarwal">Bhakarwal Dog</option>
                  <option value="Boxer">Boxer</option>
                  <option value="Chihuahua">Chihuahua</option>
                  <option value="Cocker Spaniel">Cocker Spaniel</option>
                  <option value="Dalmatian">Dalmatian</option>
                  <option value="Doberman">Doberman</option>
                  <option value="German Shepherd">German Shepherd</option>
                  <option value="Golden Retriever">Golden Retriever</option>
                  <option value="Hound">Hound</option>
                  <option value="Husky">Husky</option>
                  <option value="Indian Pariah Dog">Indian Pariah Dog</option>
                  <option value="Labrador">Labrador</option>
                  <option value="Pomeranian">Pomeranian</option>
                  <option value="Pug">Pug</option>
                  <option value="Rottweiler">Rottweiler</option>
                  <option value="Samoyed">Samoyed</option>
                  <option value="Schitzu">Schitzu</option>
                  <option value="St. Dermard">St. Dermard</option>
                  <option value="Others">Others</option>
                </Form.Select>

                {breed == "Others" && (
                  <>
                    <FormLabel>Please Specify the breed</FormLabel>
                    <FormControl
                      type="text"
                      placeholder=""
                      className="mb-3 "
                      onChange={(e) => setBreed2(e.target.value)}
                      value={breed2}
                    />
                  </>
                )}

                <FormLabel>Vaccination status</FormLabel>
                <Form.Select
                  aria-label="Select"
                  className="theme-color-pink mb-3"
                  onChange={(e) => setVaccination(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Not Vaccianted">Not vaccinated</option>
                  <option value="Partially Vaccinated">
                    Partially Vaccinated
                  </option>
                  <option value="Completely Vaccinated">
                    Completely Vaccinated
                  </option>
                </Form.Select>

                <FormLabel>Please upload photos of the pet (max. 3)</FormLabel>
                <>
                  <Upload
                    //   className="mb-3"
                    beforeUpload={(file) => {
                      const isJPG =
                        file.type === "image/jpeg" ||
                        file.type === "image/png" ||
                        file.type === "image/jpg";

                      const isLimit = file.size <= 250000;
                      if (!isJPG) {
                        message.error("You can only upload JPG or PNG file!");
                        return false;
                      } else if (!isLimit) {
                        message.error("This file exceeds 250KB limit!");
                        return false;
                      } else {
                        console.log(file);
                        return true;
                      }
                    }}
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    customRequest={dummyRequest}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={onChange}
                  >
                    {fileList.length >= 3 ? null : uploadButton}
                  </Upload>
                  <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                    />
                  </Modal>
                </>
                <FormLabel>Adoption fees (if any)</FormLabel>
                <FormControl
                  type="number"
                  placeholder=""
                  className="mb-3 "
                  onChange={(e) => setFee(e.target.value)}
                  value={fee}
                />

                <Form.Check
                  className="mb-3 fs-5"
                  // type={type}
                  id={`default`}
                  label={`Is the pet rescued?`}
                  onChange={() => setIsRescued(!isRescued)}
                />
                {isRescued && (
                  <>
                    <FormLabel>
                      Would you like to share this pet's rescue story?
                    </FormLabel>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      className="mb-3 "
                      onChange={(e) => setStory(e.target.value)}
                    />
                  </>
                )}
                <button
                  className="theme-color-pink text-center p-2 col-12 align-items-center login-submit mb-3"
                  type="submit"
                  // onClick={() => uploadToFb()}
                >
                  Submit
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
