import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function useAuthAndSessions() {
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchSessions(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchSessions = async (userId) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('user_id', userId)
        .order('session_number', { ascending: true });

      if (error) throw error;
      setSessions(data || []);
      setCurrentSession(data?.length ? Math.min(6, data[data.length - 1].session_number + 1) : 1);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      Sentry.captureException(error);
    } finally {
      setLoading(false);
    }
  };

  return { user, sessions, loading, currentSession, fetchSessions };
}