import React from 'react';

const SessionItem = ({ 
  sessionNum,
  isCompleted,
  currentSession,
  loading,
  completeSession
}) => (
  <div className="relative mb-8 pl-12">
    <div className={`absolute w-8 h-8 rounded-full flex items-center justify-center 
      ${isCompleted ? 'bg-green-500' : 'bg-gray-200'} 
      ${sessionNum <= currentSession ? 'border-4 border-white ring-2 ring-blue-500' : ''}`}
      style={{ left: '-4px', top: '4px' }}>
      {isCompleted ? '✓' : sessionNum}
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Session {sessionNum} Objectives
      </h3>
      <button 
        onClick={() => completeSession(sessionNum)}
        disabled={loading || sessionNum > currentSession}
        className={`px-4 py-2 rounded-md ${isCompleted ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} 
          text-white transition-colors cursor-pointer disabled:cursor-not-allowed`}
      >
        {isCompleted ? 'Completed' : loading ? 'Saving...' : 'Mark Complete'}
      </button>
    </div>
  </div>
);

export default SessionItem;