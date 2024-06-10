/* eslint-disable prettier/prettier */
import * as _ from 'lodash'

export const deleteEmptyFields = (obj, fieldsToDelete) => {
  fieldsToDelete.forEach(field => {
    if (_.isEmpty(obj[field])) {
      delete obj[field];
    }
  });
};