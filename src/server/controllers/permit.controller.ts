import { TRPCError } from "@trpc/server"
import {
  CreateInHouseReviewSchemaType,
  CreateOTCReviewWithOutPlansSchemaType,
  CreateOTCReviewWithPlansSchemaType,
} from "../schema/permit.schema"
import {
  createInHouseReview,
  createOTCReviewWithOutPlans,
  createOTCReviewWithPlans,
} from "../services/permit.service"

export const createInHouseReviewController = async ({
  input,
}: {
  input: CreateInHouseReviewSchemaType
}) => {
  try {
    const permit = await createInHouseReview(input)
    return {
      status: "Success",
      data: { permit },
    }
  } catch (error) {}
}

export const createOTCReviewWithPlansController = async ({
  input,
}: {
  input: CreateOTCReviewWithPlansSchemaType
}) => {
  try {
    const permit = await createOTCReviewWithPlans(input)
    return {
      status: "Success",
      data: { permit },
    }
  } catch (error) {}
}

export const createOTCReviewWithOutPlansController = async ({
  input,
}: {
  input: CreateOTCReviewWithOutPlansSchemaType
}) => {
  try {
    const permit = await createOTCReviewWithOutPlans(input)
    return {
      status: "Success",
      data: { permit },
    }
  } catch (error) {}
}
