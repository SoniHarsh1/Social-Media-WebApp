import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import './Posts.css'
import { getTimelinePosts } from '../../actions/postAction'
import Post from '../Post/Post'

const Posts = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const {user} = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
  },[])


  if(posts.length === 0){
    posts = [{name: "No posts yet", desc: "Create a post to see it here"}]
  }

  if(params.id) posts = posts.filter((post)=>post.userId === params.id);
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
