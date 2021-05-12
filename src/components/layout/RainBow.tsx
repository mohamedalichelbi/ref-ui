import React from 'react';

export default function RainBow({
  className,
}: {
  className: string;
}) {
  return (
    <svg className={className} width="60px" height="38px" viewBox="0 0 60 38" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="board" transform="translate(-812.000000, -766.000000)">
          <g id="group" transform="translate(812.000000, 766.000000)">
            <rect id="rect" fill="#8FCDFF" x="21" y="0" width="8" height="8"></rect>
            <rect id="rect-copy" fill="#0072CD" x="21" y="9" width="8" height="8"></rect>
            <rect id="rect-copy-2" fill="#35DBF3" x="12" y="9" width="9" height="8"></rect>
            <rect id="rect-copy-3" fill="#01BF8A" x="12" y="17" width="9" height="8"></rect>
            <rect id="rect-copy-4" fill="#F1EE83" x="0" y="14" width="8" height="8"></rect>
            <rect id="rect-copy-5" fill="#FEB258" x="4" y="26" width="9" height="8"></rect>
            <rect id="rect-copy-6" fill="#FF585D" x="15" y="30" width="9" height="8"></rect>
            <path d="M30,0.001 L29.861098,-0.000316196571 C46.3689131,-0.000316196571 59.7772396,13.3930764 60.0000051,30.0003769 L43.0503394,30.0003424 C42.8318477,22.8858954 37.0847227,17.1770269 29.9998022,17.1033883 L30,0.001 Z" id="rect" fill="#FFFFFF"></path>
          </g>
        </g>
      </g>
    </svg>
  );
}
