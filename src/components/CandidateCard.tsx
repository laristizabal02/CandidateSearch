import React from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
import './CandidateCard.css';

interface CandidateCardProps {
    candidate: Candidate;
  }
  
  const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
    return (
      <div className="candidate-card">
        <img src={candidate.image} alt={candidate.name} />
        <h2>{candidate.name}</h2>
        <p>Location: {candidate.location || 'Unknown'}</p>
        <p>Email: {candidate.email || 'Unknown'}</p>
        <p>Company: {candidate.company || 'Unknown'}</p>
        <p>Bio: {candidate.bio || 'Unknown'}</p>
      </div>
    );
  };
  
  export default CandidateCard;