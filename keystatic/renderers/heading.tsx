import slugify from "@sindresorhus/slugify";

import { cn } from "@/lib/cn";

type NativeHeadingProps = React.HTMLAttributes<HTMLHeadingElement>;

type HeadingProps = NativeHeadingProps & {
  isAnchor?: boolean;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  textAlign?: "center" | "end";
};

function getAlignmentClass(textAlign: HeadingProps["textAlign"]) {
  switch (textAlign) {
    case "center":
      return "text-center";
    case "end":
      return "text-end";
    default:
      return "";
  }
}

export function Heading({
  children,
  className,
  isAnchor,
  level,
  textAlign,
  ...consumerProps
}: HeadingProps) {
  const Tag = `h${level}` as const;

  const alignmentClass = getAlignmentClass(textAlign);

  if (isAnchor) {
    const slug = getSlug(children);
    return (
      <a className="relative block no-underline" href={`#${slug}`} id={slug}>
        <Tag
          {...consumerProps}
          className={cn(alignmentClass, "[text-wrap:balance]", className)}
        >
          <span className="inline-flex items-center">
            <HashtagIcon className="absolute me-1 h-[0.75em] max-h-[1.25rem] w-[0.75em] max-w-[1.25rem] -translate-x-full text-gray-500" />
          </span>
          {children}
        </Tag>
      </a>
    );
  }

  return (
    <Tag
      {...consumerProps}
      className={cn(alignmentClass, "[text-wrap:balance]", className)}
    >
      {children}
    </Tag>
  );
}

function getSlug(node: React.ReactNode) {
  return slugify(getTextNode(node));
}

function getTextNode(node: React.ReactNode): string {
  if (!node) {
    return "";
  }

  if (typeof node === "string") {
    return node;
  }

  if (typeof node === "number") {
    return String(node);
  }

  if (
    typeof node === "object" &&
    "text" in node &&
    typeof node.text === "string"
  ) {
    return node.text;
  }

  if (node instanceof Array) {
    return node.map(getTextNode).join("");
  }

  if (typeof node === "object" && "props" in node && "node" in node.props) {
    return getTextNode(node.props.node);
  }

  return "";
}

function HashtagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      role="img"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
