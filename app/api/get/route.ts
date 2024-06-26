import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function POST(forwardRequest: any) {
  const session = await getServerSession(authOptions)

  const request = await forwardRequest.json();
  const requestPath = request.path;

  console.log("Request path: ", requestPath);
  return fetch('http://localhost:8080' + requestPath, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + session?.accessToken,
    },
  }).then((success) => {
    console.log("Success: ", success)
    return success
  }, (error) => {
    console.log("Error: ", error)
    return error
  });
}