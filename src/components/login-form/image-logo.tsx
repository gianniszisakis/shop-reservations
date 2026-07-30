import Image from "next/image";

interface ImageLogoProps {
  src: string;
  size: string;
  altText: string;
}

export default function ImageLogo({ src, altText, size }: ImageLogoProps) {
  return (
    <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
      <Image
        src={src}
        alt={altText}
        fill
        sizes={size}
        className="object-cover"
        priority
      />
    </div>
  );
}
