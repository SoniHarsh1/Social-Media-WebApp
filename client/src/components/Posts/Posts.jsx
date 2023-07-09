import React from 'react'
import { PostsData } from '../../Data/PostsData'
import './Posts.css'
import Post from '../Post/Post'

const Posts = () => {
  return (
    <div className='Posts'>
      {PostsData.map((post, id) => {
        return <Post id = {id} data={post} />
        })}
    </div>
  )
}

export default Posts
