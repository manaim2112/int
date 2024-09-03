import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { PageProps } from "@/types";
import { useEffect, useState } from "react";

export default function AbsenReal({ absen }: PageProps<{ absen: Absen[] }>) {
    const [a, setA] = useState<Absen[]|null>(null);
    useEffect(() => {
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
        const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "September", "Oktober", "November", "Desember"];
        const y = absen.map(r => {
            const createAt = new Date(String(r.created_at));
            const time = new Date(String(r.tanggal));

            r.created_at = `${createAt.getDate().toString().padStart(2, "0")}/${createAt.getMonth().toString().padStart(2, "0")}/${createAt.getFullYear()} ${createAt.getHours().toString().padStart(2, "0")}:${createAt.getMinutes().toString().padStart(2, "0")}:${createAt.getSeconds().toString().padStart(2, "0")}`;
            
            r.tanggal = `${days[time.getDay()]}, ${time.getDate().toString().padStart(2, "0")} ${month[time.getMonth()]} ${time.getFullYear()}`;
            return r;
        });

        setA(y);
    }, []);
    return (
        <>
            <Table>
                <TableHeader className="sticky top-0 z-40">
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Tanggal Kehadiran</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Jenis Kelamin</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Jam Dinas (Jika ada)</TableHead>
                        <TableHead>Keterangan</TableHead>
                        <TableHead>Tahun Pelajaran</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        a && a.map((e, k) => (
                            <TableRow key={k}>
                                <TableHead>{k+1}</TableHead>
                                <TableHead>{e.created_at}</TableHead>
                                <TableHead>{e.tanggal}</TableHead>
                                <TableHead>{e.user.name}</TableHead>
                                <TableHead>{e.user.gender}</TableHead>
                                <TableHead>{e.status}</TableHead>
                                <TableHead>{e.jam_dinas}</TableHead>
                                <TableHead>{e.keterangan}</TableHead>
                                <TableHead>{e.setting_id}/{e.setting_id+1}</TableHead>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    );
}
