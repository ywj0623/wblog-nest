import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/modules/app.module'
import { ValidationPipe } from '@nestjs/common'

async function wBlog() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  await app.listen(8000)
}
wBlog()
