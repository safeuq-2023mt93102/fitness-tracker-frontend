import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from 'next/navigation';

export async function POST(forwardRequest: any) {
  const session = await getServerSession(authOptions)

  const request = await forwardRequest.json();
  const requestPath = request.path;

  console.log("Request path: ", requestPath);
  const res = await fetch('http://localhost:8080' + requestPath, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + session?.accessToken,
    },
  })
  let data;
  if (res.status / 100 === 2) {
    data = await res.json();
  }
  if (res.status / 100 === 2) {
    return Response.json(data)
  }
  return new Response(null, {
      headers: res.headers,
      status: res.status,
      statusText: res.statusText
    }
  )
}