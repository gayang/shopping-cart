import { z, ZodError} from "zod";

export const registrationSchema = z
  .object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.string({
      required_error: "Email is required",
    })
    .email(),
    password: z.string({
      required_error: "Password is required",
    })
  .min(6),
});
