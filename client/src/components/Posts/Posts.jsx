import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Posts.css'
import { getTimelinePosts } from '../../actions/postAction'
import Post from '../Post/Post'

const Posts = () => {

  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.authReducer.authData);
  const { posts, loading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
  },[])
  return (
    <div className='Posts'>
      {loading? "Loading..." :
        posts.map((post, id) => {
        return <Post id = {id} data={post} />
        })}
    </div>
  )
}

export default Posts
