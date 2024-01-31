import './index.css'
import React, { forwardRef, useState } from "react";

function Loader() {

    const [loaders, setLoader] = useState(false);
    const [isAuthPage, setIsAuthPage] = useState(false)

    const setLoaderStatus = (status) => {
        let url = window.location.href;
        setIsAuthPage(url.includes('auth'))
        setLoader(status)
    }
    Loader.defaultProps = {
        setLoaderStatus,
        loaders
    }
    return (
        <div>
            {
                loaders ?
                    <div className='container-modal'
                        style={{
                            paddingLeft: !isAuthPage ? 250 : 0
                        }}>
                        No Data
                    </div> : <div></div>
            }
        </div>
    )
}

const LoaderRef = forwardRef(Loader);
export default LoaderRef;
