// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  numeral: string;
};

const digits = new Map([
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
]);

function intToRoman(num: number): string {
  const roman_digits = [];
  // Loop through each symbol.
  for (const value of digits.keys()) {
    const symbol = digits.get(value)!;
    // console.log(value, symbol);
    // console.log('num', num);
    // We don't want to continue looping if we're done.
    if (num == 0) {
      break;
    }
    const count = Math.floor(num / value);
    num = num % value;
    // console.log('count', count);
    // console.log('num', num);
    // Append "count" copies of "symbol" to roman_digits.
    roman_digits.push(symbol.repeat(count));
  }
  return roman_digits.join("");
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const number = Number(req.query.number);
  const numeral = intToRoman(number);
  res.status(200).json({ numeral });
}
