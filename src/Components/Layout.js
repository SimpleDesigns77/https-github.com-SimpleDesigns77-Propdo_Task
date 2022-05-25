import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <main className="App_dis">
            <Outlet />
        </main>

    )
}

export default Layout;