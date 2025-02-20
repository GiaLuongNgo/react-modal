import React, { useState } from 'react';
import CommentsModal from './components/CommentsModal/CommentsModal';
import './App.scss';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app">
      <button 
        className="app__button"
        onClick={() => setIsModalOpen(true)}
      >
        Open Comments
      </button>
      
      <CommentsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default App; 