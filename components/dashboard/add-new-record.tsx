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

const formSchema = z.object({
  amount: z
    .number()
    .positive()
    .nullable()
    .refine((val) => val !== null, { message: "Amount is required" }),
  category: z.string().min(1, {
    message: "Category is required",
  }),
});

export default function AddNewRecord() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: null,
      category: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/expense", values);
      toast({
        title: "Success!",
        description: "The expense was successfully recorded",
        variant: "success",
      });
    } catch {
      toast({
        title: "Something went wrong.",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

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
                                onValueChange={(value) => field.onChange(value.toLowerCase())}
                                defaultValue={field.value}
                                disabled={isSubmitting}
                                {...field}
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Choose a category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="rent">🏠 Rent</SelectItem>
                                  <SelectItem value="clothes">
                                    👕 Clothes
                                  </SelectItem>
                                  <SelectItem value="coffee">
                                    ☕ Coffee
                                  </SelectItem>
                                  <SelectItem value="clubbing">
                                    🕺 Clubbing
                                  </SelectItem>
                                  <SelectItem value="gas">🚗 Gas</SelectItem>
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
  );
}
