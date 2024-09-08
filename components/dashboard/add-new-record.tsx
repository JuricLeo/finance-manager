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
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useLanguageStore from "@/store/useLanguageStore";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { Calendar as CalendarIcon } from "lucide-react";

import { format } from "date-fns";

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
  date: z.date(),
});

export default function AddNewRecord({
  refreshExpenses,
  currency,
}: AddNewRecordProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // @ts-ignore
      amount: null,
      category: "",
      date: new Date(),
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/expense", {
        ...values,
        date: values.date.toISOString(),
      });
      toast({
        title: t("add-expense-toast-success-title"),
        description: t("add-expense-toast-success-description"),
        variant: "success",
      });
      refreshExpenses();
      form.reset({
        // @ts-ignore
        amount: null,
        category: "",
        date: new Date(),
      });
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

  const selectedDate = form.watch("date");

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
          <DrawerHeader style={{ pointerEvents: "auto" }}>
            <DrawerTitle className="flex justify-center items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-center text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  style={{ pointerEvents: "auto" }}
                >
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(newDate) =>
                      form.setValue("date", newDate || new Date())
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
                        <p className="text-rose-600">{t("no-categories")}</p>
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
