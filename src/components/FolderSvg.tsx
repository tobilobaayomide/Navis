function FolderSvg({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <linearGradient
        id="folder-base-gradient"
        gradientUnits="userSpaceOnUse"
        x1="-7.018"
        x2="39.387"
        y1="9.308"
        y2="33.533"
      >
        <stop offset="0" stopColor="#fac017" />
        <stop offset=".909" stopColor="#e1ab2d" />
      </linearGradient>
      <path
        d="M44.5,41h-41C2.119,41,1,39.881,1,38.5v-31C1,6.119,2.119,5,3.5,5h11.597c1.519,0,2.955,0.69,3.904,1.877L21.5,10h23c1.381,0,2.5,1.119,2.5,2.5v26C47,39.881,45.881,41,44.5,41z"
        fill="url(#folder-base-gradient)"
      />
      <linearGradient
        id="folder-sheet-gradient-1"
        gradientUnits="userSpaceOnUse"
        x1="5.851"
        x2="18.601"
        y1="9.254"
        y2="27.39"
      >
        <stop offset="0" stopColor="#fbfef3" />
        <stop offset=".909" stopColor="#e2e4e3" />
      </linearGradient>
      <path d="M2,25h20V11H4c-1.105,0-2,0.895-2,2V25z" fill="url(#folder-sheet-gradient-1)" />
      <linearGradient
        id="folder-sheet-gradient-2"
        gradientUnits="userSpaceOnUse"
        x1="2"
        x2="22"
        y1="19"
        y2="19"
      >
        <stop offset="0" stopColor="#fbfef3" />
        <stop offset=".909" stopColor="#e2e4e3" />
      </linearGradient>
      <path d="M2,26h20V12H4c-1.105,0-2,0.895-2,2V26z" fill="url(#folder-sheet-gradient-2)" />
      <linearGradient
        id="folder-bottom-gradient"
        gradientUnits="userSpaceOnUse"
        x1="16.865"
        x2="44.965"
        y1="39.287"
        y2="39.792"
      >
        <stop offset="0" stopColor="#e3a917" />
        <stop offset=".464" stopColor="#d79c1e" />
      </linearGradient>
      <path
        d="M1,37.875V38.5C1,39.881,2.119,41,3.5,41h41c1.381,0,2.5-1.119,2.5-2.5v-0.625H1z"
        fill="url(#folder-bottom-gradient)"
      />
      <radialGradient
        id="folder-face-gradient"
        cx="37.836"
        cy="49.317"
        gradientUnits="userSpaceOnUse"
        r="53.875"
      >
        <stop offset=".199" stopColor="#fec832" />
        <stop offset=".601" stopColor="#fcd667" />
        <stop offset=".68" stopColor="#fdda75" />
        <stop offset=".886" stopColor="#fee496" />
        <stop offset="1" stopColor="#ffe8a2" />
      </radialGradient>
      <path
        d="M44.5,40h-41C2.119,40,1,38.881,1,37.5v-21C1,15.119,2.119,14,3.5,14h13.256c1.382,0,2.733-0.409,3.883-1.176L21.875,12H44.5c1.381,0,2.5,1.119,2.5,2.5v23C47,38.881,45.881,40,44.5,40z"
        fill="url(#folder-face-gradient)"
      />
    </svg>
  );
}

export default FolderSvg;