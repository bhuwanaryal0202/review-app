import React from 'react';

type SortDropdownProps = {
  onChange: (value: string) => void; // Define a prop onChange of type (value: string) => void
};
 
//  Create the component class
const SortDropdown: React.FC<SortDropdownProps> = ({ onChange }) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };  // Define a function handleSortChange that takes an event e of type React.ChangeEvent<HTMLSelectElement> and calls the onChange function with the value of the select element
  

  return (
    <select onChange={handleSortChange} className="py-2 px-4 text-black border rounded-md">
      <option value="newest">Newest</option>
      <option value="highest">Highest Rating</option>
      <option value="lowest">Lowest Rating</option>
    </select>
  );
};

export default SortDropdown;
