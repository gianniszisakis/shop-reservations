import Image from "next/image";

interface HeaderAvatarProps {
  src: string;
  alt: string;
}

export default function HeaderAvatar({ src, alt }: HeaderAvatarProps) {
  return (
    <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-background bg-white shadow-xl">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="160px"
        priority
      />
    </div>
  );
}
