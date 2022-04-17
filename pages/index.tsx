import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Posts } from '../utils/interfaces'
import { PostCard, Categories, PostWidgets } from '../components/index';
import { getPosts } from '../services';
import  {FeaturedPosts} from '../sections'


interface Props {
  posts : any[]
}


const Home = ({posts}: Props) => {
  console.log('posts', posts)
  return (
    <div className="container mx-auto mb-8 px-10 ">
      <Head>
        <title>CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard post={post.node} key={post.title} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidgets/>
            <Categories/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home


export async function getStaticProps () {
  const posts = (await getPosts()) || []
  return {
    props : {posts }
  }
}