const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#016238" stopOpacity={0.22} />
        <stop offset="100%" stopColor="#016238" stopOpacity={0} />
      </radialGradient>
      <linearGradient id="hexFace" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d7f5ea" />
        <stop offset="35%" stopColor="#02a56a" />
        <stop offset="100%" stopColor="#016238" />
      </linearGradient>
      <linearGradient id="hexFaceDark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7ce5b6" />
        <stop offset="40%" stopColor="#018a53" />
        <stop offset="100%" stopColor="#013a24" />
      </linearGradient>
      <linearGradient id="sideLeft" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#013a24" />
        <stop offset="100%" stopColor="#016238" />
      </linearGradient>
      <linearGradient id="sideRight" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#018a53" />
        <stop offset="100%" stopColor="#01482c" />
      </linearGradient>
      <linearGradient id="sideBottom" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#016238" />
        <stop offset="100%" stopColor="#012a19" />
      </linearGradient>
      <radialGradient id="spec" cx="30%" cy="25%" r="45%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity={0.55} />
        <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
      </radialGradient>
      <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7ce5b6" stopOpacity={0.9} />
        <stop offset="100%" stopColor="#016238" stopOpacity={0.25} />
      </linearGradient>
      <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow
          dx={0}
          dy={6}
          stdDeviation={8}
          floodColor="#016238"
          floodOpacity={0.55}
        />
      </filter>
    </defs>
    <ellipse cx={100} cy={105} rx={72} ry={66} fill="url(#bgGlow)" />
    <polygon
      points="72,71 86,79 86,89 72,81"
      fill="url(#sideLeft)"
      opacity={0.95}
    />
    <polygon
      points="128,71 114,79 114,89 128,81"
      fill="url(#sideRight)"
      opacity={0.95}
    />
    <polygon
      points="86,79 100,87 114,79 114,89 100,97 86,89"
      fill="url(#sideBottom)"
      opacity={0.9}
    />
    <polygon
      points="100,44 128,60 128,71 100,87 72,71 72,60"
      fill="url(#hexFace)"
      filter="url(#softShadow)"
    />
    <polygon
      points="100,44 128,60 128,71 100,87 72,71 72,60"
      fill="none"
      stroke="url(#rimGrad)"
      strokeWidth={1.2}
      opacity={0.8}
    />
    <polygon
      points="100,44 128,60 128,71 100,87 72,71 72,60"
      fill="url(#spec)"
    />
    <polygon
      points="48,99 62,107 62,117 48,109"
      fill="url(#sideLeft)"
      opacity={0.85}
    />
    <polygon
      points="104,99 90,107 90,117 104,109"
      fill="url(#sideRight)"
      opacity={0.85}
    />
    <polygon
      points="62,107 76,115 90,107 90,117 76,125 62,117"
      fill="url(#sideBottom)"
      opacity={0.85}
    />
    <polygon
      points="76,72 104,88 104,99 76,115 48,99 48,88"
      fill="url(#hexFaceDark)"
      filter="url(#softShadow)"
    />
    <polygon
      points="76,72 104,88 104,99 76,115 48,99 48,88"
      fill="none"
      stroke="url(#rimGrad)"
      strokeWidth={1}
      opacity={0.6}
    />
    <polygon
      points="76,72 104,88 104,99 76,115 48,99 48,88"
      fill="url(#spec)"
      opacity={0.6}
    />
    <polygon
      points="96,99 110,107 110,117 96,109"
      fill="url(#sideLeft)"
      opacity={0.85}
    />
    <polygon
      points="152,99 138,107 138,117 152,109"
      fill="url(#sideRight)"
      opacity={0.85}
    />
    <polygon
      points="110,107 124,115 138,107 138,117 124,125 110,117"
      fill="url(#sideBottom)"
      opacity={0.85}
    />
    <polygon
      points="124,72 152,88 152,99 124,115 96,99 96,88"
      fill="url(#hexFaceDark)"
      filter="url(#softShadow)"
    />
    <polygon
      points="124,72 152,88 152,99 124,115 96,99 96,88"
      fill="none"
      stroke="url(#rimGrad)"
      strokeWidth={1}
      opacity={0.6}
    />
    <polygon
      points="124,72 152,88 152,99 124,115 96,99 96,88"
      fill="url(#spec)"
      opacity={0.6}
    />
    <polygon
      points="100,44 128,60 128,71 100,87 72,71 72,60"
      fill="none"
      stroke="#02a56a"
      strokeWidth={0.6}
      opacity={0.5}
    />
    <line
      x1={50}
      y1={142}
      x2={150}
      y2={142}
      stroke="#016238"
      strokeWidth={1.1}
      opacity={0.5}
    />
  </svg>
);
export default SVGComponent;
