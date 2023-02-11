import React, { ReactNode } from "react";
interface SidebarMenuItemsProps {
  Icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  >;
  text: string;
  active: boolean;
}
const SidebarMenuItem = ({ Icon, text, active }: SidebarMenuItemsProps) => {
  return (
    <div className="hoverEffect flex items-center text-gray-700 justify-center xl:justify-start text-lg space-x-3">
      <Icon className="h-7 w-auto" />
      <span className={`${active && "font-bold"} capitalize hidden xl:inline`}>
        {text}
      </span>
    </div>
  );
};

export default SidebarMenuItem;
