import Navbar from "@/Components/Navbar";
import { PageProps } from "@/types";
import { useEffect, useState } from "react";

export default function BlogSlug({ slug, data, auth} : PageProps<{ slug : string, data : Blog}>) {
    const [date, setDate] = useState<String|null>(null);
    useEffect(()=> {
        const { updated_at, created_at} = data;
        const parse = Math.floor((Date.now() - Date.parse(updated_at)));
        const change = () => {
            if(Date.parse(updated_at) - Date.parse(created_at) > 0) return "Di perbarui";

            return "Di Publish";
        }

        if(parse < 5) return setDate(change() +" Baru saja");
        if(parse < 60) return setDate(change() +" " + parse + " detik yang lalu")
        if(parse < 60*60) return setDate(change() +" " + Math.floor(parse/60) + " menit yang lalu")
        if(parse < 60*60*24) return setDate(change() + " " + Math.floor(parse/(60*24)) + " jam yang lalu");

        const name = ['Januari', "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
        const d = new Date(updated_at);
        setDate(change() +" tanggal " + d.getDate() + " " + name[d.getMonth()] + " " + d.getFullYear());

    }, [])
    return(
        <>
            <Navbar auth={auth} LogoText={"Logo"}/>

            <div className="mt-4 container py-10 border-b border-b-gray-200">
                <h2 className="text-5xl font-bold">
                    {data.title}
                </h2>
                <div className="text-md">{date}</div>
                <div className="text-md">oleh <a className="text-blue-400">{data.user.name}</a></div>
            </div>

            <div className="py-10 container font-serif tracking-widest mb-3 text-lg     text-gray-800 dark:text-gray-400 first-letter:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:me-3 first-letter:float-start">
                <div dangerouslySetInnerHTML={{__html : data.content}}></div>

            </div>
        </>
    )
}




