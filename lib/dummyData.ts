import { PostProps } from '@/components/posts/Post';

export interface CommentData {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timeAgo: string;
}

export interface PostData {
  author: {
    name: string;
    avatar: string;
  };
  timeAgo: string;
  content: string;
  imageUrl?: string;
  reactions: {
    like: number;
    love: number;
    haha: number;
    wow: number;
    sad: number;
    angry: number;
  };
  comments: CommentData[];
  shares: number;
}

export const initialPosts: PostData[] = [
  {
    author: { name: 'Tom Russo', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    timeAgo: '5 mins',
    content: 'Not having fun at all 😂',
    imageUrl: 'https://images.pexels.com/photos/127513/pexels-photo-127513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    reactions: { like: 15, love: 5, haha: 2, wow: 1, sad: 0, angry: 0 },
    comments: [
       { author: { name: 'Jenny', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }, content: 'Great post!', timeAgo: '1 min ago' },
       { author: { name: 'Tom Russo', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }, content: 'Thanks!', timeAgo: '30 seconds ago' },
    ],
    shares: 100,
  },
  {
    author: { name: 'Anna Becklund', avatar: 'https://images.pexels.com/photos/1031081/pexels-photo-1031081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    timeAgo: '1 hour ago',
    content: 'Loving this view!',
    imageUrl: 'https://images.pexels.com/photos/2473143/pexels-photo-2473143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    reactions: { like: 50, love: 30, haha: 10, wow: 5, sad: 2, angry: 1 },
    comments: [
      { author: { name: 'Dennis Han', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }, content: 'Where is this?', timeAgo: '50 mins ago' },
    ],
    shares: 20,
  },
   {
    author: { name: 'Dennis Han', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    timeAgo: '3 hours ago',
    content: 'Just a thought...',
    reactions: { like: 10, love: 1, haha: 0, wow: 0, sad: 0, angry: 0 },
    comments: [],
    shares: 5,
  }
];

export const moreDummyPosts: PostData[] = [
    {
      author: { name: 'Cynthia Lopez', avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
      timeAgo: '1 day ago',
      content: 'Throwback time!',
      imageUrl: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      reactions: { like: 120, love: 50, haha: 15, wow: 10, sad: 5, angry: 3 },
      comments: [
         { author: { name: 'Aiden Brown', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }, content: 'Looks great!', timeAgo: '23 hours ago' },
      ],
      shares: 30,
    },
    {
      author: { name: 'Eric Jones', avatar: 'https://images.pexels.com/photos/842871/pexels-photo-842871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
      timeAgo: '2 days ago',
      content: 'Coding session...',
      reactions: { like: 8, love: 2, haha: 1, wow: 0, sad: 0, angry: 0 },
      comments: [],
      shares: 2,
    },
]; 