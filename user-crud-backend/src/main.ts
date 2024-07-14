import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { jwtConstants } from './jwt.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors({
    origin: '*', // Adjust this to match your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

 

  await app.listen(jwtConstants.port);
}
bootstrap();
