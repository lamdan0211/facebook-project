interface Person {
  id: string;
  name: string;
  avatar: string;
}

/**
 * Fetches user information for tagged people from friend IDs
 * @param friends Array of friend IDs from backend
 * @param accessToken Authentication token
 * @returns Array of Person objects with user information
 */
export const fetchTaggedPeople = async (friends: number[], accessToken: string): Promise<Person[]> => {
  if (!friends || !Array.isArray(friends) || friends.length === 0) {
    return [];
  }

  try {
    const friendPromises = friends.map(async (friendId: number) => {
      try {
        const friendRes = await fetch(`http://localhost:3301/backend/user/${friendId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        if (friendRes.ok) {
          const friendData = await friendRes.json();
          return {
            id: friendData.id.toString(),
            name: friendData.fullname || friendData.email || 'User',
            avatar: friendData.profilepic || '/avatars/default-avatar.png',
          };
        }
        return null;
      } catch (error) {
        console.error('Error fetching friend info:', error);
        return null;
      }
    });
    
    const friendResults = await Promise.all(friendPromises);
    return friendResults.filter(friend => friend !== null);
  } catch (error) {
    console.error('Error processing tagged people:', error);
    return [];
  }
};

/**
 * Converts Person array to friend IDs for backend
 * @param taggedPeople Array of Person objects
 * @returns Array of friend IDs
 */
export const convertToFriendIds = (taggedPeople: Person[]): number[] => {
  return taggedPeople.map(p => Number(p.id)).filter(id => !isNaN(id));
}; 