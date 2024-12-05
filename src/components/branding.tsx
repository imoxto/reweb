import { Globe } from "lucide-react";

export default function Icon(props: React.ComponentProps<typeof Globe>) {
  return <Globe className="w-6 h-6" {...props} />;
}

export function Banner() {
  return (
    <div className="flex items-center gap-2">
      <Icon />
      <h1 className="text-2xl font-bold">ReWEB</h1>
    </div>
  );
}
