import NavBar from "./navbar"
import Footer from "./footer"
import "./styles_home.css"
import "./styles_payment.css"
import "./variables"

export default function Payment() {
    return (
        <div>
            {/*Insert NavBar*/}
            <NavBar />

            {/*Page Name*/}
            <div className="paymentDiv">
                <p
                    className="paymentHeader"
                    style={{ fontFamily: 'Ubuntu' }}
                >Enter Payment Details</p>
            </div>


            <footer className="footerText">
                {/*Insert Footer*/}
                <Footer />
            </footer>


        </div>
    )
}