import React from 'react';
import './CandidateActions.css';


    interface CandidateActionsProps {
        onSave: () => void;
        onDismiss: () => void;
      }
      
      const CandidateActions: React.FC<CandidateActionsProps> = ({ onSave, onDismiss }) => {
        return (
          <div className="candidate-actions">
            <button onClick={onSave}>+</button>
            <button onClick={onDismiss}>-</button>
          </div>
        );
      };
      
      export default CandidateActions;