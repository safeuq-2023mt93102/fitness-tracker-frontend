import Logout from "@/app/components/Logout";
import React from "react";

import {Button, Modal, Input, Select, Flex, Typography} from 'antd';
import {InputNumber, Table, Tag, Layout, Menu, theme} from 'antd';
const {Header, Sider, Content} = Layout;
const {Title} = Typography;
const {Text} = Typography;

export default function Navbar({userName}) {
  return (
    <Header>
      <Flex style={{height: "100%"}} align={"center"}>
        <Title level={4} style={{color: "white", margin: 0}}>Fitness Tracker</Title>
        <div style={{flexGrow: 1}}></div>
        <Text style={{color: "white", marginRight: "20px"}}>Welcome, {userName}</Text>
        <Logout/>
      </Flex>
    </Header>
  )
}