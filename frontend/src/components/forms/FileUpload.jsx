import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar, Badge } from "antd";

const FileUpload = ({ setImage, image }) => {
  const handleImageRemove = () => {
    setImage("");
  };
  const fileUploadAndResize = (e) => {
    // resize
    let file = e.target.files[0];

    if (file) {
      Resizer.imageFileResizer(
        file,
        720,
        720,
        "JPEG",
        100,
        0,
        (uri) => {
          setImage(uri);
        },
        "base64"
      );
    }
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component - ProductCreate
  };

  return (
    <>
      <div className="row">
        {image && (
          <Badge
            count="X"
            onClick={handleImageRemove}
            key={image}
            style={{ cursor: "pointer" }}
          >
            <Avatar src={image} size={100} className="ml-3" shape="square" />
          </Badge>
        )}
      </div>
      <div className="row">
        <label className="btn btn-secondary">
          Upload Image
          <input
            hidden
            type="file"
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
