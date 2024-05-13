import HomePage from "@/app/components/HomePage";
import {getServerSession} from 'next-auth'
import {authOptions} from './api/auth/[...nextauth]/route'
import Logout from "@/app/components/Logout";
import Login from "@/app/components/Login";

async function Home() {
  const session = await getServerSession(authOptions)
  if (session) {
    return (<HomePage userName={session.user?.name}/>);
  }
  return (<Login/>);
}

export default Home;