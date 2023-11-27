
import {db} from '@/db';
import {notFound} from 'next/navigation'
import Link from 'next/link'

interface SnippetsShowPageProps {
  params: {
    id: string
  }
}
 

export default async function SnippetShowPage(props: SnippetsShowPageProps) {
  // de tinut minte!!!!
  console.log(props.params)

  const snippet =  await db.snippet.findFirst({
    where: {id: parseInt(props.params.id)}
  })

  if(!snippet) {
    return notFound();
  }

  return(
    <div>
      <div className='mt-5 flex x-4 justify-between items-center'>
        <h1 className='text-xl font-bold'>{snippet.title}</h1>
        <div>
          <Link href={`/snippets/${snippet.id}/edit`} className='p-2 border rounded mr-4'>Edit</Link>
          <button className='p-2 border rounded'>Delete</button>
        </div>
      </div> 
      <pre className='p-3 border rounded bg-gray-200 border-gray-200'>
        <code>
          {snippet.code}
        </code>
      </pre>
    </div>
  )
}