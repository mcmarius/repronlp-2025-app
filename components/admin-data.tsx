import { Suspense } from 'react'

import { auth } from "@/auth"
import AdminCreateUser from '@/components/admin-create-user'
import AdminUserList from '@/components/admin-user-list'
import AdminUserResponses from '@/components/admin-user-responses'

export default async function AdminData() {
    const session = await auth()
    // console.log(`admin data auth ${JSON.stringify(session)}`)
    const user = session?.user.name || 'unknown_user'

  return (
    <div>
      <h4 className="ml-4">User list</h4>
        <Suspense>
        <AdminUserList user={user} />
        </Suspense>
      <div>
        <h5>Create/update user</h5>
        <AdminCreateUser />
      </div>

      {/*credits to https://github.com/dhiazfathra/nextjs-binary-file-download/blob/master/app/page.tsx */}

      <AdminUserResponses />
    </div>
  )
}
