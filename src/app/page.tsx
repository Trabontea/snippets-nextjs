import {db} from '@/db';
import Link from 'next/link';

//server page

export default async function Home() {

  // aduce toate inregistrarile din baza de date
  const snippets = await db.snippet.findMany();

  const renderedSnippets =  snippets.map((snippet) => {
    return(
      <Link key={snippet.id} href={`/snippets/${snippet.id}`} className='flex items-center justify-between p-2 border rounded'>
        <div> {snippet.title}</div>
        <div>View</div>
      </Link>
    )
  })

  return (
    <div className="min-h-screen p-24">
      <h1 className='text-md'>Home Page</h1>
      <div className=' mt-5 flex item-center justify-between'>
        <h2 className='text-xl font-bold'>Snippets</h2>
        <Link href="/snippets/new" className='border p-2 roundeds'> Add Snippet</Link>
      </div>
  
      <div className='mt-10 flex flex-col gap-2'>
        {renderedSnippets}
      </div>
      
    </div>
  )
} 
