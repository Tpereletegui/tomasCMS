import React from 'react'
import { getPosts, getPostDetails } from '../../services'

import {
  PostDetail,
  Categories,
  PostWidgets,
  Author,
  Comments,
  CommentsForm,
  Loader
} from '../../components'
import { useRouter } from 'next/router'

interface Props {
  post : any
}

const PostDetails = ({post}: Props) => {
  const router = useRouter();

  if(router.isFallback) {
    return <Loader />
  }
  console.log('post', post)
  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="lg: grid grid-cols-1 grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail  post={post}/>
          <Author  author ={post.author}/>
          <CommentsForm slug ={post.slug} />
          <Comments  slug ={post.slug}/>
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidgets slug={post.slug} categories={post.categories.map(category => category.slug)} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetails



export async function getStaticProps ({params} :any) {
 const data = await getPostDetails(params.slug)
  return {
    props : {post : data }
  }
}


export async function getStaticPaths() {
  const posts = await getPosts();

  return { 
    paths: posts.map(({node : {slug}} :any)   => ({params : {slug}})),
    fallback: true
  }
}