import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/Components/ui/alert-dialog";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import { Card, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Textarea } from "@/Components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/Components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { router } from "@inertiajs/react";
import { format } from "date-fns";
import { id } from 'date-fns/locale';
import { CalendarIcon, PowerCircle, Trash2 } from "lucide-react";
import { useState } from "react";

export default function Absen({users, absen} : PageProps<{users:User[], absen:Absen[]}>) {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [piket, setPiket] = useState<number|null>(null);
    const [guru, setGuru] = useState<number|null>(null);
    const [status, setStatus] = useState<string|null>(null);
    const [jamDinas, setJamDinas] = useState<number|null>(null);
    const [keterangan, setKeterangan] = useState<string|null>(null);
    const [prosess, setProsess] = useState<boolean>(false);

    const handleDateSelect = (selectedDate:any) => {
        const localDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
        setDate(localDate);
    };
    const handleSubmit = () => {
        setProsess(true);
        if(!(date && piket && guru && status)) {
            setProsess(false);
            return alert("Pastikan Guru Piket, guru yang tidak masuk, dan status gurunya di isi");
        }
        const isoDate = date.toISOString();
            const mysqlDate = isoDate.slice(0, 19).replace('T', ' ');
            const send = {
                piket_id : piket,
                user_id : guru,
                status,
                tanggal : mysqlDate,
                jam_dinas : jamDinas,
                keterangan
            };
            // return console.log(send);
        router.post(route('absen.post'), send);

        setProsess(false);
    }



    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex sm:flex-row flex-col gap-4 items-center mx-auto">
                        <PowerCircle className="lg:w-72 lg:h-72 md:w-56 md:h-56 sm:w-40 sm:h-40 w-24 h-24 text-blue-800"></PowerCircle>
                        <div className="w-full">
                            <div className="flex gap-2 mb-5"></div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
                                ABSEN DIGITAL
                            </h2>
                        </div>
                    </div>
                </CardHeader>
            </Card>
            <div className="container mt-5 ">
                <div className="grid grid-cols-2 items-end gap-3">
                    <Select onValueChange={e => setPiket(Number(e))}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Guru Piket" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Pilih Guru Piket</SelectLabel>
                                {users.map((e, k) => (
                                    <SelectItem key={k} value={String(e.id)}>
                                        {e.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className="mt-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-auto justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? (
                                        format(date, "dd MMMM yyyy", { locale: id })
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={handleDateSelect}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <hr className="mt-5"></hr>
                <div className="text-3xl mt-5 font-bold">
                    Pilih Guru Yang tidak masuk
                </div>
                <div className="flex gap-3 mt-5">
                    <Select onValueChange={e => setGuru(Number(e))}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Guru" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Pilih Guru</SelectLabel>
                                {users.map((e, k) => (
                                    <SelectItem key={k} value={String(e.id)}>
                                        {e.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <ToggleGroup onValueChange={e => setStatus(e)} variant={"outline"} type="single">
                        <ToggleGroupItem value="SAKIT">SAKIT</ToggleGroupItem>
                        <ToggleGroupItem value="IJIN">IJIN</ToggleGroupItem>
                        <ToggleGroupItem value="ALPA">ALPA</ToggleGroupItem>
                    </ToggleGroup>
                </div>
                {
                    status === "IJIN" && (
                        <Input type="number" className="mt-3" onChange={e => setJamDinas(Number(e.currentTarget.value))} placeholder="JUMLAH JAM IJIN"></Input>
                    )
                }
                <Textarea onKeyUp={e => setKeterangan(e.currentTarget.value)}
                    className="mt-3"
                    placeholder="Tambahkan Keterangan lain, seperti tugas, dan alasan tidak masuk (jika ada)"
                ></Textarea>
                <Button onClick={handleSubmit} className={"mt-2 w-full"} disabled={prosess}>SIMPAN</Button>
            </div>

            <div className="mt-4">
                <div className="container">
                    <h2 className="text-xl font-bold">Data Guru yang tidak hadir hari ini :</h2>
                </div>
                <div className="md:container">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Nama Guru</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                absen.map((a, k) => (
                                    <TableRow className={k%2 === 1 ? "bg-accent" : ""} key={k}>
                                        <TableCell>{a.tanggal}</TableCell>
                                        <TableCell>{a.user.name}</TableCell>
                                        <TableCell>{a.status}</TableCell>
                                        <TableCell>
                                            <ConfirmDelete data={a}/>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="bg-slate-200 p-10 flex justify-center mt-20">
                    <div className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Digital Absens</div>
            </div>
        </>
    );
}

export const ConfirmDelete = ({data} : {data:Absen}) => {
    const [sandi, setSandi] = useState<string|null>(null)
    const [msg, setMsg] = useState<string|null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const handleHapus = () => {
        if(!sandi) {
            setMsg("Pastikan Di isi");
            setTimeout(() => {
                setMsg(null);
            }, 3000);
            return;
        }
        if(sandi !== "msupel1994") {
            setMsg("Sandi yang anda masukkan salah");
            setTimeout(() => {
                setMsg(null);
            }, 3000);
            return;
        };
        router.post(route('absen.delete', data.id), {
            id : data.id
        })
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger><Trash2 className="w-5 h-5 text-red-500"/></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Apa Kamu yakin ingin hapus absen dari {data.user.name} ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Pastikan Anda faham Apa yang dilakukan, absen akan di hapus. jika ingin di perbaiki, anda bisa menambahkannya kembali, dengan klik tombol <Badge>Setuju Hapus</Badge> anda sudah menyetujui konsekuensi tersebut

                        <Input className="mt-5" type="text" onChange={e => setSandi(e.currentTarget.value)} placeholder="Ketikkan sandi Absen"/>
                        {
                            msg && (
                                <div className="text-sm text-red-500">
                                    {msg}
                                </div>
                            )
                        }
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleHapus}>Setuju Hapus</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}