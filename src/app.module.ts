import { Module } from '@nestjs/common'
import { AppResolver } from './app.resolver'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { BlogModule } from './blog/blog.module'

@Module({ imports: [BlogModule] })
export class APIModule {}

@Module({
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
        const options: MongooseModuleOptions = { uri: configServer.get<string>('DATABASE_URL') }
        return options
      },
    }),
    ConfigModule.forRoot({ cache: true }),
    APIModule,
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}
