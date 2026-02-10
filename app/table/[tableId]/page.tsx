import React from 'react'

function page({params}:{params:{tableId:string}}) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Table {params.tableId}
      </h1>
      <p className="mt-2 text-gray-600">
        Menu will appear here 🍕
      </p>
    </div>
  )
}

export default page
