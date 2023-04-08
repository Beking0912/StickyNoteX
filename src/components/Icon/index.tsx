import React, { HTMLAttributes } from "react";
import iconList from "../../constants/iconList";

interface IconProps extends HTMLAttributes<SVGElement> {
  iconName: keyof typeof iconList;
}

const Icon: React.FC<IconProps> = ({ iconName, className, ...rest }) => {
  const [width, height, path] = iconList[iconName];
  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      dangerouslySetInnerHTML={{ __html: path as string }}
    ></svg>
  );
};

export default Icon;
