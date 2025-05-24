import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/modules/app.module'
import { ValidationPipe, BadRequestException } from '@nestjs/common'

async function wBlog() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints ? Object.values(error.constraints) : [],
        }))
        throw new BadRequestException(result)
      },
    }),
  )
  app.enableCors()
  await app.listen(8000)
}
wBlog()
