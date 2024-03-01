// Importing the Injectable decorator from the Nest.js common module

import { Injectable } from '@nestjs/common'; 


// Importing the AuthGuard class from the Nest.js passport module

import { AuthGuard } from '@nestjs/passport'; 
// Decorating the JwtAuthGuard class with the Injectable decorator to denote it as a provider in Nest.js
@Injectable() 
// Defining JwtAuthGuard class which extends the AuthGuard class and specifies 'jwt' as the strategy

export class JwtAuthGuard extends AuthGuard('jwt') {} 