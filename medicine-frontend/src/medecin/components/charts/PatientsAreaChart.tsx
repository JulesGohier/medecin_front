"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart.tsx"

const chartData = [
    { month: "Janvier", patients: 186 },
    { month: "Février", patients: 305 },
    { month: "Mars", patients: 237 },
    { month: "Avril", patients: 73 },
    { month: "Mai", patients: 209 },
    { month: "Juin", patients: 214 },
    { month: "Juillet", patients: 412 },
    { month: "Août", patients: 356 },
    { month: "Septembre", patients: 125 },
    { month: "Octobre", patients: 615 },
    { month: "Novembre", patients: 25 },
    { month: "Décembre", patients: 333 },
]

const chartConfig = {
    desktop: {
        label: "Patients",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

export const PatientsAreaChart = () => {
    return (
        <Card className="w-1/2 block mx-auto mr-0 md:mr-6 border-2 border-gray-200 max-h-[900px]">
            <CardHeader>
                <CardTitle>Statistiques Patients</CardTitle>
                <CardDescription>Janvier - Décembre 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="max-h-[700px] flex flex-col justify-center items-center w-full">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="patients" fill={chartConfig.desktop.color} radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
