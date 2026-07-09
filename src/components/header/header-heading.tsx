interface HeaderHeadingProps {
  title: string;
}

export default function HeaderHeading({ title }: HeaderHeadingProps) {
  return (
    <h1 className="text-3xl font-bold tracking-tight md:text-5xl">{title}</h1>
  );
}
