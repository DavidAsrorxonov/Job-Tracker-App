import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

const DatePickerField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: Date;
  onChange: (d: Date | undefined) => void;
}) => {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            size={"sm"}
            className={cn(
              "w-full justify-start text-sm font-normal",
              !value && "text-muted-foreground",
            )}
          >
            <CalendarDays className="mr-2 h-3.5 w-3.5" />
            {value ? format(value, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerField;
