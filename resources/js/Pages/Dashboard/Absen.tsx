import { Avatar } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader } from "@/Components/ui/card";
import PanelLayout from "@/Layouts/PanelLayout";
import { PageProps } from "@/types";
import { Head, router } from "@inertiajs/react";
import { PowerCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Absen({auth, setting, absens} : PageProps<{absens : Absen[],auth : Auth, setting: Setting}>) {
    const [status, setStatus] = useState<string|null>(null);
    const [s] = useState<string[]>(['HADIR', 'IJIN', "SAKIT", "ALPA", "CUTI", "TUGAS DINAS"]);
    const handleAbsenNow = (Status:string) => {
        setStatus(Status);
        router.post(route('dashboard.absen.post', 
            {
                user_id : auth.user.id,
                status : Status
            }
        ))

        toast("Berhasil Absen");
    }
    useEffect(() => {
        if(absens.length > 0) {
            setStatus(absens[0].status)
        }
    }, []);
    return(
        <PanelLayout>
            <Head title="Absen Guru"/>
            <Card>
                <CardHeader>
                    <div className="flex sm:flex-row flex-col gap-4 items-center mx-auto">
                        <PowerCircle className="w-72 h-72 text-blue-800"></PowerCircle>
                        <div className="w-full">
                            <div className="flex gap-2 mb-5">
                                {
                                    s.map((e,k) => (
                                        <Button key={k} variant={status === e ? 'default' : 'outline'} onClick={ r => handleAbsenNow(e)}>{e}</Button>
                                    ))
                                }
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">ABSEN SEKARANG</h2>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </PanelLayout>
    )
}