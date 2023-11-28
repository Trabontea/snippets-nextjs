'use client';
import type {Snippet} from '@prisma/client';
import Editor from '@monaco-editor/react'
import {useState} from 'react'
import { editSnippet } from '@/actions';  

interface SnippetEditFormProps {
  snippet: Snippet
} 

export default function SnippetEditForm({snippet} : SnippetEditFormProps ) {
  const [code, setCode] = useState(snippet.code)

  const handleEditorChange = (value: string = "") => {
    setCode(value)
    // console.log(value)
  }

  const editSnippetAction = editSnippet.bind(null, snippet.id, code);

  return (
    <div>
     <h1>Edit {snippet.title}</h1> 

      <Editor  
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{minimap:{enabled: false}}}
        onChange={handleEditorChange}
      />

    <form action={editSnippetAction}>
      <button type="submit" className='mt-5 p-3 border rounded'>Save</button>
    </form>
    </div>
    
  )

}