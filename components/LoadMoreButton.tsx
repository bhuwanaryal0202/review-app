import React from 'react';

type LoadMoreButtonProps = {
  onClick: () => void; // Define a prop onClick of type () => void
};

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick }) => {
  return <button onClick={onClick} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md">Load More</button>;
}; // Define a functional component LoadMoreButton that takes a prop onClick of type () => void and renders a button element with the text "Load More" and an onClick event handler that calls the onClick function

export default LoadMoreButton;