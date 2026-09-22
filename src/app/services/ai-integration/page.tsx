import type { Metadata } from "next";
import { ServicePage } from "@/components/layout/service-page";
import { getServiceBySlug } from "@/lib/config/services";

const service = getServiceBySlug("ai-integration")!;

export const metadata: Metadata = {
  title: service.title,
  description: service.summary,
};

export default function Page() {
  return <ServicePage service={service} />;
}