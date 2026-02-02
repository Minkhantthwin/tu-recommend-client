import { Metadata } from "next";
import ApplicationsList from "./applications-list";

export const metadata: Metadata = {
  title: "Applications",
};

export default function ApplicationsPage() {
  return <ApplicationsList />;
}