import React from 'react';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import PostForm from '@/components/shared/PostForm';
import { useState } from 'react';

const CreatePrompt = async () => {
  const { userId } = auth();
  if (!userId) redirect('/sign-in');

  const user = await getUserById(userId);
  return (
    <div>
      Hello
    </div>
  )
}

export default CreatePrompt
