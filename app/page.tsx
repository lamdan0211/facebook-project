import NewsFeed from '@/components/feed/NewsFeed';
import { PostProvider } from '@/context/PostContext';

export default function Home() {
  return (
    <PostProvider>
      <NewsFeed />
    </PostProvider>
  );
} 