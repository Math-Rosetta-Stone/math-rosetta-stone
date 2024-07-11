import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface BlankInputProps {
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant: "unsubmitted" | "submitted";
}

export const BlankInput = ({
  value,
  placeholder,
  onChange,
  variant,
}: BlankInputProps) => {
  return (
    <Input
      className={cn("inline mx-1.5 p-0 pt-1 w-24 h-auto disabled:opacity-100\
      border-t-0 border-x-0 border-b-2 border-b-slate-900 rounded-none rounded-t-md\
      text-center text-base font-normal",
      (variant === "unsubmitted") && "ease-in-out duration-200 transition-fib\
      hover:bg-slate-100 focus-visible:bg-slate-100\
      focus-visible:px-2\
      focus-visible:ring-transparent focus-visible:ring-offset-0",
    )}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={variant === "submitted"}
    />
  );
};