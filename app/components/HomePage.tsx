"use client"
import {Button, Modal, Input, Select, Flex, Typography} from 'antd';
import Logout from "@/app/components/Logout";
import {SessionProvider, useSession} from "next-auth/react";
import {getServerSession, Session} from "next-auth";

const {Text} = Typography;

async function HomePage() {
  const session = await getServerSession();
  return (
    <>
      <SessionProvider session={session}>
        <Flex vertical>
          <Text>Welcome, {session?.user?.name}</Text>
          <Button type="link" href={"/nutrition"}>Nutrition tracker</Button>
          <Button type="link" href={"/activity_logging"}>Activity logging</Button>
          <Button type="link" href={"/integration"}>Integrate devices</Button>
          <Button type="link" href={"/share"}>Share progress</Button>
          <Button type="link" href={"/workout"}>Workout Plan</Button>
          <Logout/>
        </Flex>
      </SessionProvider>
    </>
  )
}

export default HomePage;