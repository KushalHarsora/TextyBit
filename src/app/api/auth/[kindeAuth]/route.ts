import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: any
) {
  const endpoint = params.kindeAuth;

  // If handleAuth returns a function, call it to get the Response
  const response = handleAuth(request, endpoint);
  if (typeof response === 'function') {
    return await response(request, endpoint);
  }

  // Otherwise, assume it's a Response or Promise<Response>
  return response;
}
