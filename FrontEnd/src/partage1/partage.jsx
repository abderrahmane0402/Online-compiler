import { useContext, useEffect, useState } from "react"
import Header from "./layout/Header"
import React from "react"
import { useNavigate } from "react-router-dom"
import Layout from "./layout"
import Editor from "./layout/Editor"
import Terminal from "./layout/Terminal"
import Main from "./layout/main"
import { fileInfo } from "../App"

export default function Partage() {
  const router = useNavigate()
  let { setFile, socket } = useContext(fileInfo)

  useEffect(() => {
    if (!sessionStorage.getItem("email")) router("/", { replace: true })
    if (!socket) router("/ide", { replace: true })
  }, [])

  useEffect(() => {
    socket.on("code", (code) => {
      console.log(code)
      setFile(code)
    })
  }, [])

  return (
    <Layout>
      <Header />
      <Main>
        <Editor />
        <Terminal />
      </Main>
    </Layout>
  )
}
