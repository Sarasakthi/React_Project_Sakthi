import NavBar from "./navbar"
import Footer from "./footer"
import "./styles_home.css"

export default function Contact() {
    return (
        <div>
            {/*Insert NavBar*/}
            <NavBar />
            
            {/*Page Name*/}
            <h1>Contact</h1>
            
            <footer className="footerText">
                {/*Insert Footer*/}
                <Footer />
            </footer>
            
        </div>
    )
}