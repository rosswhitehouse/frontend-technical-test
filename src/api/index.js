// eslint-disable-next-line no-unused-vars
import { request } from './helpers';

/**
 * Pull vehicles information
 *
 * @return {Promise<Array.<vehicleSummaryPayload>>}
 */
// TODO: All API related logic should be made inside this function.
export default async function getData(id = '') {
  try {
    // I wanted the option to search one or all cars, I'd have liked them to be in separate functions (more REST-ful), but 'ALL API related logic should be made inside this function.'
    const res = await fetch(`/api/vehicle${id ? '_id' : 's'}.json`);
    const data = await res.json();
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  return [];
}
