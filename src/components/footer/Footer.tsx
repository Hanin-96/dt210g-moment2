function Footer() {
    const footerStyle: object = {
        backgroundColor: "#1e1e1e",
        color: "white",
        textAlign: "center",
        padding: "1rem",
        fontSize: "1.5rem",
        lineHeight: "150%"
    }
    return (
        <>
            <footer style={footerStyle}>
                <p>Moment 2</p>
                <p>Hanin Farhan</p>
                <p>hafa2300@studenter.miun.se</p>
                <p>DT210G - Fördjupad frontend-utveckling</p>
                <p>Webbutveckling 120hp</p>
                <p>Mittuniversitet</p>
            </footer>
        </>
    )
}

export default Footer