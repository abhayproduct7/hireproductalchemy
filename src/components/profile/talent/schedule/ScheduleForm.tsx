import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AvailabilityTypeField } from "./AvailabilityTypeField";
import { StartDateField } from "./StartDateField";
import { PreferredScheduleFields } from "./PreferredScheduleFields";
import { scheduleSchema, type ScheduleFormType } from "./types";

interface ScheduleFormProps {
  defaultValues: ScheduleFormType;
  onSubmit: (values: ScheduleFormType) => Promise<void>;
  isLoading: boolean;
}

export const ScheduleForm = ({ defaultValues, onSubmit, isLoading }: ScheduleFormProps) => {
  const form = useForm<ScheduleFormType>({
    resolver: zodResolver(scheduleSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <AvailabilityTypeField form={form} />
        <StartDateField form={form} />
        <PreferredScheduleFields form={form} />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
};

export type { ScheduleFormType };