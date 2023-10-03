import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import {useDispatch} from 'react-redux'
import { followUser, unfollowUser } from '../../actions/userAction'
import '../FollowersCard/FollowersCard.css'

const User = ({person}) => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.authReducer.authData);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    const [following , setFollowing] = useState(person.followers.includes(user._id));

    const handleFollow = () => {
        following
        ? dispatch(unfollowUser(person._id, user))
        : dispatch(followUser(person._id, user))
        setFollowing((prev)=> !prev)
        }



  return (
    
      <div className="follower">
            <div>
              <img src={person.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.jpg"} className="followerImg" alt="" />
              <div className="name">
                <span>{person.firstname} {person.lastname}</span>
                <span>{person.username}</span>
              </div>
            </div>
            <button className={following ? "button fc-button unFollowBtn" : "button fc-button"}
            onClick={handleFollow}>
              {following ? "Unfollow" : "Follow"}
            </button>
          </div>
  );
};

export default User
