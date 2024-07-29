import Checkbox from "@/Components/Checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/Components/ui/accordion";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/Components/ui/alert-dialog";
import { Button, buttonVariants } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/Components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import PanelLayout from "@/Layouts/PanelLayout";
import { PageProps } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from 'sonner'

export default function User({auth, setting, users} : PageProps<{auth : Auth, setting:Setting, users:User[]}>) {
    const isAdmin = auth.user.id === 1 || 
    auth.history.map(e => e.jabatan).includes('administrator') || 
    auth.history.map(e => e.jabatan).includes('Operator') ||
    auth.history.map(e => e.jabatan).includes('Kepala Sekolah');


    return(
        <PanelLayout>
            <Head title="Guru"/>
            <h2 className="text-4xl">Pegawai</h2>
            <Card className="mt-10">
                <CardHeader>
                    <CardTitle className="flex gap-2 items-center">
                        <div className="w-full">
                            Data Pegawai
                        </div>
                        { isAdmin && <CreateData setting={setting}/>   }
                    </CardTitle>
                    <CardDescription>Anda bisa set sesuai dengan tahun pelajaran</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>NID</TableHead>
                                <TableHead>NAMA</TableHead>
                                <TableHead className="w-40">Jabatan</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                users.map(e => (
                                    <TableRow className="bg-accent" key={e.id}>
                                        <TableCell>{e.id}</TableCell>
                                        <TableCell>{e.nid}</TableCell>
                                        <TableCell>{e.name}</TableCell>
                                        <TableCell>
                                            {
                                                e.histories.length > 0 ? (
                                                    <>
                                                        <Accordion type="single" collapsible className="w-full">
                                                        {
                                                            e.histories.map(t => (
                                                                <AccordionItem className="" key={t.id} value={"jabatan-"+ t.id}>
                                                                    <AccordionTrigger>{t.jabatan}</AccordionTrigger>
                                                                    <AccordionContent>
                                                                    {t.start_date} - {t.end_date ?? "Belum di perbarui"}
                                                                    </AccordionContent>
                                                                </AccordionItem>
                                                            ))
                                                        }
                                                        </Accordion>
                                                    </>
                                                ) : "Belum Menjabat"
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {isAdmin && <UpdateData e={e} setting={setting}/> }
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </PanelLayout>
    )
}

export function CreateData({setting}: {setting:Setting}) {
    const [nid, setNid] = useState<string|null>(null);
    const [name, setName] = useState<string|null>(null);
    const [email, setEmail] = useState<string|null>(null);
    const [password, setPassword] = useState<string|null>(null);
    const [passwordReply, setPasswordReply] = useState<string|null>(null);
    const [valid, setValid] = useState<boolean|null>(null);
    const handleUpdateGuru = () => {
        if(!(nid || name || email)) return toast("Pastikan Di isi dengan benar");
        if(password !== passwordReply) return toast("Kombinasi sandi tidak sama");
        if(!valid) return toast("Pastikan anda menyetujui kebijakan yang telah ada") 
        router.post(route('dashboard.user.create.post'), {
            nid,
            name,
            email,
            password,
            validation : valid
        });
    }
    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline">Tambah Pegawai</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Tambah pegawai</SheetTitle>
                        <SheetDescription>
                            Tambahkan Data Guru di tahun pelajaran {setting.id}/
                            {setting.id + 1}
                        </SheetDescription>
                    </SheetHeader>

                    <div className="mb-2 mt-5">
                        <Label htmlFor="nid">
                            Nomer Identitas (Bisa NUPTK, NPK, atau PegId)
                        </Label>
                        <Input
                            type="text"
                            onChange={(e) => setNid(e.target.value)}
                            id="nid"
                            placeholder="29423xxx"
                        />
                    </div>
                    <div className="mb-2">
                        <Label htmlFor="email">
                            E-Mail
                        </Label>
                        <Input
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            placeholder="xxxxx@gmail.com"
                        />
                    </div>
                    <div className="mb-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            placeholder="Pastikan Huruf besar"
                        />
                    </div>
                    <div className="mb-2">
                        <Label htmlFor="password">Sandi</Label>
                        <Input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            placeholder="Pastikan Huruf besar kecil dan angka"
                        />
                    </div>
                    <div className="mb-2">
                        <Label htmlFor="replypassword">Ulangi Sandi</Label>
                        <Input
                            type="password"
                            onChange={(e) => setPasswordReply(e.target.value)}
                            id="replypassword"
                            placeholder="Pastikan Huruf besar kecil dan angka"
                        />
                    </div>
                    <div className="flex gap-2 mb-5">
                        <Checkbox onChange={e => setValid(e.target.checked)} id="validate"></Checkbox>
                        <Label htmlFor="validate">Dengan Anda Mengklik ini, berarti anda sudah sadar dan faham tentang tata cara penggunaan dan aturan yang ada</Label>
                    </div>
                    <Button onClick={handleUpdateGuru}>Perbarui data</Button>
                    <hr className="my-5"></hr>
                </SheetContent>
            </Sheet>
        </>
    );
}
export function UpdateData({e, setting}: {e:User, setting:Setting}) {
    const [nid, setNid] = useState<string>(e.nid);
    const [name, setName] = useState<string>(e.name);
    const [email, setEmail] = useState<string>(e.email);
    const [jabatan, setJabatan] = useState<string|null>(null);
    const [idJabatan, setIdJabatan] = useState<number[]>([]);
    const handleUpdateGuru = () => {
        router.post(route('dashboard.user.update.post', e.id), {
            nid,
            name,
            email
        });
    }
    const handleAddJabatan = () => {
        router.post(route('dashboard.user.update.jabatan.post', e.id), {
            jabatan
        });
         
    }

    const handleRemoveJabatan = (isChecked:boolean, id:number) => {
        const t = idJabatan;
        if(isChecked) {
            t.push(id);
        } else {
            const h = t.findIndex(i => i === id);
            t.splice(h, 1);
        }
        setIdJabatan(t)
    }
    const sendRemoveJabatan = () => {
        const u = [...new Set(idJabatan)]
        router.post(route('dashboard.user.delete.jabatan.post', e.id), {
                jabatan : u
        });
    }
    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button>Update Data</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Update {e.name}</SheetTitle>
                        <SheetDescription>
                            Perbaikan Data Guru di tahun pelajaran {setting.id}/
                            {setting.id + 1}
                        </SheetDescription>
                    </SheetHeader>

                    <div className="mb-2 mt-5">
                        <Label htmlFor="nid">
                            Nomer Identitas (Bisa NUPTK, NPK, atau PegId)
                        </Label>
                        <Input
                            type="text"
                            onChange={(e) => setNid(e.target.value)}
                            id="nid"
                            placeholder="29423xxx"
                            value={e.nid}
                        />
                    </div>
                    <div className="mb-2">
                        <Label htmlFor="email">
                            E-Mail
                        </Label>
                        <Input
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            placeholder="xxxxx@gmail.com"
                            value={e.email}
                        />
                    </div>
                    <div className="mb-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                            type="text"
                            onChange={(e) => setName(e.target.name)}
                            id="name"
                            placeholder="Pastikan Huruf besar"
                            value={e.name}
                        />
                    </div>
                    <Button onClick={handleUpdateGuru}>Perbarui data</Button>
                    <hr className="my-5"></hr>
                    <h2 className="text-2xl mb-3">Jabatan</h2>
                    <div className="flex gap-2 items-center mb-5">
                        <Select onValueChange={v => setJabatan(v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih Jabatan"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>UTAMA</SelectLabel>
                                    {
                                        ['Kepala Sekolah', 'Bendahara', 'Operator'].map((t,i) => (
                                            <SelectItem key={i} value={t}>{t}</SelectItem>
                                        ))
                                    }
                                    <SelectLabel>Waka</SelectLabel>
                                    {
                                        ['Waka Kurikulum', 'Waka Kesiswaan', 'Waka Sarpras', 'Waka Humas'].map((t,i) => (
                                            <SelectItem key={i} value={t}>{t}</SelectItem>
                                        ))
                                    }
                                    <SelectLabel>UMUM</SelectLabel>
                                    {
                                        ['Guru', 'Pembantu Umum'].map((t,i) => (
                                            <SelectItem key={i} value={t}>{t}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button onClick={handleAddJabatan}>Tambah</Button>
                    </div>
                    {
                        e.histories.map(t => (
                            <div className="flex gap-3 mb-2">
                                <Checkbox id={"e"+ t.id} onChange={e => handleRemoveJabatan(e.target.checked, t.id)}></Checkbox>
                                <Label htmlFor={"e" + t.id}>{t.jabatan}</Label>
                            </div>
                        ))
                    }
                    <AlertDialog>
                        <AlertDialogTrigger className={buttonVariants({variant : 'destructive'})}>Copot Jabatan yang di pilih</AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Apakah Anda yakin ingin mencopot jabatannya ?</AlertDialogTitle>
                            <AlertDialogDescription>
                               {
                                idJabatan.map((r,k) => (
                                    <div key={k}>
                                        <Checkbox id={"select" + r} checked/>
                                        <Label htmlFor={"select" + r}>
                                            {
                                                e.histories.filter(Obj => Obj.id === r).map(p => (
                                                    <span key={p.id}>{p.jabatan}</span>
                                                ))
                                            }
                                        </Label>
                                    </div>
                                ))
                               }
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={sendRemoveJabatan}>Hapus saja</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </SheetContent>
            </Sheet>
        </>
    );
}




