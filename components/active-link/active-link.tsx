import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { Children } from 'react';

type Props = LinkProps & {
  activeClassName: string;
  children: React.ReactNode;
};

export const ActiveLink: React.FC<Props> = ({ children, activeClassName, ...props }) => {
  const { asPath } = useRouter();
  const child = Children.only(children) as any;
  const childClassName = child.props.className || '';

  const className =
    asPath === props.href || asPath === props.as || (asPath.startsWith(`${props.href}`) && props.href !== '/') //nested route check
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link {...props} passHref>
      <a>
        {React.cloneElement(child, {
          className: className || null,
        })}
      </a>
    </Link>
  );
};
