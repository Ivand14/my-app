import NavBar from "@/components/navbar/Navbar";

export default function Layout({children}){
    return(
            <NavBar>
                {children}
            </NavBar>
    )
}