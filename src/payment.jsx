import NavBar from "./navbar"
import Footer from "./footer"
import "./styles_home.css"
import "./styles_payment.css"

export default function Payment() {
    return (
        <div>
            {/*Insert NavBar*/}
            <NavBar />

            {/*Page Name*/}
            <div className="paymentDiv">
                <p className="paymentHeader">Enter Payment Details</p>
            </div>


            <footer className="footerText">
                {/*Insert Footer*/}
                <Footer />
            </footer>


        </div>
    )
}