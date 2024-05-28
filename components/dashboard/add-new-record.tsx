import {
  Form,
  FormField,
  FormMessage,
  FormControl,
  FormItem,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { PlusCircle } from "lucide-react";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useLanguageStore from "@/store/useLanguageStore";

interface AddNewRecordProps {
  refreshExpenses: () => void;
  currency: string;
}

interface Category {
  name: string;
  emoji: string;
}

const t = useLanguageStore.getState().t;

const formSchema = z.object({
  amount: z
    .number()
    .positive()
    .nullable()
    .refine((val) => val !== null, { message: t("amount-required") }),
  category: z.string().min(1, {
    message: t("category-required"),
  }),
});

export default function AddNewRecord({
  refreshExpenses,
  currency,
}: AddNewRecordProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: null,
      category: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/expense", values);
      toast({
        title: t("add-expense-toast-success-title"),
        description: t("add-expense-toast-success-description"),
        variant: "success",
      });
      refreshExpenses();
      form.reset();
    } catch {
      toast({
        title: t("add-expense-toast-error-title"),
        description: t("add-expense-toast-error-title"),
        variant: "destructive",
      });
    }
  };

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await axios.get("/api/category");
        setCategories(response.data);
      } catch (error) {
        console.log("Error fetching categories: ", error);
      }
    }

    fetchCategory();
  }, []);

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const date = `${day}. ${month}. ${year}.`;

  const { toast } = useToast();

  return (
    <div className="flex justify-center mt-20">
      <Drawer>
        <DrawerTrigger>
          <PlusCircle
            size={40}
            className="hover:text-muted-foreground cursor-pointer"
          />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-center">
              {t("today")} {date}
            </DrawerTitle>
            <DrawerDescription>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="my-24">
                    <div className="flex items-center border rounded-md p-6 max-w-80 mx-auto">
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                className="text-black dark:text-white border-none focus-visible:ring-transparent text-2xl"
                                disabled={isSubmitting}
                                value={field.value || ""}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value === ""
                                      ? null
                                      : Number(e.target.value)
                                  )
                                }
                                placeholder="9.99"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <p className="text-2xl mr-2">{currency}</p>
                    </div>
                    <div
                      className={cn(
                        "w-full my-6 h-[1px] mx-auto rounded-md max-w-80",
                        categories.length > 0
                          ? "bg-primary"
                          : "bg-muted-foreground"
                      )}
                    />
                    <div className="flex justify-center">
                      {categories.length > 0 ? (
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange(value)
                                  }
                                  defaultValue={field.value}
                                  disabled={isSubmitting}
                                  {...field}
                                >
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue
                                      placeholder={t(
                                        "choose-category-placeholder"
                                      )}
                                    />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {categories.map((category) => (
                                      <SelectItem
                                        key={category.name}
                                        value={category.name}
                                      >
                                        {category.emoji} {category.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <p>{t("no-categories")}</p>
                      )}
                    </div>
                  </div>
                  <DrawerFooter>
                    <Button
                      type="submit"
                      className="w-40 mx-auto"
                      disabled={isSubmitting}
                    >
                      {t("submit")}
                    </Button>
                    <DrawerClose>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-40 mx-auto"
                      >
                        {t("cancel")}
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </form>
              </Form>
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
