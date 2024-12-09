import React from 'react';
import './ErrorDisplay.css';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return <div className="error-display">{message}</div>;
};

export default ErrorDisplay;