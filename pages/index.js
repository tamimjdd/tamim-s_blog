import { FeaturedPosts } from '../sections';
import { PostCard, Categories, PostWidget } from '../components';
import { getPosts } from '../services';
import DocumentMeta from "react-document-meta";
import React, { useState, useEffect } from "react"

const meta = {
  title: "Tamim's Blog",
  description: "tamimwasif.com, tamims blog, coder tamim, tamim wasif, tamimjd, tamimjdd",
  meta: {
    charset: "utf-8",
    name: {
      keywords: "tamimwasif.com, tamims blog, coder tamim, tamim wasif, tamimjd, tamimjdd"
    }
  }
};


export default function Home({ posts }) {

  const allNews = posts
  
  const [list, setList] = useState([...allNews.slice(0, 10)])
  
  const [loadMore, setLoadMore] = useState(false)

  const [hasMore, setHasMore] = useState(allNews.length > 10)

  const handleLoadMore = () => {
    setLoadMore(true)
  }

  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length
      const isMore = currentLength < allNews.length
      const nextResults = isMore
        ? allNews.slice(currentLength, currentLength + 10)
        : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore]) 

  useEffect(() => {
    const isMore = list.length < allNews.length
    setHasMore(isMore)
  }, [list])


  return (
    <div className="container mx-auto px-10 mb-8">
      <DocumentMeta {...meta} />
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1 text-center">
          {list.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}

          {hasMore ? (
            <button className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer" onClick={handleLoadMore}>Load More</button>
          ) : (
            <p className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">No more results</p>
          )}
        </div>
        
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

// Fetch data at build time
export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
}

