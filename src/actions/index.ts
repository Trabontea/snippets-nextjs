'use server';
import { db } from '@/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

//functia asta importata si apelata
//in componenta client SnippetEditForm.tsx

export async function editSnippet(id: number, code: string) {
  // se vede in consolea IDE
  // console.log(id, code)

  await db.snippet.update({
    where: { id },
    data: { code },
  });

  revalidatePath(`/snippets/${id}`)
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });

  revalidatePath('/')
  redirect('/');
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  // This needs to be a server action!
  // 'use server';

  try {
    // Check the user's inputs and make sure they'are valid
    const title = formData.get('title');
    const code = formData.get('code');

    if (typeof title !== 'string' || title.length < 3) {
      return {
        message: 'Title must be longer',
      };
    }

    if (typeof code !== 'string' || code.length < 10) {
      return {
        message: 'Code must be longer',
      };
    }

    // Create a new recolrd in the database
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: 'Something went wrong',
      };
    }

    throw new Error("We can't record!");
  }

  // For cashing 
  revalidatePath('/')
  // Redirect the user back to the root route
  redirect('/');
}
