import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";

interface UpdateModalProps {
  categoryId: string;
  initialData: {
    name: string;
    emoji?: string;
  };
  onCategoryUpdated: () => void;
}

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "../ui/use-toast";
import axios from "axios";
import { Input } from "../ui/input";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Category's name is required",
    })
    .max(25, {
      message: "Category's name can't be longer than 25 characters",
    }),
  emoji: z
    .string()
    .max(1, {
      message: "Emoji can't be longer than 1 character",
    })
    .optional(),
});

export default function UpdateModal({
  categoryId,
  initialData,
  onCategoryUpdated,
}: UpdateModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/category`, { categoryId, ...values });
      toast({
        title: "Success!",
        description: "The category was successfully updated",
        variant: "success",
      });
      onCategoryUpdated();
      form.reset();
    } catch {
      toast({
        title: "Something went wrong.",
        description:
          "Please try again later. ( Additionally check if category's name is unique ).",
        variant: "destructive",
      });
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <AlertDialog>
      <AlertDialogTrigger>Update</AlertDialogTrigger>
      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AlertDialogHeader>
              <AlertDialogTitle>Update Category</AlertDialogTitle>
              <AlertDialogDescription className="py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          {...field}
                          placeholder="Coffee"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emoji"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Emoji</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          {...field}
                          placeholder="☕️"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
              <Button type="submit" disabled={isSubmitting}>
                Update
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
