import React from 'react'

import LogoSearch from '../LogoSearch/LogoSearch.jsx'
import ProfileCard from '../ProfileCard/profileCard.jsx'
import FollowersCard from '../FollowersCard/FollowersCard.jsx'



import './ProfileSide.css'

const ProfileSide = () => {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <ProfileCard location="homePage" />
      <FollowersCard />
    </div>
  )
}

export default ProfileSide
