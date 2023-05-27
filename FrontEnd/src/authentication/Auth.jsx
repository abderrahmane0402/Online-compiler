import Body from "./layout/Body"
import Header from "./layout/Header"
import Test from "./layout/Test"
import ShortUser from "./components/ShortUser"
import Page from "./layout/Page"
import Form from "./layout/Form/Form"

export default function Auth() {
  return (
    <Body>
      <Header>
        <ShortUser />
      </Header>
      <Page>
        <Test />
        {/*<Form /> */}
      </Page>
    </Body>
  )
}
