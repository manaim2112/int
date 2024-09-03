import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

export default function AbsenReal({ absen }: PageProps<{ absen: Absen[] }>) {
    const SpreadSheet = useRef<HTMLDivElement>(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    // Function to load the script dynamically
    const loadScript = (url: string) => {
        return new Promise<void>((resolve, reject) => {
            if (document.querySelector(`script[src="${url}"]`)) {
                resolve(); // Script already loaded
                return;
            }
            const script = document.createElement("script");
            script.src = url;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Script load error: ${url}`));
            document.body.appendChild(script);
        });
    };

    useEffect(() => {
        loadScript("https://cdn.jsdelivr.net/npm/jspreadsheet-ce/dist/index.min.js")
            .then(() => setScriptLoaded(true))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if (!scriptLoaded || typeof jspreadsheet === "undefined") return;

        if (SpreadSheet.current) {
            jspreadsheet(SpreadSheet.current, {
                data: absen.map(e => [
                    e.created_at ?? "",
                    e.tanggal,
                    e.user.name,
                    e.user.gender ?? "",
                    e.status,
                    e.jam_dinas,
                    e.keterangan,
                    e.setting_id + "/" + (e.setting_id + 1),
                ]),
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
    }, [scriptLoaded, absen]);

    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jspreadsheet-ce/dist/jspreadsheet.min.css" type="text/css" />
            </Head>

            <div ref={SpreadSheet}></div>
        </>
    );
}
