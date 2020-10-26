import React from 'react';
import './CSS/ImdbIcon.css';

// Ikon for å vise imdb rating
function ImdbIcon(props: { rating: number }) {
    return (
      <div className={"ImdbIcon"}>
        <svg width={110} height={35} viewBox="0 0 500 178" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M523 15.4614C521.581 7.54138 512.967 1.22897 501.998 0C453.918 0 69.2907 0 21.2111 0C9.1957 1.3469 0 8.78897 0 17.7579C0 32.1766 0 147.501 0 161.913C0 171.844 11.2513 179.894 25.1404 179.894C72.4287 179.894 450.781 179.894 498.069 179.894C510.857 179.894 521.417 173.061 523 164.216C523 134.466 523 30.3331 523 15.4614Z" fill="#F6C700"/>
            <path d="M289.369 127.055C288.846 128.439 286.554 129.141 284.823 129.141C283.13 129.141 282.003 128.47 281.43 127.123C280.857 125.783 280.577 122.723 280.577 117.931C280.577 115.051 280.577 91.9986 280.577 89.1186C280.577 84.1531 280.826 81.0558 281.33 79.8206C281.829 78.5979 282.924 77.9772 284.618 77.9772C286.349 77.9772 288.671 78.6786 289.269 80.0875C289.86 81.4965 290.159 84.5069 290.159 89.1186C290.159 90.9806 290.159 100.291 290.159 117.056C289.979 122.797 289.717 126.13 289.369 127.055ZM253.207 143.51H278.784C279.849 139.345 280.434 137.03 280.552 136.564C282.868 139.357 285.415 141.455 288.21 142.845C290.994 144.242 295.159 144.937 298.384 144.937C302.873 144.937 306.746 143.764 310.015 141.412C313.277 139.065 315.357 136.285 316.241 133.088C317.125 129.885 317.567 125.019 317.567 118.477C317.567 115.417 317.567 90.9496 317.567 87.8896C317.567 81.3103 317.417 77.0151 317.125 74.9979C316.832 72.9806 315.961 70.9262 314.51 68.822C313.059 66.7179 310.948 65.0855 308.184 63.9186C305.42 62.7517 302.157 62.1682 298.396 62.1682C295.128 62.1682 290.944 62.82 288.154 64.1048C285.371 65.3896 282.843 67.3386 280.577 69.9517C280.577 67.5868 280.577 55.7689 280.577 34.4855H253.207V143.51Z" fill="black"/>
            <path d="M215.868 58.1152C216.18 59.5055 216.342 62.6586 216.342 67.5869C216.342 71.8138 216.342 105.629 216.342 109.856C216.342 117.112 215.868 121.556 214.928 123.194C213.982 124.833 211.467 125.646 207.388 125.646C207.388 118.49 207.388 61.2372 207.388 54.0807C210.483 54.0807 212.593 54.4097 213.714 55.0552C214.835 55.7069 215.557 56.7248 215.868 58.1152ZM228.701 143.348C232.081 142.61 234.921 141.306 237.224 139.45C239.522 137.588 241.134 135.012 242.056 131.717C242.983 128.427 243.531 121.891 243.531 112.115C243.531 108.292 243.531 77.6607 243.531 73.831C243.531 63.5152 243.127 56.6007 242.498 53.0876C241.863 49.5683 240.288 46.3717 237.766 43.5041C235.238 40.6366 231.552 38.5759 226.708 37.3221C221.858 36.0683 213.951 35.4352 200.197 35.4352C198.784 35.4352 191.723 35.4352 179.003 35.4352V144.459H213.422C221.354 144.211 226.447 143.845 228.701 143.348Z" fill="black"/>
            <path d="M125.271 86.369C122.83 69.7531 121.473 60.5173 121.205 58.6738C120.016 49.7793 118.883 42.0393 117.8 35.4352C115.34 35.4352 103.069 35.4352 80.9656 35.4352V144.459H105.852L105.939 72.4717L116.411 144.459H134.137L144.068 70.8704L144.161 144.459H168.967V35.4352H131.852L125.271 86.369Z" fill="black"/>
            <path d="M43.1787 36.1489H71.5888V145.173H43.1787V36.1489Z" fill="black"/>
            <text fontSize="100" x="370" y="125" fill="black">{props.rating}</text>
        </svg>
      </div>
    );
  }
  
  export default ImdbIcon;
