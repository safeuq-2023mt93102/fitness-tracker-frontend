"use client"
import {signOut} from "next-auth/react";
import {Button} from 'antd';

export default function Logout() {
  return <Button type="primary" onClick={() => signOut()}>
    Sign-out
  </Button>
}