// Code to display the reviews in the Home component.

'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewsList from '@/components/ReviewList'; 
import SortDropdown from '@/components/SortDropdown';
import LoadMoreButton from '@/components/LoadMoreButton';
import { Review } from '@/types/types'; // Importing the Review type

const Home: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]); // State variable for reviews
  const [sortBy, setSortBy] = useState<string>('newest'); // State variable for sorting option
  const [limit, setLimit] = useState<number>(8); // State variable for number of reviews to display

  // Function to fetch reviews data
  const fetchReviews = async () => {
    try {
      const response = await axios.get<Review[]>('/reviews.json'); // Fetch reviews from JSON file
      setReviews(response.data); // Update reviews state with fetched data
    } catch (error) {
      console.error('Error fetching reviews:', error); // Log error if fetch fails
    }
  };

  useEffect(() => {
    fetchReviews(); // Fetch reviews when component mounts
  }, []); // Empty dependency array to fetch only once on mount


// Function to load more reviews
const loadMoreReviews = async () => {
  try {
    const offset = reviews.length;
    const response = await axios.get<Review[]>('/reviews.json', {
      params: { offset, limit: 10 }
    });
    // Filter out duplicate reviews before adding new ones
    const newReviews = response.data.filter((newReview) => !reviews.some((review) => review.REVIEW_ID === newReview.REVIEW_ID));
    // Add only the new reviews to the existing ones
    setReviews((prevReviews) => [...prevReviews, ...newReviews]);
    setLimit((prevLimit) => prevLimit + 10);
  } catch (error) {
    console.error('Error fetching more reviews:', error);
  }
};


  // Sort the reviews based on selected option
const sortedReviews = reviews
.slice() // Create a copy of the array to avoid mutating the original array
.sort((a, b) => {
  if (sortBy === 'newest') {
    return new Date(b.SUBMISSION_DATE).getTime() - new Date(a.SUBMISSION_DATE).getTime(); // Sort by date in descending order
  } else if (sortBy === 'highest') {
    return Number(b.RATING) - Number(a.RATING); // Sort by rating in descending order
  } else if (sortBy === 'lowest') {
    return Number(a.RATING) - Number(b.RATING); // Sort by rating in ascending order
  }
   // Default return statement in case of unexpected sortBy value
   return 0;
})
.slice(0, limit); // Apply the limit after sorting
;

// Function to handle sorting change event
const handleSortChange = (value: string) => {
  setSortBy(value); // Update the sortBy state with the selected value
};

   // Render the component
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-3xl text-black font-semibold mb-4">Product Reviews</h1>
      {/* Dropdown to select sorting option */}
      <SortDropdown onChange={handleSortChange} />
      {/* Component to display the sorted reviews */}
      <ReviewsList reviews={sortedReviews} />
      {/* Button to load more reviews if there are more reviews to load */}
      {reviews.length > limit && <LoadMoreButton onClick={loadMoreReviews} />}
    </div>
  );
};

export default Home;
