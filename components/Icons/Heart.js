import * as React from "react";

const SvgHeart = (props) => (
  <svg
    className="heart_svg__icon heart_svg__icon-heart"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 90"
    {...props}
  >
    <path
      style={{
        textIndent: 0,
        textTransform: "none",
        blockProgression: "tb",
      }}
      d="M28.217 11.004c-6.186 0-12.369 2.342-17.094 7-9.451 9.316-9.44 24.49 0 33.813l36.75 36.312a3 3 0 0 0 4.219 0c12.264-12.089 24.516-24.16 36.78-36.25 9.452-9.316 9.452-24.528 0-33.844-9.45-9.316-24.735-9.316-34.187 0L50.03 22.63l-4.719-4.625c-4.725-4.658-10.908-7-17.093-7zm0 5.969c4.652 0 9.296 1.785 12.875 5.312l6.812 6.688a3 3 0 0 0 4.219 0l6.781-6.656a18.309 18.309 0 0 1 25.75 0c7.158 7.055 7.158 18.225 0 25.28-11.556 11.392-23.1 22.766-34.656 34.157L15.342 47.567c-7.154-7.065-7.158-18.226 0-25.282 3.579-3.527 8.222-5.312 12.875-5.312z"
      overflow="visible"
      color="#000"
    />
  </svg>
);

export default SvgHeart;