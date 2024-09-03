import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { PageProps } from "@/types";

export default function AbsenReal({ absen }: PageProps<{ absen: Absen[] }>) {

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
                        absen.map((e, k) => (
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
