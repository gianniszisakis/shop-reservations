"use client";

import { Users, Briefcase, Globe } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Card } from "@/components/ui/card";
import CustomersTab from "./customers-tab";
import ServicesTab from "./services-tab";

export default function SettingsPage() {
  return (
    <div className="space-y-6 p-2 sm:p-6 lg:p-8">
      <Card className="rounded-3xl p-2 sm:p-3">
        <Tabs defaultValue="customers" className="w-full">
          <TabsList className="w-full bg-pink-200">
            <TabsTrigger value="customers" className="gap-2 rounded-xl py-3">
              <Users className="size-4" />
              <span>Πελάτες</span>
            </TabsTrigger>

            <TabsTrigger value="services" className="gap-2 rounded-xl py-3">
              <Briefcase className="size-4" />
              <span>Υπηρεσίες</span>
            </TabsTrigger>

            <TabsTrigger value="sources" className="gap-2 rounded-xl py-3">
              <Globe className="size-4" />
              <span>Πηγές</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customers" className="mt-6">
            <div className="rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
              <CustomersTab />
            </div>
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <div className="rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
              <ServicesTab />
            </div>
          </TabsContent>

          <TabsContent value="sources" className="mt-6">
            <div className="rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
              Sources will go here.
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
