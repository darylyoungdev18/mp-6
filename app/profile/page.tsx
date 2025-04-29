'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

export default function ProfilePage() {
  const params = useSearchParams();

  const name = params.get('name') ?? 'Unknown';
  const email = params.get('email') ?? 'Unknown';
  const picture = params.get('picture') ?? '';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl mb-4">Profile</h1>
      {picture && (
        <img
          src={picture}
          alt="Profile"
          className="rounded-full w-24 h-24 mb-4"
        />
      )}
      <p className="text-lg">Name: {name}</p>
      <p className="text-lg">Email: {email}</p>
      <a href="/login" className="mt-6 text-blue-500 underline">
        Sign out
      </a>
    </div>
  );
}
