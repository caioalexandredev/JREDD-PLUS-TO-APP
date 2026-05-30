import { ReactNode } from "react";

export interface Module {
  id: string;
  num: string;
  title: string;
  tag: string;
  desc: string;
  bullets: string[];
  icon: ReactNode;
}