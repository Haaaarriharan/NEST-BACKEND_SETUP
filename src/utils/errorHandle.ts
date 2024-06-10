import { Prisma } from '@prisma/client';
import { STATUS_CODE } from './statusCode';
import { rejects } from 'assert';
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';

export const handleError = (error: any, reject: any) => {
  const fieldName = error?.meta?.target?.[0];
  const modelName = error?.meta?.modelName;

  if (error instanceof PrismaClientInitializationError) {
    reject({
      message: 'Prisma Client initialization error',
      code: STATUS_CODE.internalServerError,
    });
  } else if (error.code === 'P2002') {
    reject({
      message: `${modelName} ${fieldName} already exists`,
      code: STATUS_CODE.badRequest,
    });
  } else if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2025'
  ) {
    reject({
      message: `${modelName} not found`,
      code: STATUS_CODE.notFound,
    });
  } else if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2023'
  ) {
    reject({
      message: `${modelName} not found`,
      code: STATUS_CODE.notFound,
    });
  } else {
    reject({
      message: 'Internal server error',
      code: STATUS_CODE.internalServerError,
    });
  }
};
