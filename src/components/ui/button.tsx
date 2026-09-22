import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-bg-base hover:bg-accent-soft active:scale-[0.98] shadow-[0_0_0_1px_rgba(232,197,71,0.2)] hover:shadow-accent-glow",
        secondary:
          "bg-bg-elevated text-text-primary border border-border-subtle hover:border-border-strong hover:bg-bg-surface",
        ghost:
          "text-text-secondary hover:text-text-primary hover:bg-bg-surface",
        outline:
          "border border-border-subtle text-text-primary hover:border-accent hover:text-accent",
        link:
          "text-accent hover:text-accent-soft underline-offset-4 hover:underline px-0 h-auto",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-base",
        icon: "h-10 w-10 p-0",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonOwnProps = VariantProps<typeof buttonVariants>;

export type ButtonProps =
  | ({
      asChild?: false;
      children?: ReactNode;
    } & ButtonHTMLAttributes<HTMLButtonElement> &
      ButtonOwnProps)
  | ({
      asChild: true;
      href: string;
      target?: string;
      rel?: string;
      children: ReactNode;
      onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
      className?: string;
      type?: never;
    } & ButtonOwnProps);

/**
 * Polymorphic button. Renders a Next.js <Link> when asChild is true, otherwise
 * a real <button>. Children are required for asChild and passed as content.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className } = props;
    if (props.asChild) {
      const { variant, size, fullWidth, href, target, rel, children } = props;
      const cls = cn(buttonVariants({ variant, size, fullWidth, className }));
      const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
      if (isExternal) {
        return (
          <a href={href} target={target} rel={rel} className={cls}>
            {children}
          </a>
        );
      }
      return (
        <Link href={href} target={target} rel={rel} className={cls}>
          {children}
        </Link>
      );
    }

    const { variant, size, fullWidth, type = "button", children, ...rest } = props;
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };