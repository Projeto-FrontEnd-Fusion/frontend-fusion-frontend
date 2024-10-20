"use client"

import { CircleCheckBig } from 'lucide-react'

import { useUsers } from "@/hooks/users/useUsers/useUsers";

export default function Users() {
  const { data, loading } = useUsers();

  return (
    <div>
      <span>Users List</span>
      <div className='m-4'>
        {
          (!loading && data.length > 0) &&
          data.map((item, index) => (
            <div key={index} className='p-4 rounded-md border-black/25 border w-fit'>
              <div>
                <div className='flex flex-row items-center'>
                  <span className='text-black/75 font-semibold'>{item.username}</span>
                  {item.isVerified && <CircleCheckBig className='text-green-600' size={16} />}
                </div>
                <span className='text-sm text-black/50'>{item.email}</span>
              </div>
              <div className='flex flex-row items-center'>
                <span className="text-sm lowercase">Member since</span>
                <span className='text-sm font-semibold'>{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          )
          )
        }
      </div>
    </div>
  )
}