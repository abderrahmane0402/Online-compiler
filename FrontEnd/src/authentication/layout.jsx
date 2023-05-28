import Body from "../components/Body"
import Header from "./components/Header"
import Page from "./components/Page"

const Layout = ({ children }) => {
  return (
    <Body>
      <Header />
      <Page>{children}</Page>
    </Body>
  )
}

export default Layout
