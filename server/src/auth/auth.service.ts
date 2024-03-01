import { Injectable, UnauthorizedException } from '@nestjs/common'; // Import Injectable decorator and UnauthorizedException from NestJS
import { PrismaService } from '../prisma/prisma.service'; // Import PrismaService to interact with the database
import { JwtService } from '@nestjs/jwt'; // Import JwtService for JWT token handling
import * as bcrypt from 'bcrypt'; // Import bcrypt for password hashing

@Injectable() // Decorator to define this class as an injectable service
export class AuthService {
  constructor(
    private prisma: PrismaService, // Inject PrismaService to interact with the database
    private jwtService: JwtService // Inject JwtService for JWT token handling
  ) {}

  // Method to validate user credentials
  async validateUser(username: string, password: string) {
    // Query the database to find a user with the provided username
    const user = await this.prisma.teamMember.findUnique({
      where: { username },
    });
    
    // Check if a user with the provided username exists
    if (user) {
      // Compare the hashed password stored in the database with the provided password
      const passwordMatch = await bcrypt.compare(password, user.password);
      
      // If passwords match, return the user object without the password
      if (passwordMatch) {
        const { password: _, ...result } = user; // Omitting password from returned user object
        return result;
      }
    }
    
    // Return null if user not found or passwords don't match
    return null;
  }

  // Method to handle user login and generate JWT token
  async login(username: string, password: string) {
    // Validate user credentials
    const user = await this.validateUser(username, password);
    
    // If user not found or passwords don't match, throw UnauthorizedException
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // Generate JWT token containing user's username, ID, and role
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload), // Sign the JWT token with the payload
      role: user.role
    };
  }
}
