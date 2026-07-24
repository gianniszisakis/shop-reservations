interface LoginHeadingProps {
  heading: string;
  subheading: string;
}

export default function LoginHeading({
  heading,
  subheading,
}: LoginHeadingProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
        {heading}
      </h2>
      <p className="mt-1 text-sm text-zinc-600">{subheading}</p>
    </div>
  );
}
