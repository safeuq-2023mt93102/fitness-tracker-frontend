"use client"
import {Button, Modal, Input, Select, Flex, Typography} from 'antd';
import Logout from "@/app/components/Logout";

const {Text} = Typography;

function HomePage({userName}) {
  return (
    <>
      <Flex vertical>
        <Text>Welcome, {userName}</Text>
        <Button type="link" href={"/nutrition"}>Nutrition tracker</Button>
        <Button type="link" href={"/activity_logging"}>Activity logging</Button>
        <Button type="link" href={"/integration"}>Integrate devices</Button>
        <Button type="link" href={"/share"}>Share progress</Button>
        <Button type="link" href={"/workout"}>Workout Plan</Button>
        <Logout/>
      </Flex>
    </>
  )
}

export default HomePage;