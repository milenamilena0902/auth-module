import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {

   constructor(private readonly usersService: UserService) {}

   //Get all users
   @Get()
   @ApiOperation({ summary: 'Get all users '})
   @ApiResponse({ status: 200, description: 'List of all users.' })
   getUsers() {
      return this.usersService.findAll();
   }

   //Get a user by ID
   @Get(':id')
   @ApiOperation({ summary: 'Get a user by ID'})
   @ApiParam({ name: 'id', required: true, description: 'ID of the user to retrieve' })
   @ApiResponse({ status: 200, description: 'The found user.' })
   @ApiResponse({ status: 404, description: 'User not found.' })
   getUserById(@Param('id') id:string) {
      return this.usersService.findOne(id);
   }

   //Create a new user
   @Post()
   @ApiOperation({ summary: 'Create a new user' })
   @ApiBody({ description: 'User data to create a new user', type: CreateUserDto})
   @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
   @ApiResponse({ status: 400, description: 'Bad request.' })
   createUser(@Body() createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
   }

   
}