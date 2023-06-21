import Wrapper from "@/src/components/Wrapper"
import { trpc } from "@/src/utils/trpc"
import { NextPage } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React, { useState } from "react"

const Details: NextPage = () => {
  const router = useRouter()
  const type = parseInt(router.query.type as string, 10)
  const [buildingPermit, setBuildingPermit] = useState("")
  const [planSet, setPlanSet] = useState("")
  const { data } = useSession()

  const handleBuildingPermitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingPermit(e.target.value)
  }

  const handlePlanSetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlanSet(e.target.value)
  }

  const { mutate: createInHouseReview } = trpc.createInHouseReview.useMutation({
    onSuccess() {
      alert("In House Review created successfully")
    },
    onError(message) {
      alert(message)
    },
  })
  const { mutate: createOTCReviewWithPlans } = trpc.createOTCReviewWithPlans.useMutation({
    onSuccess() {
      alert("OTC Review With Plans created successfully")
    },
    onError(message) {
      alert(message)
    },
  })
  const { mutate: createOTCReviewWithOutPlans } = trpc.createOTCReviewWithOutPlans.useMutation({
    onSuccess() {
      alert("OTC Review Without plans created successfully")
    },
    onError(message) {
      alert(message)
    },
  })
  const handleClick = async () => {
    if (type === 0) {
      await createOTCReviewWithPlans({
        email: data?.user?.email,
        buildingPermit: buildingPermit,
        planSet: planSet,
        type: type,
      })
    } else if (type === 1) {
      await createOTCReviewWithOutPlans({
        email: data?.user?.email,
        buildingPermit: buildingPermit,
        type: type,
      })
    } else if (type === 2) {
      await createInHouseReview({
        email: data?.user?.email,
        buildingPermit: buildingPermit,
        planSet: planSet,
        type: type,
      })
    }
  }
  return (
    <Wrapper>
      <div className="content flex flex-col flex-1 items-center">
        <h1 className="text-4xl text-bold p-10">Permit Flow</h1>
        {type !== 3 ? (
          <input
            type="input"
            placeholder="Building permit"
            onChange={handleBuildingPermitChange}
            className="mt-5 w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-pink-500 invalid:text-pink-600
          focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          />
        ) : null}
        {type !== 1 && type !== 3 ? (
          <input
            type="input"
            placeholder="Include plan set"
            onChange={handlePlanSetChange}
            className="mt-1 w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-pink-500 invalid:text-pink-600
          focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          />
        ) : null}
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-96 mt-5"
        >
          Submit
        </button>
        <button
          onClick={() => router.back()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-96 mt-5"
        >
          Go Back
        </button>
      </div>
    </Wrapper>
  )
}

export default Details
