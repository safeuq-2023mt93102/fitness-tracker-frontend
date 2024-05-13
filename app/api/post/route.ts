import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from 'next/navigation';

async function extractResponse(res: Response) {
  if (res.status === 401) {
    console.log("Request is not authorized")
    redirect("/")
  }
  let data;
  if (res.bodyUsed) {
    data = await res.json();
  }
  console.log("RESPONSE", data);
  console.log(res.headers);
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

export async function POST(forwardRequest: any) {
  const session = await getServerSession(authOptions)

  const request = await forwardRequest.json();
  const requestBody = request.payload
  const requestPath = request.path;

  console.log("Request body: ", requestBody);
  console.log("Request path: ", requestPath);
  const res = await fetch('http://localhost:8080' + requestPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + session?.accessToken,
    },
    body: JSON.stringify(requestBody)
  })
  return await extractResponse(res);
}