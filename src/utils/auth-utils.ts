import { ApiError } from "./api-response";

export const verifyOwnership = (resourceId: number, studentId?: number) => {
  if (!studentId || resourceId !== studentId) {
    throw new ApiError(403, 'You do not have permission to access this resource');
  }
};