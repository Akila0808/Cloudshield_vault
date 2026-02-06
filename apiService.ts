
import { User } from './types';

// This acts as our in-memory "database" for the mock API.
// We pre-populate it with one of the original demo users.
const mockUsers: User[] = [
    {
        username: 'cyber_ninja',
        password: 'password123',
        email: 'ninja@cloudshield.io',
        contact: '555-0100',
        gender: 'N/A'
    }
];


// This is a mock API service. Replace the logic inside these functions
// with actual `fetch` calls to your FastAPI backend.

/**
 * Registers a new user.
 * In a real app, this would make a POST request to /api/signup.
 */
export const signupUser = async (newUser: Omit<User, 'gender'>): Promise<User> => {
  console.log('API CALL: signupUser', newUser);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Check if user already exists in our mock database
  if (mockUsers.some(user => user.username === newUser.username)) {
    throw new Error('An operator with this ID already exists.');
  }
  
  // Add the new user to our mock database
  const createdUser: User = { ...newUser, gender: 'N/A' };
  mockUsers.push(createdUser);
  console.log('Current users in mock DB:', mockUsers);
  return createdUser;
};

/**
 * Logs in a user.
 * In a real app, this would make a POST request to /api/login.
 */
export const loginUser = async (username: string, password?: string): Promise<User> => {
    console.log('API CALL: loginUser', { username, password });
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Find the user in our mock database
    const user = mockUsers.find(
        (u) => u.username === username && u.password === password
    );

    if (user) {
        // Return a copy of the user object without the password
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword as User;
    }
  
    // Simulate failed login
    throw new Error('Authorization failed. Check Operator ID and Master Password.');
  };
