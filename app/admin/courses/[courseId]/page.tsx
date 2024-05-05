
import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from '@/components/layout/layout'
import { Typography } from '@/components/ui/Typography'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {getRequiredAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { getCourse } from './course.query'
import { buttonVariants } from '@/components/ui/button'

const CoursePage = async ({params, searchParams} : {params: {courseId: string}; searchParams:{[key: string]: string |string[] | undefined} }) => {
  
  const page = Number(searchParams.page ?? 1);
  console.log({ page });
  const session = await getRequiredAuthSession()

  const course = await getCourse({courseId: params.courseId, userId: session.user.id, userPage: page})

  console.log(course)
  
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>
          Courses
          </LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
        <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
        <Table>
          <TableHeader>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
          </TableHeader>
          <TableBody>
            {course.users?.map((user) => (
              <TableRow>
                <TableCell>
                      <Avatar className="rounded">
                        <AvatarFallback>{user.email?.[0]}</AvatarFallback>
                        {user.image && (
                          <AvatarImage src={user.image} alt={user.name ?? ""} />
                        )}
                      </Avatar>
                </TableCell>
                <TableCell>
                      <Typography
                        as={Link}
                        variant="large"
                        // href={`/admin/courses/${course.id}`}
                        href={`/admin/users/${user.id}`}
                      >
                        {user.email}
                      </Typography>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex-row items-center gap-4 space-y-0">
            <Avatar className="rounded">
              <AvatarFallback>{course.name?.[0]}</AvatarFallback>
              {course.image && (
                <AvatarImage src={course.image} alt={course.name ?? ''} />
              )}
            </Avatar>
            <CardTitle>{course.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <Typography>{course._count?.users} users</Typography>
            <Typography>{course._count?.lessons} lessons</Typography>
            <Link
              href={`/admin/courses/${course.id}/edit`}
              className={buttonVariants({
                variant: 'outline',
              })}
            >
              Edit
            </Link>{' '}
            <Link
              href={`/admin/courses/${course.id}/lessons`}
              className={buttonVariants({
                variant: 'outline',
              })}
            >
              Edit lessons
            </Link>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  )
}

export default CoursePage