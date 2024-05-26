"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

type Category = {
  name: string;
  emoji: string;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => <div className="min-w-48 text-xl">{info.getValue() as string}</div>,
  },
  {
    accessorKey: "emoji",
    header: "Emoji",
    cell: (info) => <div className="min-w-48 text-4xl">{info.getValue() as string}</div>,
  },
  {
    accessorKey: "actions",
    header: "",
    cell: () => {
      return (
        <div className="space-x-2 flex justify-end">
          <Button variant="update" className="w-20">
            Update
            {/* <UpdateModal categoryId={category.id} onUpdated={handleUpdatecategory} /> */}
          </Button>
          <Button variant="destructive" className="w-20">
            Delete
            {/* <DeleteModal categoryId={category.id} onDeleted={handleDeletecategory} /> */}
          </Button>
        </div>
      );
    },
  },
];
