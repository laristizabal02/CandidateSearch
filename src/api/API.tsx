/*
const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    // console.log(import.meta.env);
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );
    // console.log('Response:', response);
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    // console.log('Data:', data);
    return data;
  } catch (err) {
    // console.log('an error occurred', err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    // console.log('an error occurred', err);
    return {};
  }
};

export { searchGithub, searchGithubUser };
*/

import { Candidate } from '../interfaces/Candidate.interface'


interface ApiResponse {
  id: number;
  avatar_url: string; // Image URL from API
  login: string; // Username from API
}

interface DetailedApiResponse {
  id: number;
  avatar_url: string;
  login: string;
  name: string | null;
  location: string ;
  email: string ;
  company: string;
  bio: string ;
}

const searchGithub = async (): Promise<Candidate[]> => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
   // console.log('Request URL:', `https://api.github.com/users?since=${start}`);
   // console.log('Authorization Header:', `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`);
   

    const response = await fetch(`https://api.github.com/users?since=${start}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    //console.log('Response Status:', response.status);
    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab.');
    }

    const users: ApiResponse[] = await response.json();
    //console.log('Raw Data from GitHub API:', users);

    // Fetch detailed user data for each user
    const detailedUsers = await Promise.all(
      users.map(async (user) => {
        const userDetailsResponse = await fetch(`https://api.github.com/users/${user.login}`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        });
        if (!userDetailsResponse.ok) {
          console.error(`Failed to fetch details for user: ${user.login}`);
          return null; // Return null for failed fetches
        }
        return userDetailsResponse.json();
      })
    );

    // Filter out any null results
    const validUsers = detailedUsers.filter((user) => user !== null) as DetailedApiResponse[];
    //console.log('Detailed User Data:', validUsers);

    const candidates = mapApiDataToCandidate(validUsers);
    //console.log('Mapped Candidates:', candidates);

    return candidates;
  } catch (err) {
    console.error('An error occurred:', err);
    return [];
  }
};

const mapApiDataToCandidate = (data: DetailedApiResponse[]): Candidate[] => {
  return data.map((item) => ({
    id: item.id,
    image: item.avatar_url,
    name: item.name || item.login,
    location: item.location || 'Location not available',
    email: item.email || 'Email not available',
    company: item.company || 'Company not available',
    bio: item.bio || 'Bio not available',
  }));
};

export { searchGithub };