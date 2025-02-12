function Header() {
  const HeaderStyle: object = {
    backgroundColor: "#1e1e1e",
    color: "#FFFFFF",
    textAlign: "center",
    padding: "1rem",
    fontSize: "1.5rem",
    lineHeight: "150%"
}
  const headerTitle = "Moment 2 - Todo";
    return (
      <>
        <header style={HeaderStyle}>
          <h1>{headerTitle}</h1>
        </header>
      </>
    )
  }
  
  export default Header