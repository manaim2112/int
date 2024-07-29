import Navbar from "@/Components/Navbar";
import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";

export default function Blog({auth}: PageProps<{auth:any}>) {
    return (
        <>
            <Navbar auth={auth} LogoText={"Logo"}/>
            <div className="bg-slate-300 py-12">
                <div className="container">
                    <h1 className="text-7xl font-bold">Blog</h1>
                    <div className="mt-3">
                        Tempat Info-info terbaru mengenai website ini
                    </div>
                </div>
            </div>

            <div className="container flex mt-10">
                <div className="w-full">
                    {
                        [1,2,3,4].map((e) => (
                            <div className="border border-slate-100 rounded-lg p-5 mb-4 flex gap-2">
                                <img src="https://cms.disway.id/uploads/dabf071c490f9961ee4fb03cbc838f30.jpg" className="w-32" alt="Image" />
                                <div className="">

                                <Link href={route('blog.slug', {slug : e})} className="text-2xl font-medium hover:underline">Ini Title terbaru Yang Bagus</Link>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. A accusamus unde at optio, quod, nisi voluptas eaque id hic dicta et tempora incidunt explicabo minus ex fuga corporis quas reiciendis.</p>
                                </div>
                            </div>
                        ))
                    }
                
                </div>
                <div className=" w-64 rounded-sm bg-slate-200">

                </div>
            </div>
        </>
    )
}