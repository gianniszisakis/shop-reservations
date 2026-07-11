export default function InfoCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-pink-50 p-4">
      <div className="mb-2 flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wide">
          {title}
        </span>
      </div>

      <p className="text-base font-medium">{value}</p>
    </div>
  );
}
