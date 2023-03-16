import { useRouter } from 'next/router';
import React from 'react';
import Homepage from '../components/Homepage';

export default function unauthorized() {
  const router = useRouter();
  const { message } = router.query;

  return (
    <Homepage title="Unauthorized Page">
      <h1 className="text-xl">Access Denied</h1>
      {message && <div className="mb-4 text-red-500">{message}</div>}
    </Homepage>
  );
} 