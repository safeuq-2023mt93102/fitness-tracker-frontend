"use client"
import {signIn} from "next-auth/react";
import {Button, Modal, Input, Select} from 'antd';


export default function Login() {
  return <Button type="primary" onClick={() => signIn("keycloak")}>
    Signin with keycloak
  </Button>
}