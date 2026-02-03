import React from "react";

interface SpotlightFooterProps {
  className?: string;
  fill?: string;
}

const SpotlightFooter: React.FC<SpotlightFooterProps> = ({
  className = "",
  fill = "#ffffff",
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <radialGradient
          id="spotlight-gradient"
          cx="50%"
          cy="100%"
          r="80%"
          fx="50%"
          fy="100%"
        >
          <stop offset="0%" stopColor={fill} stopOpacity="0.8" />
          <stop offset="40%" stopColor={fill} stopOpacity="0.4" />
          <stop offset="70%" stopColor={fill} stopOpacity="0.1" />
          <stop offset="100%" stopColor={fill} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Main spotlight ellipse emanating from bottom */}
      <ellipse
        cx="600"
        cy="400"
        rx="800"
        ry="400"
        fill="url(#spotlight-gradient)"
      />
    </svg>
  );
};

export default SpotlightFooter;
