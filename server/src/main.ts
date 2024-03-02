import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as csurf from 'csurf';
import { SecurityMiddleware } from './security.middleware';

async function NestApp() {
  const app = await NestFactory.create(AppModule);
  
    // Register the security middleware globally
  app.use(new SecurityMiddleware().use);

  // Apply CORS configuration
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  await app.listen(3001);
}



NestApp();

