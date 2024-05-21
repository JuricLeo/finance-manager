import { PlusCircle } from "lucide-react";
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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewRecord() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const date = `${day}. ${month}. ${year}.`;

  return (
    <div className="my-12 w-full border rounded-sm">
      <div className="py-12">
        <h2 className="text-center text-xl">Add a new expense</h2>
        <div className="text-center mt-12">
          <h2 className="text-muted-foreground">Total expenses today</h2>
          <h2 className="text-4xl text-[#d19b45] dark:text-[#E8B86B] mt-4">
            496 $
          </h2>
        </div>
        <div className="flex justify-center mt-60">
          <Drawer>
            <DrawerTrigger>
              <PlusCircle
                size={40}
                className="hover:text-muted-foreground cursor-pointer"
              />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="mx-auto">
                <DrawerTitle className="text-center">Today: {date}</DrawerTitle>
                <DrawerDescription className="my-24">
                  <div className="flex items-center border rounded-md p-6">
                    <Input
                      type="number"
                      placeholder="9.99"
                      className="text-white border-none focus-visible:ring-transparent text-2xl"
                    />
                    <p className="text-2xl mr-2">$</p>
                  </div>
                  <div className="w-full my-6 h-[1px] mx-auto bg-primary rounded-md" />
                  <div className="flex justify-center">
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Choose a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rent">🏠 Rent</SelectItem>
                        <SelectItem value="clothes">👕 Clothes</SelectItem>
                        <SelectItem value="coffee">☕ Coffee</SelectItem>
                        <SelectItem value="clubbing">🕺 Clubbing</SelectItem>
                        <SelectItem value="gas">🚗 Gas</SelectItem>
                        <SelectItem value="+">
                          <div className="flex items-center gap-x-1">
                            <PlusCircle size={20} />
                            <p>Add a category</p>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button className="mx-auto w-40">Submit</Button>
                <DrawerClose>
                  <Button variant="outline" className="w-40">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}
