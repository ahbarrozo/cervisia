import * as React from "react";

const SvgMapMark = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M50 7C34.548 7 22 19.548 22 35c0 5.57 1.638 10.762 4.438 15.125l15.375 23.969c-1.582.436-3.04.982-4.313 1.656C34.238 77.477 32 80.004 32 83c0 2.996 2.238 5.523 5.5 7.25C40.762 91.977 45.163 93 50 93s9.238-1.023 12.5-2.75C65.762 88.523 68 85.996 68 83c0-2.996-2.238-5.523-5.5-7.25-1.27-.672-2.737-1.219-4.313-1.656l15.376-23.969A27.927 27.927 0 0 0 78 35C78 19.548 65.452 7 50 7zm0 2c14.371 0 26 11.629 26 26 0 5.178-1.524 9.977-4.125 14.031L50 83.125 28.125 49.031A25.868 25.868 0 0 1 24 35C24 20.629 35.629 9 50 9zm0 15c-6.063 0-11 4.937-11 11s4.937 11 11 11 11-4.937 11-11-4.937-11-11-11zm0 2c4.982 0 9 4.018 9 9s-4.018 9-9 9-9-4.018-9-9 4.018-9 9-9zm-7.031 49.875 6.187 9.656a1 1 0 0 0 1.688 0l6.187-9.656c1.701.428 3.247.976 4.532 1.656C64.453 79.061 66 81.025 66 83s-1.547 3.939-4.438 5.469C58.672 89.999 54.553 91 50 91c-4.551 0-8.672-1.001-11.563-2.531C35.547 86.939 34 84.975 34 83s1.547-3.938 4.438-5.469c1.285-.68 2.828-1.228 4.53-1.656z" />
    <path
      style={{
        fill: "#fc0",
        strokeWidth: 0.134139,
      }}
      d="M49.734 82.74c-.818-1.167-21.991-34.277-22.555-35.27-.372-.656-.977-1.946-1.346-2.869-3.758-9.402-1.686-20.174 5.285-27.485 3.328-3.49 7.446-5.972 11.925-7.187 6.435-1.747 12.983-1.067 18.862 1.957 5.06 2.603 8.968 6.597 11.466 11.723 1.957 4.013 2.724 7.657 2.58 12.262-.123 3.985-.905 7.14-2.628 10.61-.478.961-4.986 8.126-11.946 18.98C55.23 75.052 50.153 82.949 50.1 83.01c-.055.061-.219-.06-.365-.268zm3.586-37.314c2.893-.944 5.176-2.908 6.497-5.587 2.67-5.414.45-11.97-4.954-14.629-1.6-.787-2.505-1.014-4.375-1.096-3.301-.144-6.069.946-8.318 3.275-2.13 2.206-3.084 4.589-3.08 7.692.006 5.385 3.723 9.707 9.267 10.777.185.036 1.09.047 2.012.025 1.446-.035 1.853-.098 2.951-.457z"
    />
    <path
      style={{
        fill: "#d38d5f",
        strokeWidth: 0.134139,
      }}
      d="M46.748 90.864C40.4 90.139 35.246 87.44 34.2 84.29c-.315-.948-.215-2.242.242-3.143.968-1.907 3.453-3.686 6.614-4.736 2.095-.697 1.528-1.177 5.004 4.236 1.67 2.6 3.14 4.848 3.268 4.997.295.343 1.053.363 1.34.037.114-.13 1.577-2.378 3.252-4.997a621.932 621.932 0 0 1 3.092-4.809c.025-.026.669.146 1.43.38 3.563 1.102 6.084 2.845 7.101 4.91.875 1.778.536 3.446-1.048 5.157-2.092 2.26-6.164 3.924-10.983 4.488-1.848.216-5.11.242-6.764.053z"
    />
    <path
      style={{
        fill: "#d38d5f",
        strokeWidth: 0.0442196,
      }}
      d="M48.42 90.978a22.32 22.32 0 0 1-2.653-.245c-3.676-.543-6.958-1.761-9.131-3.389-.548-.41-1.308-1.152-1.664-1.624-.37-.49-.74-1.238-.864-1.747-.134-.546-.134-1.437-.001-1.931.378-1.403 1.49-2.738 3.214-3.864a16.105 16.105 0 0 1 2.786-1.425c.708-.275 2.16-.762 2.276-.762.061 0 .221-.03.355-.066.134-.035.249-.05.255-.031.006.018.312.49.68 1.05a255.09 255.09 0 0 1 1.532 2.364 470.143 470.143 0 0 0 3.395 5.245c.693 1.05.78 1.163.957 1.249.252.122.648.125.905.009.233-.106.222-.09 4.293-6.437a289.79 289.79 0 0 1 2.238-3.46c.044-.045.168-.025.627.1 4.654 1.268 7.752 3.589 8.314 6.226.102.48.084 1.224-.042 1.716-.64 2.503-3.765 4.804-8.215 6.047-2.851.796-5.876 1.115-9.257.975z"
    />
    <path
      style={{
        fill: "#fff",
        strokeWidth: 0.0442196,
      }}
      d="M49.172 43.972a9.354 9.354 0 0 1-2.697-.682c-2.91-1.241-4.93-3.874-5.396-7.03-.095-.646-.095-1.874 0-2.52.467-3.16 2.483-5.785 5.4-7.032a9.03 9.03 0 0 1 6.395-.243 8.984 8.984 0 0 1 6.068 7.475c.498 4.28-2.054 8.281-6.13 9.613-1.203.393-2.476.54-3.64.42z"
    />
  </svg>
);

export default SvgMapMark;