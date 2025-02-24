import Link from 'next/link';
import React from 'react'
import { Pagination } from './ui/Pagination';

interface PostProps {
    id: number;
    title: string;
    body: string;
    tags : string[] ;
    views : number ,
    reactions : {
        likes : number ,
        dislikes : number
    }
}
interface DataProps {
    posts : PostProps[],
    limit : number,
    page : number, 
    total : number
}
const Blogs = ({data}:{data:DataProps}) => {

    const {posts} = data || {}
    const limit = data?.limit
    const page = data?.page
    const totalPosts = data?.total
    const totalPages = Math.ceil(totalPosts / limit)

    return (
        <div className='flex flex-col items-center mb-5'>
            <div dir='ltr'
         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-3 mb-5">
          {posts.map((post:PostProps) => (
            <div
              key={post.id}
              className=" p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-secondary"
            >
              {/* Title */}
              <Link href={`/${post.id}`}>
              <h2 className="text-lg font-bold mb-2 md:h-16">{post.title}</h2>
              </Link>
    
              {/* Tags */}
              <div className="flex gap-2 mb-3">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
    
              {/* Body Preview */}
              <p className="text-secondary-foreground/80 text-sm line-clamp-3">{post.body}</p>
    
              {/* Stats */}
              <div className="flex justify-between items-center mt-4 text-secondary-foreground/75 text-xs">
                <div className="flex items-center gap-1">
                  <span>👀</span>
                   <span className='font-bold'>{post.views}</span>
                </div>
                <div className="flex items-center gap-2 text-secondary-foreground">
                  👍 {post.reactions.likes} | 👎 {post.reactions.dislikes}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination limit={limit} page={page} totalPages={totalPages}/>
        </div>
        
      );
}

export default Blogs