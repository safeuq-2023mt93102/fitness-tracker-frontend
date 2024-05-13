import {getServerSession} from "next-auth";
import {getToken} from "next-auth/jwt";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: any) {
  const session = await getServerSession(authOptions)
  console.log(session)
  const body = await req.json()
  console.log("Request", body, typeof body);
  let authorization = "Bearer " + session?.accessToken;
  console.log(authorization)
  const res = await fetch('http://localhost:8080/activity/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authorization,
    },
    body: JSON.stringify(body)
  })

  if (res.bodyUsed) {
    const data = await res.json()
    console.log("RESPONSE", data);
    return Response.json(data)
  }
  console.log(res.headers)
  return new Response(null, {
      headers: res.headers,
      status: res.status,
      statusText: res.statusText
    }
  )
}