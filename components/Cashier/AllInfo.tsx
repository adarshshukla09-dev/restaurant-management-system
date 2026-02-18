import { readAllTable } from '@/server-actions/admin/tables/route'
import React from 'react'
import TCard from './TCard';

async function AllInfo() {
  const allTable = await readAllTable();
  const data = allTable?.data;

  return (
    <div className="max-w-7xl grid grid-cols-3 mx-auto my-2 gap-4">
      {data?.map((table) => (
        <TCard key={table.id} data={table} />
      ))}
      
    </div>
  )
}

export default AllInfo