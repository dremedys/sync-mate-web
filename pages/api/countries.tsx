import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
const { NEXT_PUBLIC_GEONAME_URL } = process.env;
const { NEXT_PUBLIC_GEONAME_USERNAME } = process.env;

export default async function getCountries(req: NextApiRequest, res: NextApiResponse) {
  const result = await axios.get(`${NEXT_PUBLIC_GEONAME_URL}/countryInfoJSON`, {
    params: { maxRows: 1000, username: NEXT_PUBLIC_GEONAME_USERNAME },
  });
  return res.json(result.data);
}
