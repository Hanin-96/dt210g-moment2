import loadingSpinnerCss from './LoadingSpinner.module.css';

function LoadingSpinner() {
    const spinnerStyle: object = {
        width: "48px",
        height: "48px",
        border: "5px solid #1e1e1e",
        borderBottomColor: "transparent",
        borderRadius: "50%",
        animation: "loadingAnim 1s linear infinite"
    }
      
    const spinnerWrap: object = {
        margin: "0 auto",
        maxWidth: "fit-content",
        marginTop: "2rem",
        marginBottom: "2rem"
    }
    return (
        <>
            <div style={spinnerWrap} >
                <div style={spinnerStyle} className={loadingSpinnerCss.loadingAnim}></div>
            </div>
        </>
    )
}

export default LoadingSpinner