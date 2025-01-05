import { UseFormReturn } from "react-hook-form";
import { Upload } from "lucide-react";
import { JoinFormValues } from "../schema";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CVUploadFieldProps {
  form: UseFormReturn<JoinFormValues>;
}

export const CVUploadField = ({ form }: CVUploadFieldProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("cv", file);
    }
  };

  return (
    <FormField
      control={form.control}
      name="cv"
      render={({ field: { value, ...field } }) => (
        <FormItem>
          <FormLabel>CV / Resume</FormLabel>
          <FormControl>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="cv-upload"
                {...field}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("cv-upload")?.click()}
                className="w-full"
              >
                <Upload className="mr-2" />
                {value ? (value as File).name : "Upload CV"}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};