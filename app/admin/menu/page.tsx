// app/admin/menu/page.tsx
import { CreateMenuComp } from '@/components/menu/CreateItems'
import { auth } from '@/lib/utils/auth';
import { requireAdmin } from '@/server-actions/admin/auth/route'
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
 
export default async function Page() {
   const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    if (!session) {
      redirect("/register");
    }
await requireAdmin()



  return (
    <div className='min-h-screen bg-[#F8FAFC] flex justify-center items-start py-10'>
      <div className='w-full max-w-7xl px-4'>
         <CreateMenuComp/>
      </div>
    </div>
  )
}