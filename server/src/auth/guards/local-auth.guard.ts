// Importing the Injectable decorator from the Nest.js common module
import { Injectable } from '@nestjs/common'; 

// Importing the Injectable decorator from the Nest.js common module
import { AuthGuard } from '@nestjs/passport'; 

@Injectable() // Decorating the LocalAuthGuard class with the Injectable decorator to denote it as a provider in Nest.js
export class LocalAuthGuard extends AuthGuard('local') {} // Defining LocalAuthGuard class which extends the AuthGuard class and specifies 'local' as the strategy
