import Navbar from "@/Components/Navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Badge } from "@/Components/ui/badge"
import { Button, buttonVariants } from "@/Components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { PageProps } from "@/types"
import { Head, Link } from "@inertiajs/react"

export default function Home({auth, setting} : PageProps<{setting: Setting}>) {
    return (
        <>
        <Head>
          <title>MTs Sunan Ampel Karanganyar Kraton Pasuruan</title>
          <meta name="description" content="Sekolah berbasis Pondok pesantren"/>
        </Head>

            <Navbar auth={auth} LogoText="LOGO" LogoImage={"/storage/" + setting.logo}/>
            <div className="bg-gradient-to-tr from-white to-slate-200 relative bg-no-repeat bg-cover h-screen">
                <div className="bg-blue-500/20 absolute h-screen -z-7 top-0 left-0 w-full"></div>
                <div className="text-center absolute h-screen w-full top-0 left-0 z-2">
                    <div className="container mt-20 min-h-48 flex items-center justify-center text-left gap-2">
                      <div className="w-full">
                        <h1 className="text-6xl font-extrabold mt-20">
                            {setting.name}
                        </h1>
                        <h2 className="text-2xl">Tahun Pelajaran {setting.id}/{setting.id+1}</h2>
                      </div>
                      <div className="w-96 hidden sm:block items-center">
                        <img src={"/storage/" + setting.logo} className="w-72 h-72" alt="logo" title="Brand"/>
                      </div>
                    </div>

                    <div className="text-center mt-40">
                      <Button className="uppercase rounded-full font-bold relative" disabled variant={"secondary"}>
                      <Badge variant={"destructive"} className="absolute -top-2 -right-4">Tutup</Badge>
                        Gabung Sekarang
                        </Button>
                    </div>
                </div>
            </div>
            <div id="aboutMe" className="bg-white p-10">
                <h1 className="text-green-500 text-center font-extrabold text-5xl">
                    Tentang Kami
                </h1>
                <div className="mt-8 max-w-3xl mx-auto">
                    <div className="text-2xl mx-auto font-light text-green-900 tracking-wide italic font-mono">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABQwAAAUMBH0gTIwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJCSURBVFiFzZc9axRRFIafM64WsUjUFILEwqSQgBoVGwsRRIUYEPIHRKysxMpKsFDxP2ilWCQYm1glKKQQBGNE0ETjR2MlRFSMorua12J2ZFzvmZ07BNcDpzlz3o+5e+fcuyaJTkbSUfX/wUCtXYOZGXAA2Ao8kjRfVczMtgF7gG/AlKQ6ktwERoAngHJ5oQjj8PQB14AfOZ7nQLcHWAuMtwhnuQIciRA/3nzjENeEJ37bAWR5qqT4KFAv4HkYAt1qIy5gfwnxYaDRhud6K+hMQfMCcAU4WEJ8C7Dk8HwBbgAngJ48aMj5rerAeaBWctkT4J4jPgP0/9GfA7budgE/gdHIHX/aEZ8E1vzV3wQddUDnIsUT4HWA5ynQFcQ0gVMB0AcP1GbXh17kZAGGAQc0ESPeJJt2uHo9TALsIhz7nHpRDDn13R6gRroCoegzs1lgjHRsvpK04BGZWTfQ6zy+aWZjwH3gLTAr6Xv28CrtB0+Wc8Cgs/x7I3jeA2ezPTAZARQw7Rg4FsnTALYnwEZvWZ04ZGbrA/VYnhowXMWAAf2rYABgoIoBSM/11thQhSehxK0oEB8DtXVVeBLST2w1DCxWNfAsErQs6WugXuWu+K6KgZdO3R1SRVwJ8CAS9CJUlPQ50oSAxWyIXKb8ABkpOIx2Asslee7kj+MEuAS8KQA0gIslTsTDwF2K74OPgc2SsGweZ2Fmg6T3+B7Sb3uFdHbPSFoqu75mtgnYkePpAj4B85Lmfve1GvjX0fH/hh038AsqH0vw2nFHugAAAABJRU5ErkJggg==" alt="quote" className="float-left relative -top-5 -left-3 w-18"/>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABQwAAAUMBH0gTIwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJCSURBVFiFzZc9axRRFIafM64WsUjUFILEwqSQgBoVGwsRRIUYEPIHRKysxMpKsFDxP2ilWCQYm1glKKQQBGNE0ETjR2MlRFSMorua12J2ZFzvmZ07BNcDpzlz3o+5e+fcuyaJTkbSUfX/wUCtXYOZGXAA2Ao8kjRfVczMtgF7gG/AlKQ6ktwERoAngHJ5oQjj8PQB14AfOZ7nQLcHWAuMtwhnuQIciRA/3nzjENeEJ37bAWR5qqT4KFAv4HkYAt1qIy5gfwnxYaDRhud6K+hMQfMCcAU4WEJ8C7Dk8HwBbgAngJ48aMj5rerAeaBWctkT4J4jPgP0/9GfA7budgE/gdHIHX/aEZ8E1vzV3wQddUDnIsUT4HWA5ynQFcQ0gVMB0AcP1GbXh17kZAGGAQc0ESPeJJt2uHo9TALsIhz7nHpRDDn13R6gRroCoegzs1lgjHRsvpK04BGZWTfQ6zy+aWZjwH3gLTAr6Xv28CrtB0+Wc8Cgs/x7I3jeA2ezPTAZARQw7Rg4FsnTALYnwEZvWZ04ZGbrA/VYnhowXMWAAf2rYABgoIoBSM/11thQhSehxK0oEB8DtXVVeBLST2w1DCxWNfAsErQs6WugXuWu+K6KgZdO3R1SRVwJ8CAS9CJUlPQ50oSAxWyIXKb8ABkpOIx2Asslee7kj+MEuAS8KQA0gIslTsTDwF2K74OPgc2SsGweZ2Fmg6T3+B7Sb3uFdHbPSFoqu75mtgnYkePpAj4B85Lmfve1GvjX0fH/hh038AsqH0vw2nFHugAAAABJRU5ErkJggg==" alt="quote" className="float-right rotate-180 relative -top-5 -left-3 w-18"/>
                    <div className="flex items-center gap-4">
                        <Avatar className="w-32 h-32 mt-5">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        <h2 className="text-3xl">
                            Nama Create Quote
                            <div className="text-lg font-bold">Assiten manager</div>
                        </h2>
                    </div>
                    </div>
                </div>
            </div>

            <div className="bg-lime-400 py-10">
              <div className="container">
                <h2 className="text-5xl mb-5 font-bold text-lime-700">Artikel Kita</h2>
                <Card className="shadow">
                  <CardHeader>
                    <CardTitle>INi Judu Blog</CardTitle>
                    <CardDescription>INi Sekilas saja</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link href="" className={buttonVariants({variant:"default"})}>Selengkapnya</Link>
                  </CardFooter>
                </Card>
              </div>
            </div>

        </>
    )
}


export function DialogDemo() {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }