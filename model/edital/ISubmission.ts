import { SubStatus } from "./TSubStatus";

export type Submission = {
  id: string;
  project: string;
  edital: string;
  editalId: string;
  status: SubStatus;
  progress: number;
  updatedAt: string;
  value: string;
};