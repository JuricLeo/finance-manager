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
import { Input } from "../ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import axios from "axios";

interface AddNewCategoryProps {
  onCategoryAdded: () => void;
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Category's name is required",
    })
    .max(50, {
      message: "Category's name can't be longer than 25 characters",
    }),
  emoji: z
    .string()
    .max(1, {
      message: "Emoji can't be longer than 1 character",
    })
    .optional(),
});

export default function AddNewCategory({ onCategoryAdded }: AddNewCategoryProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      emoji: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/category", values);
      toast({
        title: "Success!",
        description: "The category was successfully recorded",
        variant: "success",
      });
      onCategoryAdded();
      form.reset();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Please try again later. ( Additionally check if category's name was unique ).",
        variant: "destructive",
      });
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          Add
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AlertDialogHeader>
              <AlertDialogTitle>Add a new category</AlertDialogTitle>
              <AlertDialogDescription className="py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <p>Name</p>{" "}
                        <span className="text-rose-800 text-xs ml-2">
                          &#40;Category&apos;s name must be unique!&#41;
                        </span>
                      </FormLabel>
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
                Add
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
