export type StepStatus = "done" | "current" | "pending";

export interface Step {
  label: string;
  status: StepStatus;
}