import { UseFormReturn } from "react-hook-form";
import { JoinFormValues } from "./schema";
import { BasicInfoFields } from "./fields/BasicInfoFields";
import { SkillsField } from "./fields/SkillsField";
import { AvailabilityFields } from "./fields/AvailabilityFields";
import { CVUploadField } from "./fields/CVUploadField";

interface FormFieldsProps {
  form: UseFormReturn<JoinFormValues>;
}

export const FormFields = ({ form }: FormFieldsProps) => {
  return (
    <>
      <BasicInfoFields form={form} />
      <CVUploadField form={form} />
      <SkillsField form={form} />
      <AvailabilityFields form={form} />
    </>
  );
};