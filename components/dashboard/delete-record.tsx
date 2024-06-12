import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "../ui/use-toast";
import { CircleMinus } from "lucide-react";

import axios from "axios";

import useLanguageStore from "@/store/useLanguageStore";

interface DeleteRecordProps {
  expenseId: string;
  onExpenseDeleted: () => void;
}

export default function DeleteRecord({
  expenseId,
  onExpenseDeleted,
}: DeleteRecordProps) {
  const { t } = useLanguageStore();

  const onDelete = async () => {
    await axios.delete("/api/expense", { data: { expenseId } });
    try {
      toast({
        title: t("delete-expense-toast-success-title"),
        description: t("delete-expense-toast-success-description"),
        variant: "success",
      });
      onExpenseDeleted();
    } catch {
      toast({
        title: t("delete-expense-toast-error-title"),
        description: t("delete-expense-toast-error-description"),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mx-auto mt-4 mb-4 md:mt-0 md:mb-0">
      <AlertDialog>
        <AlertDialogTrigger>
          <CircleMinus className="md:ml-4 md:mt-4 text-rose-400 cursor-pointer" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("delete-expense-title")}</AlertDialogTitle>
            <AlertDialogDescription className="py-2">
              {t("delete-expense-description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>
              {t("delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
