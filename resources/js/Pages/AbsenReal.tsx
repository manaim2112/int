import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { useEffect, useRef } from "react";

export default function AbsenReal({absen} : PageProps<{ absen : Absen[]}>) {
    const SpreadSheet = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const filter = absen.map(e => {
            return [
                e.created_at ?? "",
                e.tanggal,
                e.user.name,
                e.user.gender ?? "",
                e.status,
                e.jam_dinas,
                e.keterangan,
                e.setting_id + "/" + (e.setting_id + 1),
            ];
        });

        if (SpreadSheet.current) {
            jspreadsheet(SpreadSheet.current, {
                data: filter, // Menggunakan array dua dimensi
                columns: [
                    { title: 'Tanggal', width: 300, type: 'text' },
                    { title: 'Tanggal Kehadiran', width: 300, type: 'text' },
                    { title: 'Nama', width: 300, type: 'text' },
                    { title: 'Jenis Kelamin', width: 300, type: 'text' },
                    { title: 'Status', width: 300, type: 'text' },
                    { title: 'Jam DINAS (Jika Ada)', width: 300, type: 'text' },
                    { title: 'Keterangan', width: 300, type: 'text' },
                    { title: 'Tahun Pelajaran', width: 300, type: 'text' },
                ]
            });
        }
    }, [absen])
    return(
        <>
            <Head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jspreadsheet-ce/dist/jspreadsheet.min.css" type="text/css" />
                <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jspreadsheet-ce/dist/index.min.js"></script>
            </Head>

            <div ref={SpreadSheet}></div>
        </>
    )
}