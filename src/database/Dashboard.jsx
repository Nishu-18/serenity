import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Chart from '@/components/costum/Chart'

const invoices = [
    {
        invoice: "Akshat",
        date: "14",
        text: "I am feeling vary happy",
        mood: "positive",
    },
    {
        invoice: "Akshat",
        date: "14",
        text: "I have an argument with my boss today, and now i am annoyed",
        mood: "frustrated",
    },
    {
        invoice: "Akshat",
        date: "14",
        text: "i am feeling a bit exhausted",
        mood: "low",
    },
    {
        invoice: "Akshat",
        date: "14",
        text: "I am having a treat today",
        mood: "happy",
    },
]

function Dashboard() {

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        (user)

            ?

            <div className='pt-20 px-18 font-baloo'>
                <Table>
                    <TableCaption>A list of your recent conversation.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Mood</TableHead>
                            <TableHead className="text-right">Text</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.invoice}>
                                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                <TableCell>{invoice.date}</TableCell>
                                <TableCell>{invoice.mood}</TableCell>
                                <TableCell className="text-right">{invoice.text}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Chart className='mt-20' />
            </div>

            :

            <div className='h-screen w-full flex items-center justify-center text-xl font-baloo'>
                You donot have any chat data yet
            </div>

    )
}

export default Dashboard