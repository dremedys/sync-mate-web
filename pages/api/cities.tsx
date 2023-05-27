import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
const { NEXT_PUBLIC_GEONAME_URL } = process.env;
const { NEXT_PUBLIC_GEONAME_USERNAME } = process.env;

export default async function getCities(req: NextApiRequest, res: NextApiResponse) {
  const result = await axios.get(`${NEXT_PUBLIC_GEONAME_URL}/searchJSON`, {
    params: {
      maxRows: 1000,
      username: NEXT_PUBLIC_GEONAME_USERNAME,
      orderby: 'population',
      featureClass: 'P',
      country: req.query.country,
    },
  });
  return res.json(result.data);
}
