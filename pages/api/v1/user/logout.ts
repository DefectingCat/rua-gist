import nookies from 'nookies';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const logout = async () => {
    nookies.set({ res }, 'token', '', {
      maxAge: 0,
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      path: '/',
    });
    res.status(200).json({
      status: 'success',
      message: 'logout success.',
      data: {},
    });
  };

  switch (req.method) {
    case 'POST':
      return logout();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
