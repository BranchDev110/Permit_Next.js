import Wrapper from "@/src/components/Wrapper"
import { requireAuth } from "@/src/utils/requireAuth"
import Image from "next/image"
import Link from "next/link"

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} }
})

function Home() {
  return (
    <Wrapper>
      <div className="content flex flex-col flex-1 items-center">
        <h1 className="text-4xl text-bold p-10">Home</h1>
        <div className="list flex">
          <Link
            href={"/interior"}
            className={`flex flex-col bg-white m-3 ease-in duration-300 shadow-[0_0_30px_-10px_rgba(0,0,0,0.1)] rounded-lg py-3 px-5 hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.2)] border cursor-pointer`}
          >
            <div className="flex justify-between items-center">
              <h5 className="py-3 text-md tracking-wide tracking-tight text-gray-500">
                Interior Work
              </h5>
            </div>
            <Image
              className="rounded-lg"
              src={"/images/interior1.jpg"}
              alt=""
              width={300}
              height={200}
            ></Image>
          </Link>
          <Link
            href={"/exterior"}
            className={`flex flex-col bg-white m-3 ease-in duration-300 shadow-[0_0_30px_-10px_rgba(0,0,0,0.1)] rounded-lg py-3 px-5 hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.2)] border cursor-pointer`}
          >
            <div className="flex justify-between items-center">
              <h5 className="py-3 text-md tracking-wide tracking-tight text-gray-500">
                Exterior Work
              </h5>
            </div>
            <Image
              className="rounded-lg"
              src={"/images/exterior1.jpg"}
              alt=""
              width={300}
              height={200}
            ></Image>
          </Link>
        </div>
      </div>
    </Wrapper>
  )
}

export default Home
