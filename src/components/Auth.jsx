import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../supabaseClient';

const AuthComponent = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In to ProgressPath</h2>
      <p className="text-center mb-4 text-gray-600">
        Sign in with ZAPT to continue
      </p>
      <div className="mb-4 text-center">
        <a 
          href="https://www.zapt.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Learn more about ZAPT
        </a>
      </div>
      <Auth
        supabaseClient={supabase}
        providers={['google', 'facebook', 'apple']}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#3b82f6',
                brandAccent: '#2563eb',
              },
            },
          },
        }}
      />
    </div>
  </div>
);

export default AuthComponent;