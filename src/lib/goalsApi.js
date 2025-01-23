import { supabase } from '../supabaseClient';

export const fetchGoals = async (sessionNumber) => {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .eq('user_id', user.id)
    .eq('session_number', sessionNumber);

  if (error) throw error;
  return data || [];
};

export const addGoal = async (sessionNumber, description) => {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('goals')
    .insert([{
      user_id: user.id,
      session_number: sessionNumber,
      description,
      completed: false
    }])
    .select();

  if (error) throw error;
  return data;
};

export const updateGoal = async (goalId, completed) => {
  const { error } = await supabase
    .from('goals')
    .update({ completed })
    .eq('id', goalId);

  if (error) throw error;
};