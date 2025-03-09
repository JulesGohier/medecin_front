"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {fr} from "date-fns/locale";

export function DatePicker({ onDateChange, className }: { onDateChange: (date: Date | undefined) => void, className: string }) {
    const [date, setDate] = React.useState<Date>()
    const [option,setOption] = React.useState("0")
    const handleDateChange = (newDate: Date | undefined) => {
        setDate(newDate)
        onDateChange(newDate)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon />
                    {date ? format(date, "d MMMM yyyy", { locale: fr }) : <span>Selectioner une date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                side="top"
                align="end"
                className="w-auto flex flex-col space-y-2 p-2 z-[60] pointer-events-auto"
            >
                <Select
                    value={option}
                    onValueChange={(value) => {
                        setDate(addDays(new Date(), parseInt(value)))
                        setOption(value);
                        onDateChange(addDays(new Date(), parseInt(value)))
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper" className={"z-[60]"}>
                        <SelectItem value="0">Aujourd'hui</SelectItem>
                        <SelectItem value="1">Demain</SelectItem>
                        <SelectItem value="3">Dans 3 jours</SelectItem>
                        <SelectItem value="7">Dans une semaine</SelectItem>
                    </SelectContent>
                </Select>
                <div className="rounded-md border">
                    <Calendar mode="single" selected={date} onSelect={handleDateChange} />
                </div>
            </PopoverContent>
        </Popover>
    )
}