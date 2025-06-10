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
  taggedPeople?: { name: string; avatar: string }[];
}

export const initialPosts: PostData[] = [
  {
    author: { name: ' Russo', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    timeAgo: '5 mins',
    content: 'Not having fun at all 😂',
    imageUrl: 'https://images.pexels.com/photos/127513/pexels-photo-127513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    reactions: { like: 15, love: 5, haha: 2, wow: 1, sad: 0, angry: 0 },
    comments: [
       { author: { name: 'Jenny', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }, content: 'Great post!', timeAgo: '1 min ago' },
       { author: { name: 'Tom Russo', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }, content: 'Thanks!', timeAgo: '30 seconds ago' },
    ],
    shares: 100,
    taggedPeople: [
      { name: 'Thành Minh', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
      { name: 'Quý Phú', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' },
      { name: 'Lan Anh', avatar: 'https://randomuser.me/api/portraits/women/13.jpg' },
    ],
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
    taggedPeople: [
      { name: 'Nguyễn Nguyên', avatar: 'https://randomuser.me/api/portraits/men/14.jpg' },
    ],
  },
   {
    author: { name: 'Dennis Han', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    timeAgo: '3 hours ago',
    content: 'Just a thought...',
    reactions: { like: 10, love: 1, haha: 0, wow: 0, sad: 0, angry: 0 },
    comments: [],
    shares: 5,
  },
  {
    author: { name: 'Lam Dan', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    timeAgo: '4 hours ago',
    content: 'Check out this awesome sunset!',
    imageUrl: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg',
    reactions: { like: 22, love: 8, haha: 1, wow: 3, sad: 0, angry: 0 },
    comments: [],
    shares: 7,
  },
  {
    author: { name: 'Jenny Smith', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    timeAgo: '5 hours ago',
    content: 'Coffee time ☕',
    imageUrl: 'https://images.pexels.com/photos/302902/pexels-photo-302902.jpeg',
    reactions: { like: 12, love: 2, haha: 0, wow: 0, sad: 0, angry: 0 },
    comments: [],
    shares: 1,
  },
  {
    author: { name: 'Tom Russo', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
    timeAgo: '6 hours ago',
    content: 'Just finished a 10k run!',
    imageUrl: 'https://images.pexels.com/photos/1199590/pexels-photo-1199590.jpeg',
    reactions: { like: 30, love: 5, haha: 2, wow: 1, sad: 0, angry: 0 },
    comments: [],
    shares: 3,
  },
  {
    author: { name: 'Anna Becklund', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
    timeAgo: '7 hours ago',
    content: 'Reading a new book today.',
    imageUrl: 'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg',
    reactions: { like: 18, love: 4, haha: 0, wow: 0, sad: 0, angry: 0 },
    comments: [],
    shares: 2,
  },
  {
    author: { name: 'Dennis Han', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' },
    timeAgo: '8 hours ago',
    content: 'Nature walk in the park.',
    imageUrl: 'https://images.pexels.com/photos/34950/pexels-photo.jpg',
    reactions: { like: 25, love: 6, haha: 1, wow: 2, sad: 0, angry: 0 },
    comments: [],
    shares: 4,
  },
  {
    author: { name: 'Cynthia Lopez', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
    timeAgo: '9 hours ago',
    content: 'Trying a new recipe!',
    imageUrl: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg',
    reactions: { like: 14, love: 3, haha: 0, wow: 1, sad: 0, angry: 0 },
    comments: [],
    shares: 1,
  },
  {
    author: { name: 'Eric Jones', avatar: 'https://randomuser.me/api/portraits/men/23.jpg' },
    timeAgo: '10 hours ago',
    content: 'At the gym!',
    imageUrl: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
    reactions: { like: 19, love: 2, haha: 1, wow: 0, sad: 0, angry: 0 },
    comments: [],
    shares: 2,
  },
  {
    author: { name: 'Aiden Brown', avatar: 'https://randomuser.me/api/portraits/men/54.jpg' },
    timeAgo: '11 hours ago',
    content: 'Movie night!',
    imageUrl: 'https://images.pexels.com/photos/799137/pexels-photo-799137.jpeg',
    reactions: { like: 11, love: 1, haha: 0, wow: 0, sad: 0, angry: 0 },
    comments: [],
    shares: 0,
  },
  {
    author: { name: 'Sophie Turner', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
    timeAgo: '12 hours ago',
    content: 'Baking cookies 🍪',
    imageUrl: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg',
    reactions: { like: 16, love: 5, haha: 1, wow: 0, sad: 0, angry: 0 },
    comments: [],
    shares: 1,
  },
  {
    author: { name: 'Lucas White', avatar: 'https://randomuser.me/api/portraits/men/77.jpg' },
    timeAgo: '13 hours ago',
    content: 'Learning React is fun!',
    imageUrl: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
    reactions: { like: 21, love: 7, haha: 2, wow: 1, sad: 0, angry: 0 },
    comments: [],
    shares: 2,
  },
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
    {
      author: { name: 'Mia Green', avatar: 'https://randomuser.me/api/portraits/women/55.jpg' },
      timeAgo: '3 days ago',
      content: 'Picnic with friends!',
      imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      reactions: { like: 40, love: 12, haha: 3, wow: 2, sad: 0, angry: 0 },
      comments: [],
      shares: 5,
    },
    {
      author: { name: 'Noah Black', avatar: 'https://randomuser.me/api/portraits/men/88.jpg' },
      timeAgo: '4 days ago',
      content: 'Just chilling...',
      imageUrl: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
      reactions: { like: 13, love: 2, haha: 0, wow: 0, sad: 0, angry: 0 },
      comments: [],
      shares: 1,
    },
    {
      author: { name: 'Emma Stone', avatar: 'https://randomuser.me/api/portraits/women/66.jpg' },
      timeAgo: '5 days ago',
      content: 'Yoga in the morning!',
      imageUrl: 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg',
      reactions: { like: 17, love: 4, haha: 1, wow: 0, sad: 0, angry: 0 },
      comments: [],
      shares: 2,
    },
    {
      author: { name: 'Oliver King', avatar: 'https://randomuser.me/api/portraits/men/99.jpg' },
      timeAgo: '6 days ago',
      content: 'Working on a new project.',
      imageUrl: 'https://images.pexels.com/photos/256401/pexels-photo-256401.jpeg',
      reactions: { like: 23, love: 6, haha: 2, wow: 1, sad: 0, angry: 0 },
      comments: [],
      shares: 3,
    },
    {
      author: { name: 'Sophia Lee', avatar: 'https://randomuser.me/api/portraits/women/77.jpg' },
      timeAgo: '7 days ago',
      content: 'First day at new job!',
      imageUrl: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
      reactions: { like: 29, love: 9, haha: 1, wow: 2, sad: 0, angry: 0 },
      comments: [],
      shares: 4,
    },
    {
      author: { name: 'James Bond', avatar: 'https://randomuser.me/api/portraits/men/7.jpg' },
      timeAgo: '8 days ago',
      content: 'Mission accomplished.',
      imageUrl: 'https://images.pexels.com/photos/167964/pexels-photo-167964.jpeg',
      reactions: { like: 35, love: 10, haha: 2, wow: 1, sad: 0, angry: 0 },
      comments: [],
      shares: 6,
    },
    {
      author: { name: 'Lily Brown', avatar: 'https://randomuser.me/api/portraits/women/88.jpg' },
      timeAgo: '9 days ago',
      content: 'Weekend getaway!',
      imageUrl: 'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg',
      reactions: { like: 27, love: 8, haha: 1, wow: 0, sad: 0, angry: 0 },
      comments: [],
      shares: 2,
    },
    {
      author: { name: 'William Scott', avatar: 'https://randomuser.me/api/portraits/men/66.jpg' },
      timeAgo: '10 days ago',
      content: 'Hiking adventure!',
      imageUrl: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg',
      reactions: { like: 31, love: 7, haha: 2, wow: 1, sad: 0, angry: 0 },
      comments: [],
      shares: 3,
    },
    {
      author: { name: 'Ella Walker', avatar: 'https://randomuser.me/api/portraits/women/99.jpg' },
      timeAgo: '11 days ago',
      content: 'Art class fun!',
      imageUrl: 'https://images.pexels.com/photos/207666/pexels-photo-207666.jpeg',
      reactions: { like: 15, love: 3, haha: 0, wow: 0, sad: 0, angry: 0 },
      comments: [],
      shares: 1,
    },
]; 