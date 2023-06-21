import { RegisterSchemaType } from "../schema/auth.schema"
import { signUp } from "../services/auth.service"

export const signInController = async () => {}

export const signUpController = async (input: RegisterSchemaType) => {
  try {
    const result = await signUp(input)
    return {
      status: 201,
      message: "Account created successfully",
      result,
    }
  } catch (error) {}
}
