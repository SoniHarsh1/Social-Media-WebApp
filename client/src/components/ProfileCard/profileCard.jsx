import React from "react";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";

import "./ProfileCard.css";

const ProfileCard = ({location}) => {

  const {user} = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="ProfileCard">
      <div className="profileImages">
        <img src={user.coverPicture?serverPublicFolder + user.coverPicture: serverPublicFolder + "defaultCover.jpg"} alt="" />
        <img src={user.profilePicture?serverPublicFolder + user.profilePicture: serverPublicFolder + "defaultProfile.jpg"} alt="" />
      </div>
      <div className="profileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.about? user.about : "Write about yourself"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          {location=== "profilePage" && (
            <>
            <div className="vl">

            </div>
            <div className="follow">
              <span>{posts.filter((post)=>post.userId===user._id).length}</span>
              <span>Posts</span>
            </div>
          </>)}
        </div>
        <hr />
      </div>
      {location=== "profilePage" ? '': (<span>
      <Link style= {{textDecoration: "none", color: "inherit" }}to={`/profile/${user._id}`}>
        My Profile
      </Link>
      </span>)}
      
    </div>
  );
};

export default ProfileCard;
