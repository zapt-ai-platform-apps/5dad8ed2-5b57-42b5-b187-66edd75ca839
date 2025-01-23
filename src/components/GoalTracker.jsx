import React from 'react';
import { fetchGoals, addGoal, updateGoal } from '../lib/goalsApi';

const GoalTracker = ({ sessionNumber }) => {
  const [goals, setGoals] = React.useState([]);
  const [newGoal, setNewGoal] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadGoals = async () => {
      try {
        const data = await fetchGoals(sessionNumber);
        setGoals(data);
      } catch (error) {
        console.error('Error fetching goals:', error);
        Sentry.captureException(error);
      } finally {
        setLoading(false);
      }
    };

    loadGoals();
  }, [sessionNumber]);

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!newGoal.trim()) return;

    try {
      const data = await addGoal(sessionNumber, newGoal);
      setGoals([...goals, ...data]);
      setNewGoal('');
    } catch (error) {
      console.error('Error adding goal:', error);
      Sentry.captureException(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Session {sessionNumber} Goals</h3>
      
      <form onSubmit={handleAddGoal} className="mb-4">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Add new goal..."
          className="w-full p-2 border rounded-md box-border mb-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 disabled:bg-gray-300"
        >
          Add Goal
        </button>
      </form>

      {loading ? (
        <div className="text-gray-500">Loading goals...</div>
      ) : (
        <ul className="space-y-3">
          {goals.map(goal => (
            <li key={goal.id} className="flex items-center">
              <input
                type="checkbox"
                checked={goal.completed}
                onChange={async () => {
                  try {
                    await updateGoal(goal.id, !goal.completed);
                    setGoals(goals.map(g => 
                      g.id === goal.id ? { ...g, completed: !g.completed } : g
                    ));
                  } catch (error) {
                    console.error('Error updating goal:', error);
                    Sentry.captureException(error);
                  }
                }}
                className="mr-3 h-4 w-4 cursor-pointer"
              />
              <span className={`${goal.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                {goal.description}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GoalTracker;