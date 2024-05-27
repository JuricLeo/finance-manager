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
import useLanguageStore from "@/store/useLanguageStore";

interface AddNewCategoryProps {
  onCategoryAdded: () => void;
}

const t = useLanguageStore.getState().t;

const emojiRegex = /^(?:|\p{Emoji_Presentation}|\p{Emoji}\uFE0F)$/u;

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: t("category-name-required"),
    })
    .max(25, {
      message: t("category-name-max"),
    }),
  emoji: z
    .string()
    .regex(emojiRegex, {
      message: t("invalid-emoji"),
    })
    .optional(),
});

export default function AddNewCategory({
  onCategoryAdded,
}: AddNewCategoryProps) {
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
        title: t("add-category-toast-success-title"),
        description: t("add-category-toast-success-description"),
        variant: "success",
      });
      onCategoryAdded();
      form.reset();
    } catch (error) {
      toast({
        title: t("add-category-toast-error-title"),
        description: t("add-category-toast-error-description"),
        variant: "destructive",
      });
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          {t("add-button")}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("add-category-title")}</AlertDialogTitle>
              <AlertDialogDescription className="py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <p>{t("category-name-label")}</p>{" "}
                        <span className="text-rose-800 text-xs ml-2">
                          {t("category-unique")}
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          {...field}
                          placeholder={t("coffee")}
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
                          placeholder="✅"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel type="button">{t("cancel")}</AlertDialogCancel>
              <Button type="submit" disabled={isSubmitting}>
                {t("add-button")}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
