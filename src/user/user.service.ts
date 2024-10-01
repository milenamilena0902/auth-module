import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity'; 
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  private users: UserEntity[] = []; // In-memory array to hold user data for demonstration
  userModel: any;

  // Get all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Find a user by ID
  //findOne(id: number): UserEntity {
  //  const user = this.users.find(user => user.id === id);
  //  if (!user) {
  //    throw new NotFoundException(`User with ID ${id} not found`);
  //  }
  //  return user;
  //}
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Find a user by username
  async findByUsername(username: string): Promise<UserEntity | undefined> {
    return this.users.find(user => user.username === username);
  }

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.findByUsername(createUserDto.username);
    if (existingUser) {
      throw new Error(`User with username ${createUserDto.username} already exists.`);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser: UserEntity = {
      id: this.users.length + 1, // Simple ID assignment
      username: createUserDto.username,
      password: hashedPassword,
    };

    this.users.push(newUser);
    return newUser;
  }
}
