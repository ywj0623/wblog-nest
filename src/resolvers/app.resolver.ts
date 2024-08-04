// import { Controller, Get } from '@nestjs/common'
import { Resolver } from '@nestjs/graphql'
import { AppService } from 'src/services/app.service'

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}
}
