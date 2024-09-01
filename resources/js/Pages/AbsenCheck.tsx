import { Button } from "@/Components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { cn } from "@/lib/utils";
import { id } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Calendar } from "@/Components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { ConfirmDelete } from "./Absen";
import { PageProps } from "@/types";
import { router } from "@inertiajs/react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/Components/ui/drawer";
import { Input } from "@/Components/ui/input";

export default function AbsenCheck({absen} : PageProps<{absen: Absen[]}>) {
    
    const [startDate, setStartDate] = useState<Date|undefined>(new Date());
    const [endDate, setEndDate] = useState<Date|undefined>(new Date());
    const [totals, setTotals] = useState({ hadir: 0, ijin: 0, sakit: 0, alpa: 0 });
    const [userTotals, setUserTotals] = useState<{ id : number, gender : string, name: string, hadir: number, ijin: number, sakit: number, alpa: number, total_tidak_hadir:number }[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const start = params.get('start_date');
        const end = params.get('end_date');

        if (start) {
            setStartDate(new Date(start));
        }
        if (end) {
            setEndDate(new Date(end));
        }
        calculateTotals();
        calculateUserTotals();
    }, []);

    useEffect(() => {
        calculateTotals();
        calculateUserTotals();
    }, [absen]);



    const handleStartDateSelect = (selectedDate:any) => {
        const localDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
        setStartDate(localDate);
    };
    const handleEndDateSelect = (selectedDate: any) => {
        const localDate = new Date(
            selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
        );
        setEndDate(localDate);
    };

    const handleAbsen = () => {
        const formatDate = (date: Date) => date.toISOString().split('T')[0];

        router.get(route('absen.check', {
            start_date: startDate ? formatDate(startDate) : undefined,
            end_date: endDate ? formatDate(endDate) : undefined,
        }));
    }

    const calculateTotals = () => {
        const totals = { hadir: 0, ijin: 0, sakit: 0, alpa: 0 };
        absen.forEach(a => {
            if (a.status === "HADIR") totals.hadir++;
            if (a.status === "IJIN") totals.ijin++;
            if (a.status === "SAKIT") totals.sakit++;
            if (a.status === "ALPA") totals.alpa++;
        });
        setTotals(totals);
    };

    const calculateUserTotals = () => {
        const totalsMap = new Map<number, { name: string, gender : string, hadir: number, ijin: number, sakit: number, alpa: number, total_tidak_hadir : number }>();

        absen.forEach(a => {
            const key = a.user.id; // Use user id as key
            const gender = a.user.gender ?? "";
            if (!totalsMap.has(key)) {
                totalsMap.set(key, { name: a.user.name, gender, hadir: 0, ijin: 0, sakit: 0, alpa: 0, total_tidak_hadir:0 });
            }
            const userTotals = totalsMap.get(key)!;
            if (a.status === "HADIR") userTotals.hadir++;
            if (a.status === "IJIN") userTotals.ijin++;
            if (a.status === "SAKIT") userTotals.sakit++;
            if (a.status === "ALPA") userTotals.alpa++;
            userTotals.total_tidak_hadir = userTotals.ijin + userTotals.sakit + userTotals.alpa;
        });

        const formattedTotals = Array.from(totalsMap.entries()).map(([id, totals]) => ({
            id, 
            ...totals
        })).sort((a,b) => a.total_tidak_hadir - b.total_tidak_hadir);

        setUserTotals(formattedTotals);
    };

    const filteredUserTotals = absen.filter(a =>
        a.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="p-4 text-center bg-yellow-500">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-auto me-1 justify-start shadow-lg bg-yellow-300 text-left font-normal",
                                !startDate && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? (
                                format(startDate, "dd MMMM yyyy", {
                                    locale: id,
                                })
                            ) : (
                                <span>Pick a startDate</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={handleStartDateSelect}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                <span className="mx-5 hidden md:block font-bold text-white shadow-lg">
                    Sampai
                </span>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-auto ms-1 justify-start bg-yellow-300 shadow-lgtext-left font-normal",
                                !endDate && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? (
                                format(endDate, "dd MMMM yyyy", {
                                    locale: id,
                                })
                            ) : (
                                <span>Pick a endDate</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={handleEndDateSelect}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <Button onClick={handleAbsen} className="w-full rounded-none">
                DAPATKAN ABSEN
            </Button>

            <div className="mt-4 md:container">
                <div className="container">
                    <Input type="text" placeholder="Pencarian Nama.." onKeyUp={e => setSearchTerm(e.currentTarget.value)}/>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tanggal</TableHead>
                            <TableHead>Nama Guru</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUserTotals.map((a, k) => (
                            <TableRow
                                className={k % 2 === 1 ? "bg-accent" : ""}
                                key={k}
                            >
                                <TableCell>{a.tanggal}</TableCell>
                                <TableCell>{a.user.name}</TableCell>
                                <TableCell>
                                    ({a.status})
                                {
                                    a.user.name == 'HADIR SEMUA' && a.status == 'HADIR' && (
                                        <>
                                            {
                                                a.user.gender == 'L' && (
                                                    "Guru Laki-Laki Hadir semua"
                                                )  
                                            }

                                            {
                                                a.user.gender == 'P' && (
                                                    "Guru Perempuan Hadir semua"
                                                )  
                                            }
                                        </>
                                    )
                                }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="fixed bottom-3 right-3">
                <Button className="mx-2" onClick={() => exportToExcel(filteredUserTotals)}>Export to CSV</Button>
                <Drawer>
                    <DrawerTrigger><Button> Analisis </Button></DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Analisis Absen Pada Tanggal {startDate?.toISOString().split('T')[0]} sampai {endDate?.toISOString().split('T')[0]} </DrawerTitle>
                            <DrawerDescription>
                                This action cannot be undone.
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="px-5 h-[70vh] overflow-auto">
                            <div className="font-bold">
                                TOTAL STATUS
                                
                                </div>
                            <div className="">HADIR : <span className="font-extrabold">{totals.hadir}</span></div>
                            <div className="">SAKIT :
                                <span className="font-extrabold">{totals.sakit}</span>
                            </div>
                            <div className="">IJIN :
                            <span className="font-extrabold">{totals.ijin}</span>
                            </div>
                            <div className="">ALPA :
                            <span className="font-extrabold">{totals.alpa}</span>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>NAMA</TableHead>
                                        <TableHead>HADIR</TableHead>
                                        <TableHead>IJIN</TableHead>
                                        <TableHead>SAKIT</TableHead>
                                        <TableHead>ALPA</TableHead>
                                        <TableHead>TOTAL TIDAK HADIR</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        userTotals.map((e,y) => (
                                            <TableRow key={y}>
                                                <TableCell>{e.id}</TableCell>
                                                <TableCell>
                                                    {e.name} 
                                                    {
                                                        e.name == "HADIR SEMUA" && (
                                                            <>
                                                                {
                                                                    e.gender == "L" && "Laki-laki"
                                                                }
                                                                {
                                                                    e.gender == "L" && "Perempuan"
                                                                }
                                                            </>
                                                        )
                                                    }

                                                </TableCell>
                                                <TableCell>{e.hadir}</TableCell>
                                                <TableCell>{e.ijin}</TableCell>
                                                <TableCell>{e.sakit}</TableCell>
                                                <TableCell>{e.alpa}</TableCell>
                                                <TableCell>{e.total_tidak_hadir}</TableCell>
                                            </TableRow>

                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </div>
                        <DrawerFooter>
                            <DrawerClose>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    );
}


export const exportToExcel = (dataArray: Array<Record<string, any>>) => {
    if (dataArray.length === 0) return;

    // Membuat header CSV
    const headers = Object.keys(dataArray[0]).join(",") + "\n";

    // Membuat baris data CSV
    const rows = dataArray.map(row => Object.values(row).join(",")).join("\n");

    // Menggabungkan header dan baris data
    const csvContent = headers + rows;

    // Membuat Blob dari konten CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Membuat link untuk mengunduh file
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "data.csv");

    // Menambahkan link ke dokumen dan mengkliknya untuk mengunduh file
    document.body.appendChild(link);
    link.click();

    // Membersihkan
    document.body.removeChild(link);
};