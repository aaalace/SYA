import React from "react"
import ContentLoader from "react-content-loader"

export const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={268}
    height={160}
    viewBox="0 0 268 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="5" ry="5" width="268" height="30" /> 
    <rect x="0" y="40" rx="5" ry="5" width="268" height="30" /> 
    <rect x="0" y="80" rx="5" ry="5" width="268" height="30" /> 
    <rect x="0" y="120" rx="5" ry="5" width="268" height="30" />
  </ContentLoader>
)