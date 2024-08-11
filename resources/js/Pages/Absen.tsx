import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/Components/ui/alert-dialog";
import { Badge } from "@/Components/ui/badge";
import { Button, buttonVariants } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import { Card, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Toaster } from "@/Components/ui/sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Textarea } from "@/Components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/Components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { format } from "date-fns";
import { id } from 'date-fns/locale';
import { CalendarIcon, PowerCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const oauthSignIn = (client_id : string, redirect_uri : string) => {
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Parameters to pass to OAuth 2.0 endpoint.
    const params: { [key: string]: string } = {
      client_id: client_id,
      redirect_uri: redirect_uri,
      response_type: 'token',
      scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
      include_granted_scopes: 'true',
      state: 'pass-through value'
    };

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    const form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2Endpoint);

    // Add form parameters as hidden input values.
    for (const p in params) {
      if (params.hasOwnProperty(p)) {
        const input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
      }
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  };

export default function Absen({userpiket, users, absen, flash, authID, google_client_id, google_redirect_uri} : PageProps<{ authID? : number|null; google_client_id? : string, google_redirect_uri? : string, flash : {message : any}, users:User[], absen:Absen[], userpiket : User[]}>) {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [piket, setPiket] = useState<number|null>(null);
    const [guru, setGuru] = useState<number|null>(null);
    const [status, setStatus] = useState<string|null>(null);
    const [jamDinas, setJamDinas] = useState<number|null>(null);
    const [keterangan, setKeterangan] = useState<string|null>(null);
    const [prosess, setProsess] = useState<boolean>(false);
    const [piketUser, setPiketUser] = useState<User[]|null>(null);


    const loginWithGoogle = () => {
        if(google_client_id && google_redirect_uri) {
            oauthSignIn(google_client_id, google_redirect_uri);
        }
    }
    useEffect(() => {
        const y = users.filter(Obj => {
            const h = Obj.histories.filter(j => ["Kepala Sekolah", "Operator", "Bendahara", "Guru Piket"].includes(j.jabatan)).map(j => j.jabatan);
            return h;        
        });
        // console.log(authID, y, users);
        console.log(userpiket);
        console.log(y);
        setPiketUser(y);
    }, [])



    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const start = params.get('date')
        if(start) {
            setDate(new Date(start));
        }

        if(flash) {
            console.log(flash);
        }

    }, [])

    const handleDateSelect = (selectedDate:any) => {
        const localDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
        // Format tanggal menjadi string ISO (YYYY-MM-DD)
        const formattedDate = localDate.toISOString().split('T')[0];

        // Update URL dan reload halaman
        window.location.search = `?date=${formattedDate}`;

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
    
    const Toast = (message : string) => {
        toast(message);
    }



    return (
        <>
        <Head
        >
            <title>Digital Absen MTs Sunan Ampel Kraton</title>
            <meta name="description" content="Absen digital salah satu bentuk keseriusan untuk mentertibkan kehadiran pada tenaga pendidik"/>
        </Head>
        {/* {
            !authID && (
                <div className="fixed flex items-center justify-center w-full h-screen bg-white/30 backdrop-blur-sm">
                    <div className="container">
                        <h2 className="text-3xl">Anda Belum Login</h2>
                        <Button onClick={loginWithGoogle}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="w-5 h-5 me-3"></img>
                         Login With Google
                        
                        </Button>
                    </div>
                </div>
            ) 
        } */}
        <Toaster/>
            <Card>
                <CardHeader>
                    <div className="flex sm:flex-row flex-col gap-2 md:gap-4 items-center mx-auto">
                        <Link href={route('absen.check')}>
                            <PowerCircle className="lg:w-72 lg:h-72 md:w-56 md:h-56 sm:w-40 sm:h-40 w-24 h-24 text-blue-800"></PowerCircle>
                        </Link>
                        <div className="w-full">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
                                ABSEN DIGITAL
                            </h2>
                        </div>
                    </div>
                    {flash.message && Toast(flash.message)}
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
                                {userpiket && Array.isArray(userpiket) && userpiket.map((e, k) => (
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
                    Pilih Guru 
                </div>
                <div className="flex gap-3 mt-5">
                    <Select onValueChange={e => setGuru(Number(e))}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Guru" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Pilih Guru Laki-Laki</SelectLabel>
                                {users.filter(e => e.gender == "L").sort((a,b) => {
                                    if (a.name === "HADIR SEMUA") return -1;
                                    if (b.name === "HADIR SEMUA") return 1;
                                    return a.name < b.name ? -1 : 1;
                                }).map((e, k) => (
                                    <SelectItem key={k} value={String(e.id)}>
                                        {e.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel>Pilih Guru Perempuan</SelectLabel>

                                {users.filter(e => e.gender == "P").sort((a,b) => {
                                    if (a.name === "HADIR SEMUA") return -1;
                                    if (b.name === "HADIR SEMUA") return 1;
                                    return a.name < b.name ? -1 : 1;
                                }).map((e, k) => (
                                    <SelectItem key={k} value={String(e.id)}>
                                        {e.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <ToggleGroup onValueChange={e => setStatus(e)} variant={"outline"} type="single">
                    {
                        guru && users[users.findIndex(e => e.id === Number(guru))].name === "HADIR SEMUA" && (
                            <ToggleGroupItem className="data-[state='on']:!bg-lime-500 data-[state='on']:!text-white" value="HADIR">HADIR</ToggleGroupItem>
                        )
                    }
                    <ToggleGroupItem className="data-[state='on']:!bg-blue-500 data-[state='on']:!text-white" value="SAKIT">SAKIT</ToggleGroupItem>
                        <ToggleGroupItem className="data-[state='on']:!bg-yellow-500 data-[state='on']:!text-white" value="IJIN">IJIN</ToggleGroupItem>
                        <ToggleGroupItem className="data-[state='on']:!bg-red-500 data-[state='on']:!text-white" value="ALPA">ALPA</ToggleGroupItem>
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
                                            {
                                                a.user.name === "HADIR SEMUA" ? a.user.gender === "L" ? "Guru Putra" : "Guru Putri" : ""
                                            }
                                            <div>
                                            { a.keterangan }
                                            </div>

                                            {/* { piketUser && piketUser?.length > 0 && piketUser[0].histories.find(h => ["Operator", "Kepala Sekolah", "Bendahara", "administrator"].includes(h.jabatan)) && (
                                                <ConfirmDelete date={date ?? new Date()} data={a}/>
                                            )} */}
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

export const ConfirmDelete = ({date, data} : {date:Date,data:Absen}) => {
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
        const formattedDate = date.toISOString().split('T')[0];
        router.post(route('absen.delete', {id : data.id, date : formattedDate}), {
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