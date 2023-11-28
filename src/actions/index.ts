'use server';
import {db} from '@/db';
import {redirect} from 'next/navigation'


//functia asta importata si apelata 
//in componenta client SnippetEditForm.tsx

export async function editSnippet(id:number, code: string) {
  // se vede in consolea IDE
  // console.log(id, code) 

  await db.snippet.update({
    where: {id},
    data: {code}
  });

  redirect(`/snippets/${id}`)
}

export async function deleteSnippet(id:number) {
  await db.snippet.delete({
    where: {id}
  })

  redirect('/')
}


export async function createSnippet(formState: {message: string},  formData: FormData) {
  // This needs to be a server action!
  // 'use server';


  // Check the user's inputs and make sure they'are valid 
  const title  =  formData.get('title')
  const code  =  formData.get('code') 

  if (typeof title !== 'string' || title.length < 3) {
    return {
      message: 'Title must be longer'
    }
  } 
  
  if(typeof code !== 'string' || code.length < 10 ) {
    return {
      message: 'Code must be longer'
    }
  }

  // Create a new recolrd in the database

  const snippet = await db.snippet.create({
    data: {
      title,
      code
    }
  });
  console.log('Snippet', snippet)

  // Redirect the user back to the root route
  redirect('/');
};