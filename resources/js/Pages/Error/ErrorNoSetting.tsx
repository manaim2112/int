import Guest from "@/Layouts/GuestLayout";
import { Link } from "@inertiajs/react";

export default function ErrorNoSetting() {
    return (
        <>
            <Guest>
                Anda Belum Men SET Pengaturan default, silahkan login <Link href={route('login')} className="text-blue-500 hover:text-blue-600 hover:underline">LOGIN</Link>
            </Guest>
        </>
    )
}