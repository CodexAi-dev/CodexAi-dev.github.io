/**
 * Shared shape for the contact form's action state.
 *
 * This deliberately lives outside `app/actions.ts`: a "use server" module may
 * only export async functions, so a plain object exported from there arrives
 * as `undefined` on the client.
 */

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Record<string, string>;
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
