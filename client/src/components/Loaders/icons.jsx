import React from "react"
import ContentLoader from "react-content-loader"

export const IconLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={50}
    height={50}
    viewBox="0 0 50 50"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="25" cy="25" r="25" />
  </ContentLoader>
)