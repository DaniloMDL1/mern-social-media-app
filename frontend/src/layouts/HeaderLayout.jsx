import Header from "../components/Header"
import { Container } from "@chakra-ui/react"
import { Outlet, useLocation } from "react-router-dom"

const HeaderLayout = () => {
    const { pathname } = useLocation()

    return (
        <>
            <Header />
            {pathname === "/" ? (
                <Outlet />
            ) : (
                <Container maxW={"620px"} mt={4}>
                    <Outlet />
                </Container>
            )}
        </>
    )
}

export default HeaderLayout