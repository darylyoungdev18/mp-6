'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ProfileContent() {
  const params = useSearchParams();

  const name = decodeURIComponent(params.get('name') || '');
  const email = decodeURIComponent(params.get('email') || '');
  const picture = decodeURIComponent(params.get('picture') || 'no picture');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl mb-4">Welcome</h1>
      {picture && (
        <img
          src={picture}
          alt="Profile"
          className="rounded-full w-24 h-24 mb-4"
        />
      )}
      <p className="text-lg">Name: {name}</p>
      <p className="text-lg">Email: {email}</p>
      <a href="/login" className="mt-6 text-blue-500 underline">Sign out</a>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <ProfileContent />
    </Suspense>
  );
}
