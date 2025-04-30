import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return new Response('Missing code', { status: 400 });
  }

 
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID as string,
      client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirect_uri: process.env.REDIRECT_URI as string,
      grant_type: 'authorization_code',
    }),
  });

  const tokenData: { access_token?: string; error?: string } = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  if (!accessToken) {
    return new Response('Authentication failed', { status: 400 });
  }

  const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const userData: {
    name?: string;
    email?: string;
    picture?: string;
  } = await userResponse.json();

  const params = new URLSearchParams({
    name: userData.name || '',
    email: userData.email || '',
    picture: userData.picture || 'no picture',
  });

  const baseUrl = process.env.BASE_URL as string;
return Response.redirect(`${baseUrl}/profile?${params.toString()}`, 302);
}
