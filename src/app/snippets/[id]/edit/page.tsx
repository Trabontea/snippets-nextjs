 import {db} from '@/db';
 import { notFound } from 'next/navigation'
 import SnippetEditForm from '@/components/SnippetEditForm'


interface SnippetEditPageProps {
  params: {
    id: string
  }
}

export default async function SnippetEditpage(props: SnippetEditPageProps) {
  // id lua din params url
  const id = parseInt(props.params.id)

  const snippet = await db.snippet.findFirst({
    where: {id}
  })

  if(!snippet) {
    return notFound();
  }

  return (
    <div className="mt-5">
      <h1 className="text-lg">Editing snippet:</h1> 
      <SnippetEditForm snippet={snippet}/>
    </div>
  )

}