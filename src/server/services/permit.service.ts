import prisma from "@/src/utils/prisma"

import {
  CreateInHouseReviewSchemaType,
  CreateOTCReviewWithOutPlansSchemaType,
  CreateOTCReviewWithPlansSchemaType,
} from "../schema/permit.schema"

export const createInHouseReview = async (input: CreateInHouseReviewSchemaType) => {
  const result = await prisma.permitInfo.create({ data: input })
  return result
}

export const createOTCReviewWithPlans = async (input: CreateOTCReviewWithPlansSchemaType) => {
  const result = await prisma.permitInfo.create({ data: input })
  return result
}

export const createOTCReviewWithOutPlans = async (input: CreateOTCReviewWithOutPlansSchemaType) => {
  const result = await prisma.permitInfo.create({ data: input })
  return result
}
