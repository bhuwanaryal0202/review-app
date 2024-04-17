import React from 'react';
import { Review } from '@/types/types'; // Import the Review type from '@/types

type ReviewsListProps = {
  reviews: Review[]; // Define a prop reviews of type Review[] 
};

//  Create the function component ReviewsList with one parameter reviews of type Review[]
const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  return (

    <div className="divide-y divide-gray-200">
      {/* Map through the array of reviews and render each review */}
      {reviews.map((review) => (
        <div key={review.REVIEW_ID} className="py-4">
          <p className="text-sm text-gray-800">{review.CUSTOMER_NAME}</p>
          <h3 className="text-lg text-gray-800 font-semibold">{review.REVIEW_TITLE}</h3>
          <p className="mt-2 text-gray-600">{review.REVIEW_TEXT}</p>
          <p className="mt-2 text-yellow-500">Rating: {review.RATING} out of 5</p>
          <p className="mt-2 text-blue-600">
            {review.RECOMMENDATION === "TRUE" ? "Yes, I recommend this product" : "No, I don't recommend this product"}
          </p> {/* Conditional rendering based on the value of the RECOMMENDATION field */}
          <p className="text-sm text-gray-500">Confirmed purchase: {review.ORDER_DATE}</p>
          <p className="text-sm text-gray-500">Published on: {review.SUBMISSION_DATE}</p>
          
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
