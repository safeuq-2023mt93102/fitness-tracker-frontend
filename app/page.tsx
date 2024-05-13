import HomePage from "@/app/components/LogActivity";
import {getServerSession} from 'next-auth'
import {authOptions} from './api/auth/[...nextauth]/route'
import Logout from "@/app/components/Logout";
import Login from "@/app/components/Login";

async function Home() {
  const session = await getServerSession(authOptions)
  if (session) {
    return (<div>
      <div>Welcome, {session.user?.name}</div>
      <div><HomePage/></div>
      <div><Logout/></div>
    </div>);
  }
  return (
    <div>
      <Login/>
    </div>
  );
}

export default Home;