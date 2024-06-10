import {
  ValidationOptions,
  ValidateBy,
  isNumber,
  isString,
} from 'class-validator'

export function IsNumberOrString(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: 'isNumberOrString',
      validator: {
        validate(value, args): boolean {
          return isNumber(value) || isString(value)
        },
        defaultMessage(): string {
          return 'Value must be either a number or a string.'
        },
      },
    },
    validationOptions,
  )
}
