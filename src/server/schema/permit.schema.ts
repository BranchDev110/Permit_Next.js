import { number, object, string, TypeOf } from "zod"

export const createInHouseReviewSchema = object({
  email: string({
    required_error: "Email is required",
  }),
  buildingPermit: string({
    required_error: "Building permit is required",
  }),
  planSet: string(),
  type: number(),
})

export const createOTCReviewWithPlansSchema = object({
  email: string({
    required_error: "Email is required",
  }),
  buildingPermit: string({
    required_error: "Building permit is required",
  }),
  planSet: string(),
  type: number(),
})

export const createOTCReviewWithOutPlansSchema = object({
  email: string({
    required_error: "Email is required",
  }),
  buildingPermit: string({
    required_error: "Building permit is required",
  }),
  type: number(),
})

export type CreateInHouseReviewSchemaType = TypeOf<typeof createInHouseReviewSchema>
export type CreateOTCReviewWithPlansSchemaType = TypeOf<typeof createOTCReviewWithPlansSchema>
export type CreateOTCReviewWithOutPlansSchemaType = TypeOf<typeof createOTCReviewWithOutPlansSchema>
