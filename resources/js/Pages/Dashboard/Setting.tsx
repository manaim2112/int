import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Textarea } from "@/Components/ui/textarea";
import PanelLayout from "@/Layouts/PanelLayout";
import { PageProps } from "@/types";
import { router } from "@inertiajs/react";
import { Copy, CopyIcon } from "lucide-react";
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import { toast } from "sonner";

export default function Setting({data, user, setting, kelas, auth} : PageProps<{auth : {user : User, history : UserHistory}, kelas : Kelas[], setting : Setting, data : Setting[], user : User[]}>) {
    const [addKelas, setAddKelas] = useState<string|null>(null);

    const handleAddKelas = () => {
      if(!addKelas) return toast("Pastikan Di isi");
      
      router.post(route('dashboard.setting.kelas.create.post'), {
        name : addKelas
      });

    }
    const changeSetting = (id:number, u :boolean) => {
      const index = data.findIndex(v => v.id === id);
      const s = data[index];
      const encode = window.btoa(JSON.stringify(s));
      router.post(route('dashboard.setting.change.post'), {
        id,
        permanent : u
      })
    }
    return (
        <PanelLayout>
            <h2 className="text-4xl mb-4">Pengaturan</h2>
            {data.length < 1 && (
                <>
                    <Alert variant={"destructive"}>
                        <AlertTitle>NO setting Up</AlertTitle>
                        <AlertDescription>
                            Anda Belum melakukan Setting Tahun Pelajaran,
                            silahkan melakukan setelan tahun pelajaran
                        </AlertDescription>
                    </Alert>
                </>
            )}

            <div className="grid grid-cols-7 gap-2 mt-10">
                <div className="col-span-5">
                  <Card>
                    <CardHeader>
                      <CardTitle className="group flex items-center gap-2 text-lg">
                        <div className="w-full">
                          Data Tahun Pelajaran
                        </div>
                        <DialogCreate user={user} />
                          
                      </CardTitle>
                      <CardDescription>Data Bersifat Sensitif, dibuat ketika mau ada pergantian tahun atau ingin mengubah semester</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                          <TableHeader>
                              <TableRow>
                                  <TableHead>Tahun Pelajaran</TableHead>
                                  <TableHead>Nama Sekolah</TableHead>
                                  <TableHead>Kepala Sekolah</TableHead>
                                  <TableHead>Kontak</TableHead>
                                  <TableHead>Logo</TableHead>
                                  <TableHead></TableHead>
                              </TableRow>
                          </TableHeader>
                          <TableBody>
                              {data.map((e) => (
                                  <TableRow key={e.id}>
                                      <TableCell>
                                          {e.id}/{e.id + 1}
                                      </TableCell>
                                      <TableCell>{e.name}</TableCell>
                                      <TableCell>{e.user.name}</TableCell>
                                      <TableCell>
                                          <div className="font-bold">
                                              {e.phone}
                                          </div>
                                          {e.email}
                                      </TableCell>
                                      <TableCell>
                                          <img
                                              src={"/storage/" + e.logo}
                                              className="w-10 h-10"
                                              alt="Logo"
                                              title="Brand"
                                          />
                                      </TableCell>
                                      <TableCell className="flex gap-2">
                                          <Button
                                              disabled={e.id === setting.id}
                                              onClick={() => changeSetting(e.id, false)}
                                          >
                                              {" "}
                                              <CopyIcon className="w-5 h-5" />{" "}
                                              Pilih {" "}
                                          </Button>
                                          {

                                            ['Operator', 'administrator', 'Kepala Sekolah'].includes(auth.history.jabatan) && (
                                                <Button variant={"destructive"}
                                                    disabled={e.id === setting.id}
                                                    onClick={() => changeSetting(e.id, true)}
                                                >
                                                    {" "}
                                                    <CopyIcon className="w-5 h-5" />{" "}
                                                    Pilih Permanen{" "}
                                                </Button>
                                            )
                                          }
                                      </TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
                <div className="col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Data Kelas</CardTitle>
                            <CardDescription>
                                {" "}
                                Data Ini Bersifat permanent, jadi ketika dibuat,
                                pastikan tidak ada kesalahan
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {kelas.length === 0 && "Tidak Ada Kelas"}
                            {kelas.length > 0 && "Total kelas sebanyak "+ kelas.length}
                            <div className="mt-4">
                                {kelas.map((e) => (
                                    <Badge className="m-2 relative" key={e.id}>
                                        {e.name}
                                        <Badge className="absolute text-xs px-1 cursor-pointer rounded-full -right-2 -top-2" variant={"destructive"}>x</Badge>    
                                    </Badge>
                                ))}
                            </div>  
                            <div className="mt-3 flex items-center gap-2">
                                <Input onChange={e => setAddKelas(e.target.value)} type="text" placeholder="Ketikkan Nama Kelas"/>
                                <Button onClick={handleAddKelas}>Tambah</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PanelLayout>
    );
}


export function DialogCreate({user} : {user : User[]}) {
    const [value, setValue] = useState<Setting|null>(null);
    const [kepala, setKepala] = useState<string|null>(null);
    const [semester, setSemester] = useState<string|null>(null);
    const [name, setName] = useState<string|null>(null);
    const [address, setAddress] = useState<string|null>(null);
    const [postCode, setPostCode] = useState<string|null>(null);
    const [country, setCountry] = useState<string|null>(null);
    const [logo, setLogo] = useState<FileList|null>(null);
    const [phone, setPhone] = useState<string|null>(null);
    const [email, setEmail] = useState<string|null>(null);

    function handleChange(e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
        const key = e.target.id;
        const val = e.target.value;
        setValue(v => {
            if(!v) return v;
            return {
                ...(v),
                [key]: val,
            }
        });
      }
    const handleSubmit = () => {
        console.log({kepala, semester, name, address, postCode, country, logo, phone, email})
        if(!kepala || !semester || !name || !address || !postCode || !country || !logo || !phone || !email) return;
        const brand = logo[0];
        router.post(route('dashboard.setting.post'), {
          kepala,
          semester,
          name,
          address,
          postCode,
          country,
          logo : brand,
          phone,
          email
        }); 
    }
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Generate</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md overflow-y-auto max-h-full">
          <DialogHeader>
            <DialogTitle>Tahun Pelajaran</DialogTitle>
            <DialogDescription>
              Pastikan Semua di isi, data bersifat berbahaya
            </DialogDescription>
          </DialogHeader>
            <div>
                <div className="grid flex-1 gap-2 mb-1">
                <Label htmlFor="link" className="">
                    Tentukan kepala Sekolah
                </Label>
                <SelectKepala setKepala={setKepala} user={user}/>
                </div>
                <div className="grid flex-1 gap-2 mb-1">
                <Label htmlFor="link" className="">
                    Tentukan Semester Awal
                </Label>
                <SelectSemester setSemester={setSemester}/>
                </div>
                <div className="mb-1">
                    <Label htmlFor="nameSekolah">Nama Sekolah</Label>
                    <Input
                        id="nameSekolah"
                        defaultValue=""
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="mb-1">
                    <Label htmlFor="alamat">Alamat</Label>
                    <Textarea onChange={e => setAddress(e.currentTarget.value)} id="alamat" placeholder="Jl ....">

                    </Textarea>
                    
                </div>
                <div className="mb-1">
                    <Label htmlFor="kodepos">Kodepos</Label>
                    <Input
                        id="kodepos"
                        defaultValue=""
                        onChange={e => setPostCode(e.target.value)}
                    />
                </div>
                <div className="mb-1">
                    <Label htmlFor="negara">Negara</Label>
                    <Input
                        id="kodepos"
                        defaultValue=""
                        onChange={e => setCountry(e.target.value)}
                    />
                </div>
                <div className="mb-1">
                    <Label htmlFor="negara">Logo</Label>
                    <Input type="file"
                        id="kodepos"
                        defaultValue=""
                        onChange={e => setLogo(e.target.files)}
                    />
                </div>
                <div className="mb-1">
                    <Label htmlFor="Phone">Phone</Label>
                    <Input
                        id="Phone"
                        defaultValue=""
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>
                <div className="mb-1">
                    <Label htmlFor="email">E-Mail</Label>
                    <Input
                        id="email"
                        defaultValue=""
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <DialogFooter className="sm:justify-start">
                    <Button onClick={handleSubmit} type="submit">Simpan</Button>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }


  export function SelectKepala({user, setKepala} : {user:User[], setKepala : React.Dispatch<React.SetStateAction<string | null>>}) {
    return (
      <Select onValueChange={e => setKepala(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Pilih Guru"/>
        </SelectTrigger>
        <SelectContent className="w-full">
          <SelectGroup>
            <SelectLabel>Guru MTs</SelectLabel>
            {
                user.map((e,i) => (
                    <SelectItem key={i} value={String(e.id)}>{e.name}</SelectItem>
                ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  }

export function SelectSemester({setSemester} : {setSemester : React.Dispatch<React.SetStateAction<string | null>>}) {
    return (
        <Select onValueChange={e => setSemester(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Semester"/>
        </SelectTrigger>
        <SelectContent className="w-full">
          <SelectGroup>
            <SelectLabel>Semester</SelectLabel>
            {
                [1,2].map((e,i) => (
                    <SelectItem key={i} value={String(e)}>{e}</SelectItem>
                ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    )
}