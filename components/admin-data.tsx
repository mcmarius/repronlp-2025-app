import { Suspense } from 'react'

import { auth } from "@/auth"
import AdminCreateUser from '@/components/admin-create-user'
import AdminUserList from '@/components/admin-user-list'
import AdminUserLogs from '@/components/admin-user-logs'
import AdminUserResponses from '@/components/admin-user-responses'

export default async function AdminData() {
    const session = await auth()
    // console.log(`admin data auth ${JSON.stringify(session)}`)
    const user = session?.user.name || 'unknown_user'

  return (
    <div>
      <AdminUserList user={user} />
      <hr/>
      <div>
        <h5>Create/update user</h5>
        <AdminCreateUser />
      </div>
      <hr/>

      {/*credits to https://github.com/dhiazfathra/nextjs-binary-file-download/blob/master/app/page.tsx */}

      <AdminUserLogs />
      <hr/>
      <AdminUserResponses />
    </div>
  )
}
