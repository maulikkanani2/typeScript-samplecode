import * as React from "react"
import ContentLoader from 'react-content-loader'

export default () => {
    return (
        <ContentLoader>
            {/* Only SVG shapes */}
            <rect x="0" y="0" rx="1" ry="1" width="100%" height="20px" />
            <rect x="0" y="25" rx="1" ry="1" width="100%" height="20" />
            <rect x="0" y="50" rx="1" ry="1" width="100%" height="20" />
        </ContentLoader>
    )
}
