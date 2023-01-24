// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  number: number
}

const values: Map<string, number> = new Map([
  ["I", 1],
  ["V", 5],
  ["X", 10],
  ["L", 50],
  ["C", 100],
  ["D", 500],
  ["M", 1000],
]);

function romanToInt(s: string): number {
  let total = values.get(s.slice(-1)[0])!;

  for (let i = s.length - 2; i >= 0; i--) {
    if (values.get(s[i])! < values.get(s[i + 1])!) {
      total -= values.get(s[i])!;
    } else {
      total += values.get(s[i])!;
    }
  }

  return total || 0;
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const numeral = String(req.query.numeral);
  const number = romanToInt(numeral);
  res.status(200).json({ number })
}
