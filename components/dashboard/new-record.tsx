"use client";

import NewRecordTitle from "./new-record-title";

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

const formSchema = z.object({
  amount: z.coerce.number().min(1, {
    message: "Amount is required",
  }),
  category: z.string().min(1, {
    message: "Category is required",
  }),
});

export default function NewRecord() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 1,
      category: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const date = `${day}. ${month}. ${year}.`;

  return (
    <div className="my-12 w-full rounded-sm bg-black/10 dark:bg-white/10 shadow-xl">
      <div className="py-12">
        <NewRecordTitle />
        <div className="flex justify-center mt-60">
          <Drawer>
            <DrawerTrigger>
              <PlusCircle
                size={40}
                className="hover:text-muted-foreground cursor-pointer"
              />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="text-center">Today: {date}</DrawerTitle>
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
                                    className="text-black dark:text-white border-none focus-visible:ring-transparent text-2xl"
                                    disabled={isSubmitting}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <p className="text-2xl mr-2">$</p>
                        </div>
                        <div className="w-full my-6 h-[1px] mx-auto bg-primary rounded-md max-w-80" />
                        <div className="flex justify-center">
                          <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={isSubmitting}
                                    {...field}
                                  >
                                    <SelectTrigger className="w-[180px]">
                                      <SelectValue placeholder="Choose a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="rent">
                                        🏠 Rent
                                      </SelectItem>
                                      <SelectItem value="clothes">
                                        👕 Clothes
                                      </SelectItem>
                                      <SelectItem value="coffee">
                                        ☕ Coffee
                                      </SelectItem>
                                      <SelectItem value="clubbing">
                                        🕺 Clubbing
                                      </SelectItem>
                                      <SelectItem value="gas">
                                        🚗 Gas
                                      </SelectItem>
                                      <SelectItem value="+">
                                        <div className="flex items-center gap-x-1">
                                          <PlusCircle size={20} />
                                          <p>Add a category</p>
                                        </div>
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <DrawerFooter>
                        <Button
                          type="submit"
                          className="w-40 mx-auto"
                          disabled={!isValid || isSubmitting}
                        >
                          Submit
                        </Button>
                        <DrawerClose>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-40 mx-auto"
                          >
                            Cancel
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
      </div>
    </div>
  );
}
