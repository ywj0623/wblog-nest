import { Module } from '@nestjs/common'
import { AppResolver } from 'src/resolvers/app.resolver'
import { AppService } from 'src/services/app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver } from '@nestjs/apollo'
import { join } from 'path'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { PostModule } from 'src/modules/post/post.module'
import { UserModule } from 'src/modules/user/user.module'
import { AuthModule } from 'src/modules/auth/auth.module'
import { StaticDataModule } from './staticData/staticData.module'
import { TokenModule } from 'src/modules/token/token.module'
import jwtConfig from 'src/config/jwt.config'

@Module({ imports: [PostModule, UserModule, AuthModule, StaticDataModule, TokenModule] })
export class APIModule {}

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault() as any],
      cors: true,
      context: ({ req, res }) => {
        return { req, res }
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configServer: ConfigService) => {
        const options: MongooseModuleOptions = { uri: configServer.get<string>('DATABASE_URL') }
        return options
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
      envFilePath: '.env',
      cache: true,
    }),
    APIModule,
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}
