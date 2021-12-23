import { message, Modal, Upload } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import Header from "../components/header";
import { v4 as uuidv4 } from "uuid";
import firebase from "../firebase";
import { Dropdown, Form, FormControl, FormLabel } from "react-bootstrap";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function PetInfoForm() {
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [isRescued, setIsRescued] = useState(false);

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
      if (e.type === "image/jpeg" || e.type === "image/png") {
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
                message.error("An unknown error occured, please try later!")
                console.log("hhhhhhhh");
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
              <Form>
                <FormLabel>Pet Name</FormLabel>
                <FormControl type="text" placeholder="" className="mb-3 " />

                <FormLabel>Age</FormLabel>
                <FormControl
                  type="text"
                  placeholder=""
                  className="mb-3 "
                  type="number"
                />

                <FormLabel>Size</FormLabel>
                <FormControl type="text" placeholder="" className="mb-3 " />

                <FormLabel>Gender</FormLabel>
                <Dropdown className="mb-3">
                  <Dropdown.Toggle>Any</Dropdown.Toggle>
                  <Dropdown.Menu className="filters-list-dropdown">
                    <Dropdown.Item href="#/action-1" active>
                      Male
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Female</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <FormLabel>Breed</FormLabel>
                <Dropdown className="mb-3">
                  <Dropdown.Toggle>Any</Dropdown.Toggle>
                  <Dropdown.Menu className="filters-list-dropdown">
                    <Dropdown.Item href="#/action-1" active>
                      Male
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Female</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <FormLabel>Please upload photos of the pet (max. 3)</FormLabel>
              </Form>
              <>
                <Upload
                  //   className="mb-3"
                  beforeUpload={(file) => {
                    const isJPG =
                      file.type === "image/jpeg" || file.type === "image/png";
                    if (!isJPG) {
                      message.error("You can only upload JPG or PNG file!");
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
              <FormControl type="number" placeholder="" className="mb-3 " />

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
                  <Form.Control as="textarea" rows={3} className="mb-3 " />
                </>
              )}
            </div>
            <button
              className="theme-color-pink text-center p-2 col-12 align-items-center login-submit mb-3"
              type="submit"
              onClick={() => uploadToFb()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
