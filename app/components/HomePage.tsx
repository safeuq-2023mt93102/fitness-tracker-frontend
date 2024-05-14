"use client"
import React, {useState} from 'react';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  ShareAltOutlined,
  FieldTimeOutlined,
  FormOutlined,
  ProductOutlined
} from '@ant-design/icons';
import {Button, Modal, Input, Select, Flex, Typography} from 'antd';
import type {MenuProps} from 'antd';
import {InputNumber, Table, Tag, Layout, Menu, theme} from 'antd';

import Logout from "@/app/components/Logout";
import LogActivity from "@/app/components/LogActivity";
import Navbar from "@/app/components/Navbar";

const {Header, Sider, Content} = Layout;
const {Title} = Typography;
const {Text} = Typography;

type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
  {key: 'logActivity', icon: <FormOutlined/>, label: 'Activity logging'},
  {key: '2', icon: <FieldTimeOutlined/>, label: 'Nutrition tracker'},
  {key: '3', icon: <DesktopOutlined/>, label: 'Integrate devices'},
  {key: '4', icon: <ShareAltOutlined/>, label: 'Share progress'},
  {key: '5', icon: <ProductOutlined/>, label: 'Workout Plan'},
];

function HomePage({userName}) {
  const [openMenu, setOpenMenu] = useState<string>(menuItems[0].key);
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();

  return (
    <>
      <Layout style={{height: "100%"}}>
        <Navbar userName={userName}/>
        <Layout>
          <Sider width={200} style={{background: colorBgContainer}}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[openMenu]}
              style={{height: '100%', borderRight: 0}}
              items={menuItems}
            />
          </Sider>
          <Content>
            {openMenu == 'logActivity' && <LogActivity/>}

            <Flex style={{height: "100%"}} justify={"center"} gap={"middle"}>
              <Button type="link" href={"/nutrition"}>Nutrition tracker</Button>
              <Button type="link" href={"/activity_logging"}>Activity logging</Button>
              <Button type="link" href={"/integration"}>Integrate devices</Button>
              <Button type="link" href={"/share"}>Share progress</Button>
              <Button type="link" href={"/workout"}>Workout Plan</Button>
            </Flex>
          </Content>
        </Layout>
      </Layout>
      {/*<Flex style={{display: "flex", height: "100%"}} align={"center"} justify={"space-evenly"} vertical>*/}

      {/*</Flex>*/}
    </>
  )
}

export default HomePage;