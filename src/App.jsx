import React from 'react';
import useAuthAndSessions from './hooks/useAuthAndSessions';
import SessionTimeline from './components/SessionTimeline';
import GoalTracker from './components/GoalTracker';
import Auth from './components/Auth';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';

export default function App() {
  const { user, sessions, loading, currentSession } = useAuthAndSessions();

  if (!user) return <Auth />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center text-gray-500">Loading your progress...</div>
        ) : (
          <>
            <SessionTimeline sessions={sessions} />
            <GoalTracker sessionNumber={currentSession} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}