import { useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
import './SavedCandidatesPage.css';

const SavedCandidates = () => {
  // Retrieve saved candidates from localStorage
  const getSavedCandidates = (): Candidate[] => {
    const saved = localStorage.getItem('savedCandidates');
    return saved ? JSON.parse(saved) : [];
  };

  // State for saved candidates
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(getSavedCandidates());

  // Handler to remove a candidate
  const handleReject = (candidateId: number) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.id !== candidateId);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    alert('Candidate removed successfully!');
  };

  return (
    <div className="saved-candidates-page">
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No saved candidates to display.</p>
      ) : (
        <table className="candidates-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>
                  <img src={candidate.image} alt={candidate.name} className="candidate-image" />
                </td>
                <td>{candidate.name}</td>
                <td>{candidate.location || 'N/A'}</td>
                <td>{candidate.email || 'N/A'}</td>
                <td>{candidate.company || 'N/A'}</td>
                <td>{candidate.bio || 'N/A'}</td>
                <td>
                  <button
                    onClick={() => handleReject(candidate.id)}
                    className="reject-button"
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;
