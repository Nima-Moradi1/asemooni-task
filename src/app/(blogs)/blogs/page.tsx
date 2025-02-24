import Blogs from "@/components/Blogs";
import { getBlogsApi } from "@/services/blogsServices";

//since asemooni asked me to fetch blogs SSR, we will async fetch blogs here and pass it as props
export default async function BlogsPage({searchParams}:{searchParams : Promise<{ [key: string]: string | string[] | undefined }>}) {
  
  const search = await searchParams
  const page = search?.page ? parseInt(search.page as string, 10) : undefined;
  const limit = search?.limit ? parseInt(search.limit as string, 10) : undefined;

  const {data} = await getBlogsApi(page, limit)
  return (
   <div>
    <h1 className="h1">بلاگ ها</h1>
    <Blogs data={data}/>
   </div>
  );
}
