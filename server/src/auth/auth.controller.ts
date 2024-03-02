import {Controller,Post,Request,UseGuards,Res,HttpStatus,UnauthorizedException, // Removed duplicate import
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res) {
    try {
      const { username, password } = req.body;

      // Validate input for security
      if (!username || !password) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const { access_token, role } = await this.authService.login(username, password);

      res.cookie('token', access_token, { httpOnly: true });

      // Fixed message template string
      const message = role === 'ADMIN' ? `Welcome admin ${username}` : `Welcome ${username}`;

      res.status(HttpStatus.OK).json({ success: true, message,role });
      console.log(message)
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        let errorMessage = 'Invalid username or password';
        if (error.message === 'Invalid credentials') {
          errorMessage = 'Username or password cannot be empty';
        }
        res.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: errorMessage });
      } else {
        // Log other errors for troubleshooting
        console.error('Login error:', error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: 'An error occurred' });
      }
    }
  }
}
