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
import useLanguageStore from "@/store/useLanguageStore";

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
      await axios.patch("/api/category", { categoryId, ...values });
      toast({
        title: t("update-category-toast-success-title"),
        description: t("update-category-toast-success-description"),
        variant: "success",
      });
      onCategoryUpdated();
      form.reset();
    } catch {
      toast({
        title: t("update-category-toast-error-title"),
        description: t("update-category-toast-error-description"),
        variant: "destructive",
      });
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-white dark:text-black">{t("update")}</AlertDialogTrigger>
      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("update-title")}</AlertDialogTitle>
              <AlertDialogDescription className="py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("category-name-label")}</FormLabel>
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
              <AlertDialogCancel type="button">{t("cancel")}</AlertDialogCancel>
              <Button type="submit" disabled={isSubmitting}>
                {t("update")}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
