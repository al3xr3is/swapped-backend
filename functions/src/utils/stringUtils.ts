'use strict';

function parseStringAsArray(stringAsArray: string) {
  return stringAsArray.toLowerCase().split(',').map(arr => arr.trim());
}

export { parseStringAsArray };
