/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsUUID,
} from 'class-validator'

export class filterOptions {
  take: number
  skip: number
  where?: object
  include?: object
  select?: object
  orderBy?: object
  distinct?: string[]
}

//This Method can be used only in list all
const listParser = ({
  take = Number.MAX_SAFE_INTEGER,
  skip = 0,
  where = {},
  include = {},
  select = {},
  orderBy = { createdAt: 'desc' },
  distinct = [],
}: filterOptions): filterOptions => {
  let finalData: filterOptions = {
    take: Number.MAX_SAFE_INTEGER,
    skip: 0,
    where: {},
    orderBy: { createdAt: 'desc' },
    distinct: [],
  }

  finalData[`where`] = where
  finalData.take = take
  finalData.skip = skip

  finalData.orderBy = orderBy

  if (Object.keys(distinct).length !== 0) {
    finalData.distinct = distinct
  } else {
    delete finalData.distinct
  }

  if (Object.keys(select).length !== 0) {
    finalData.select = select
  }
  if (Object.keys(include).length !== 0) {
    finalData[`include`] = include
  }

  return finalData
}
export default listParser

export class ListDto {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  public skip: number

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  public take: number

  @IsObject()
  @IsOptional()
  @ApiPropertyOptional()
  public orderBy: Object

  @IsObject()
  @IsOptional()
  @ApiPropertyOptional()
  public where: Object

  @IsObject()
  @IsOptional()
  @ApiPropertyOptional()
  public select: Object

  @IsObject()
  @IsOptional()
  @ApiPropertyOptional()
  public include: Object

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional()
  public distinct: string[]
}

export class GetDto {
  @IsUUID()
  @ApiProperty()
  public uuid: string
}
