import AllItem from "@/components/menu/AllItem";
import { readAll } from "@/server-actions/admin/menu/route";

type Data = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  foodType: "VEG" | "NONVEG";
  mealTime: "BREAKFAST" | "LUNCH" | "DINNER";
  category: string;
  createdAt: Date | null;
};
interface PageProps {
  searchParams: Promise<{ table?: string }>;
}

async function Page({ searchParams }: PageProps) {
  const params = await searchParams; // unwrap the promise
  const table = params.table; // now access table safely
  if (table == undefined) {
    return;
  }
  const menu = await readAll();
  const data: Data[] = menu?.data || [];
  console.log(table);
  return (
    <div className="container mx-auto py-10 space-y-10">
      <div className="flex flex-col items-center gap-4">
        <div className="flex justify-around gap-2 w-full">
          <AllItem data={data} table={table} />
        </div>
      </div>
    </div>
  );
}

export default Page;
