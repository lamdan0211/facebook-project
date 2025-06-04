import React, { useState } from 'react';
import Image from 'next/image';

interface TagPeopleModalProps {
  onClose: () => void; // To close the tag people modal (go back to main post modal)
  onDone: (taggedPeople: any[]) => void; // To confirm tagging and pass data back
}

// Placeholder dummy data for suggestions
const dummySuggestions = [
    { id: 1, name: 'Hồng Anh', avatar: 'https://images.pexels.com/photos/9072375/pexels-photo-9072375.jpeg' },
    { id: 2, name: 'Thu Luong', avatar: 'https://images.pexels.com/photos/4056509/pexels-photo-4056509.jpeg' },
    { id: 3, name: 'Xuan Trang', avatar: null }, // Example with no avatar
    { id: 4, name: 'Chung Nguyen', avatar: 'https://images.pexels.com/photos/9072375/pexels-photo-9075959.jpeg' }, // Updated dummy avatar
    { id: 5, name: 'Thiên Vũ', avatar: 'https://images.pexels.com/photos/4056509/pexels-photo-4056509.jpeg' },
    { id: 6, name: 'Avril Quach', avatar: 'https://images.pexels.com/photos/9072375/pexels-photo-9072375.jpeg' },
];

const TagPeopleModal: React.FC<TagPeopleModalProps> = ({ onClose, onDone }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeople, setSelectedPeople] = useState<any[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePersonClick = (person: any) => {
      if (selectedPeople.some(p => p.id === person.id)) {
          setSelectedPeople(selectedPeople.filter(p => p.id !== person.id));
      } else {
          setSelectedPeople([...selectedPeople, person]);
      }
  };

  const handleDoneClick = () => {
    onDone(selectedPeople);
  };

  const filteredSuggestions = dummySuggestions.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // Changed positioning and background to match CreatePostModal's container
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"> {/* This is the overlay */}
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto flex flex-col relative"> {/* This is the modal content, added flex-col */}
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between flex-shrink-0"> {/* Added flex-shrink-0 */}
                <button className="p-2 rounded-full hover:bg-gray-200" onClick={onClose}>
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h14"></path></svg>
                </button>
                <h2 className="text-xl font-bold flex-grow text-center">Tag people</h2>
                <button className="text-blue-500 font-semibold px-4 py-2" onClick={handleDoneClick}>Done</button>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b flex-shrink-0"> {/* Added flex-shrink-0 */}
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
                <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <input
                    type="text"
                    placeholder="Search"
                    className="flex-grow bg-transparent outline-none text-gray-700"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                </div>
            </div>

            {/* Suggestions List */}
            <div className="flex-1 overflow-y-auto p-4"> {/* flex-1 makes it take available space and overflow allows scrolling */}
                <p className="text-gray-500 text-sm font-semibold mb-2">SUGGESTIONS</p>
                {filteredSuggestions.map(person => (
                <div key={person.id} className="flex items-center py-2 cursor-pointer hover:bg-gray-100 rounded-md px-2" onClick={() => handlePersonClick(person)}>
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-3 bg-gray-300 flex items-center justify-center">
                        {person.avatar ? (
                            <Image
                                src={person.avatar}
                                alt={person.name}
                                width={32}
                                height={32}
                                className="object-cover"
                            />
                        ) : (
                            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                        )}
                    </div>
                    <p className="flex-grow text-gray-800">{person.name}</p>
                    {/* Checkmark or visual indicator for selected people */}
                    {selectedPeople.some(p => p.id === person.id) && (
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    )}
                </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default TagPeopleModal; 