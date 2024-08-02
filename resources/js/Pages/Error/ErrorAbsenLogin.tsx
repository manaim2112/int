import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import { Quote } from "lucide-react";

export default function ErrorAbsenLogin({message, allowed} : PageProps<{message : string; allowed: boolean}>) {
    return(
        <>
            <div className="h-screen flex w-full justify-center items-center">
                <div className="container max-w-[500px]">
                    <Quote className="w-10 h-10"/>
                    <h2 className="text-2xl">{message}</h2>
                    {
                        allowed && (
                            <p>
                                Tenang Saja, anda bisa check data absen dari semuanya <Link href={route('absen.check')} className="text-blue-600 hover:text-blue-400">Disini</Link>
                            </p>
                        )
                    }
                </div>
            </div>
        </>
    )
}