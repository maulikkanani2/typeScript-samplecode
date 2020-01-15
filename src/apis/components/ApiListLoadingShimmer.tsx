import * as React from "react"
import ContentLoader from 'react-content-loader'

export default () => {
    return (
        <ContentLoader>
            {/* Only SVG shapes */}
            <rect x="0" y="0" rx="1" ry="1" width="100px" height="70px" />
            <rect x="110" y="0" rx="1" ry="1" width="100px" height="70px" />
        </ContentLoader>
    )
}
