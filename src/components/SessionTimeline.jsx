import React from 'react';
import { supabase } from '../supabaseClient';
import SessionItem from './SessionTimeline/SessionItem';

const SessionTimeline = ({ sessions }) => {
  const [currentSession, setCurrentSession] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const completeSession = async (sessionNumber) => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('sessions')
        .upsert({ 
          user_id: user.id,
          session_number: sessionNumber,
          completed_at: new Date().toISOString()
        });

      if (error) throw error;
      setCurrentSession(Math.min(6, sessionNumber + 1));
    } catch (error) {
      console.error('Session completion error:', error);
      Sentry.captureException(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Coaching Journey</h2>
      <div className="relative">
        <div className="absolute left-4 h-full w-1 bg-gray-200 transform -translate-x-1/2" />
        {[...Array(6)].map((_, idx) => {
          const sessionNum = idx + 1;
          const isCompleted = sessions.some(s => s.session_number === sessionNum);
          
          return (
            <SessionItem
              key={sessionNum}
              sessionNum={sessionNum}
              isCompleted={isCompleted}
              currentSession={currentSession}
              loading={loading}
              completeSession={completeSession}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SessionTimeline;