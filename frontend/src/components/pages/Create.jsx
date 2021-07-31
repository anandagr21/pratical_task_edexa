import { DatePicker, Spin } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { createProfile } from "../../functions/profile";
import FileUpload from "../forms/FileUpload";

const Create = ({ history }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createProfile({ name, address, age, image })
      .then((res) => {
        console.log("res", res);
        setName("");
        setAge("");
        setAddress("");
        setLoading(false);
        toast.success(`saved`);
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    let ageInNumber =
      parseInt(new Date().getFullYear()) - parseInt(dateString.split("-")[0]);

    setAge(ageInNumber);
  };

  return (
    <div className="container mt-5">
      <Spin spinning={loading}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              className="form-control"
              value={age}
              disabled
              onChange={(e) => setAge(e.target.value)}
            />
            <DatePicker onChange={onDateChange} />
          </div>

          <div className="form-group">
            <label>Profile picture</label>
            <FileUpload setImage={setImage} image={image} />
          </div>

          <button className="btn btn-outline-info">Save</button>
        </form>
      </Spin>
    </div>
  );
};

export default Create;
