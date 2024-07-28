import { Module } from '@nestjs/common'
import { AppResolver } from './app.resolver'
import { AppService } from './app.service'
// import { MongooseModule } from '@nestjs/mongoose'
// import { BlogModule } from './blog/blog.module'

import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { BlogModule } from './blog/blog.module'

@Module({
  // imports: [MongooseModule.forRoot('mongodb://root:root@localhost:27017/'), BlogModule],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault() as any],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configServer: ConfigService) => {
        const options: MongooseModuleOptions = {
          uri: configServer.get<string>('DATABASE_URL'),
        }
        return options
      },
    }),
    ConfigModule.forRoot({
      cache: true,
    }),
    BlogModule,
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}
