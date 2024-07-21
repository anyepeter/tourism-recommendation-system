import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { getAllUsers } from "@/actions/actions";



const category = [
  {
    id: 1,
    name: "Lake",
    image: "/images/forest.png",
    href: "lake"
  },
  {
    id: 2,
    name: "Beach",
    image: "/images/lake.png",
    href: "beach"
  },
  {
    id: 3,
    name: "Mountain",
    image: "/images/mountain.png",
    href: "mountain"
  },
  {
    id: 4,
    name: "Forest",
    image: "/images/sea.png",
    href: "forest"
  }
]
export default  async function Home() {

  // const user = await getAllUsers()

  // console.log(user)

  return (
   <section className="bg-cover w-full bg-opacity-90 bg-center min-h-screen" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 225, 0.5), rgba(255, 255, 255, 0.5)), url('/images/background.png')" }}>
    <div className="p-4 pl-6">
    <Image src="/images/logo.png" width={100} height={100} alt="logo"/>
    </div>
    
    <main className=" w-full p-8 sm:p-12 justify-center items-center flex flex-col pt-10 gap-12 lg:gap-20">
      <div className="flex flex-col text-blue-800 gap-2 sm:gap-4 lg:gap-7 w-full">
    <h1 className="text-4xl sm:text-5xl lg:text-[64px]">Come with us!</h1>
    <h1 className="text-2xl sm:text-4xl gap-4 flex lg:text-[64px] items-center">Let’s Explore <span className="font-extrabold text-4xl lg:text-[64px]  sm:text-6xl">Cameroon</span></h1>
     <h1 className="text-4xl sm:text-5xl lg:text-[64px]">Together!!</h1>
</div>
  <ul className="flex flex-col sm:flex-row gap-9 lg:gap-14 justify-center items-center sm:flex-wrap lg:flex-nowrap md:flex-row">
    {category.map((item) => (
      <Card key={item.id} className="flex flex-col gap-4 rounded-none ">
        <CardHeader className="p-0 m-0">
          <Image src={item.image} width={300} height={400} alt="background" />
        </CardHeader>
        <CardFooter className="flex flex-col justify-center items-center gap-3">
          <CardTitle>{item.name}</CardTitle>
          <Link href={`/${item.href}`} className="p-1 text-white bg-blue-800">
          Explore more
          </Link>

        </CardFooter>
          
      </Card>
    ))}
  </ul>


    </main>
   </section>
  );
}
