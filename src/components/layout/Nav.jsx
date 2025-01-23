import React from 'react';
import { supabase } from '../../supabaseClient';

export default function Nav() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">ProgressPath</h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}