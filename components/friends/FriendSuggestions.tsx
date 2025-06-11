import Image from 'next/image';

// Mock data for demonstration
const mockSuggestions = [
  {
    id: 1,
    name: 'Sarah Parker',
    avatar: '/avatars/default-avatar.png',
    mutualFriends: 7,
  },
  {
    id: 2,
    name: 'Tom Anderson',
    avatar: '/avatars/default-avatar.png',
    mutualFriends: 4,
  },
  {
    id: 3,
    name: 'Emma Davis',
    avatar: '/avatars/default-avatar.png',
    mutualFriends: 9,
  },
];

export default function FriendSuggestions() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">People You May Know</h2>
        <a href="#" className="text-blue-500 text-sm font-medium hover:underline">See All</a>
      </div>
      <div className="space-y-4">
        {mockSuggestions.map((suggestion) => (
          <div key={suggestion.id} className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image
                src={suggestion.avatar}
                alt={suggestion.name}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm hover:underline cursor-pointer">{suggestion.name}</h3>
              <p className="text-gray-500 text-xs">{suggestion.mutualFriends} mutual friends</p>
              <div className="flex gap-2 mt-2">
                <button className="flex-1 bg-blue-500 text-white py-1 rounded-md text-xs font-medium hover:bg-blue-600">
                  Add Friend
                </button>
                <button className="flex-1 bg-gray-200 py-1 rounded-md text-xs font-medium hover:bg-gray-300">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 