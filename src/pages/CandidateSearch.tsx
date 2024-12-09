import React, { useState, useEffect } from 'react';
import CandidateCard from '../components/CandidateCard';
import CandidateActions from '../components/CandidateActions';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorDisplay from '../components/ErrorDisplay';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import './CandidateSearchPage.css';

const CandidateSearchPage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch candidates on mount
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const data = await searchGithub();
        setCandidates(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch candidates.');
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // Handlers
  const handleSave = () => {
    const candidate = candidates[currentIndex];
    if (!candidate) return;

    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]') as Candidate[];
    if (!savedCandidates.find((c) => c.id === candidate.id)) {
      savedCandidates.push(candidate);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
      alert(`${candidate.name} has been saved.`);
    } else {
      alert(`${candidate.name} is already saved.`);
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleDismiss = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // Rendering Logic
  const currentCandidate = candidates[currentIndex];

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorDisplay message={error} />;
  if (!currentCandidate) return <div>No more candidates to display.</div>;

  return (
    
    <div className="candidate-search-page">
      <h1>CandidateSearch</h1>;
      <CandidateCard candidate={currentCandidate} />
      <CandidateActions onSave={handleSave} onDismiss={handleDismiss} />
    </div>
  );
};

export default CandidateSearchPage;