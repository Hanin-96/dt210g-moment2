import loadingSpinnerCss from './LoadingSpinner.module.css';

function LoadingSpinner() {
      
    const spinnerWrap: object = {
        margin: "0 auto",
        maxWidth: "fit-content",
        marginTop: "2rem",
        marginBottom: "2rem"
    }
    return (
        <>
            <div style={spinnerWrap} >
                <div className={loadingSpinnerCss.spinnerStyle}></div>
            </div>
        </>
    )
}

export default LoadingSpinner