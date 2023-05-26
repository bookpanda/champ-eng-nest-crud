-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_listID_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_listID_fkey" FOREIGN KEY ("listID") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;
