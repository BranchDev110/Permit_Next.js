import CardComponent from "@/src/components/CardComponent"
import Wrapper from "@/src/components/Wrapper"
import { requireAuth } from "@/src/utils/requireAuth"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import data from "../../utils/constant.json"

/*
0: OTC review process with plans
1: OTC review process without plans
2: In-house review process
3: No permit is required
*/

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} }
})

const Exterior: NextPage = () => {
  const router = useRouter()
  const [permit, setPermit] = useState({
    inHouse: false,
    otcWithPlans: false,
    otcWithOutPlans: false,
  })

  const addPermit = (newPermit: number) => {
    if (newPermit === 0) setPermit({ ...permit, otcWithPlans: true })
    else if (newPermit === 1) setPermit({ ...permit, otcWithOutPlans: true })
    else if (newPermit === 2) setPermit({ ...permit, inHouse: true })
  }

  const removePermit = (remPermit: number) => {
    if (remPermit === 0) setPermit({ ...permit, otcWithPlans: false })
    else if (remPermit === 1) setPermit({ ...permit, otcWithOutPlans: false })
    else if (remPermit === 2) setPermit({ ...permit, inHouse: false })
  }

  const handleNext = () => {
    let type = 3
    if (permit.inHouse === true) type = 2
    else if (permit.otcWithPlans === true) {
      if (permit.otcWithOutPlans === true) {
        alert("You couldn't proceed this step.")
        return
      }
      type = 0
    } else if (permit.otcWithOutPlans === true) type = 1
    router.push(`/details?type=${type}`)
  }

  return (
    <Wrapper>
      <div className="content flex flex-col flex-1 items-center">
        <h1 className="text-4xl text-bold p-10">Exterior Work</h1>
        <div className="list flex">
          {data.exterior.map((item, index) => (
            <CardComponent
              data={item}
              key={index}
              addPermit={addPermit}
              removePermit={removePermit}
            />
          ))}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-96 mt-5"
          onClick={handleNext}
        >
          Next
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-96 mt-5"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    </Wrapper>
  )
}

export default Exterior
