import { FC } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

export type TRouteLinkProps = {
  className?: string;
} & NavLinkProps;

export const RouteLink: FC<TRouteLinkProps> = ({ to, className, children }) => {
  return (
    <NavLink
      end
      caseSensitive
      to={to}
      className={className}
      data-testid={`route-link-${typeof to === "string" ? to : to.pathname}`}
    >
      {({ isActive, isPending, isTransitioning }) =>
        typeof children === "function" ? children({ isActive, isPending, isTransitioning }) : children
      }
    </NavLink>
  );
};
