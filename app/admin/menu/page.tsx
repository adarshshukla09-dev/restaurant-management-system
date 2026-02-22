// app/admin/menu/page.tsx
import { CreateMenuComp } from '@/components/menu/CreateItems'

export default function Page() {
  return (
    <div className='min-h-screen bg-[#F8FAFC] flex justify-center items-start py-10'>
      <div className='w-full max-w-7xl px-4'>
         <CreateMenuComp/>
      </div>
    </div>
  )
}