import Image from 'next/image';

// Mock data for demonstration
const mockRequests = [
  {
    id: 1,
    name: 'Alice Brown',
    avatar: '/avatars/default-avatar.png',
    mutualFriends: 5,
  },
  {
    id: 2,
    name: 'Bob Wilson',
    avatar: '/avatars/default-avatar.png',
    mutualFriends: 3,
  },
];

export default function FriendRequests() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Friend Requests</h2>
        <a href="#" className="text-blue-500 text-sm font-medium hover:underline">See All</a>
      </div>
      <div className="space-y-4">
        {mockRequests.map((request) => (
          <div key={request.id} className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image
                src={request.avatar}
                alt={request.name}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm hover:underline cursor-pointer">{request.name}</h3>
              <p className="text-gray-500 text-xs">{request.mutualFriends} mutual friends</p>
              <div className="flex gap-2 mt-2">
                <button className="flex-1 bg-blue-500 text-white py-1 rounded-md text-xs font-medium hover:bg-blue-600">
                  Confirm
                </button>
                <button className="flex-1 bg-gray-200 py-1 rounded-md text-xs font-medium hover:bg-gray-300">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 