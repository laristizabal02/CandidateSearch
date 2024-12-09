// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    id: number; // Unique identifier
    image: string; // Avatar URL
    name: string; // User's name
    location: string | null; // User's location (nullable)
    email: string | null; // User's email (nullable)
    company: string | null; // User's company (nullable)
    bio: string | null; // User's bio (nullable)
}