import { Modal, useMantineTheme } from "@mantine/core";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/userAction";
import "./ProfileModal.css";
import "../../pages/Auth/Auth.css"

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const {password, ...other} = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const {user}  = useSelector((state) => state.authReducer.authData);
 
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onImageChange = (e) => {
    if(e.target.files&&e.target.files[0]){
      let img = e.target.files[0];
      e.target.name === "profilePicture" ? setProfileImage(img) : setCoverImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if(profileImage){
      const data  = new FormData();
      const filename = Date.now() + profileImage.name;
      data.append("name", filename);
      data.append("file", profileImage);
      UserData.profilePicture = filename;
      try{
        dispatch(uploadImage(data));
      }catch(error){
        console.log(error);
      }
    }
    if(coverImage){
      const data  = new FormData();
      const filename = Date.now() + coverImage.name;
      data.append("name", filename);
      data.append("file", coverImage);
      UserData.coverPicture = filename;
      try{
        dispatch(uploadImage(data));
      }catch(error){
        console.log(error);
      }
    }
    dispatch(updateUser(params.id, UserData));
    setModalOpened(false);
  };

  return (
    <Modal
      overlayProps={{
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoform">
        <h3>Your Info</h3>
        <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstName"
            onChange={handleChange}
            value = {formData.firstname}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastName"
            onChange={handleChange}
            value = {formData.lastname}
          />
        </div>
        <div>
        <input
            type="text"
            placeholder="About Yourself"
            className="infoInput"
            name="about"
            onChange={handleChange}
            value={formData.about}
          />
        </div>
        <div>
        <input
            type="text"
            placeholder="Works At"
            className="infoInput"
            name="worksat"
            onChange={handleChange}
            value={formData.worksat}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Lives In"
            className="infoInput"
            name="livesin"
            onChange={handleChange}
            value={formData.livesin}
          />
          <input
            type="text"
            placeholder="Country"
            className="infoInput"
            name="country"
            onChange={handleChange}
            value={formData.country}
          />
        </div>
        <div>
        <input
            type="text"
            placeholder="RelationShip Status"
            className="infoInput"
            name="relationship"
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>
        <div>
            Profile Image
            <input type="file" name="profilePicture" onChange = {onImageChange} />
            Cover Image
            <input type="file" name="coverPicture" onChange = {onImageChange} />
        </div>

        <button className="button infoButton" type="submit" onClick = {handleSubmit}>Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
