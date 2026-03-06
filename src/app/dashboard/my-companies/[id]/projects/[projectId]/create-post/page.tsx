'use client';

import React, { FC, FormEventHandler, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout, Wrapper } from '@/components/layout';
import { Breadcrumbs } from '@/components/dashboard';
import { Button, Title, toast } from '@/components/ui';
import { useMutation, useQuery } from '@apollo/client/react';
import { CREATE_BLOG, CREATE_POST, GET_BLOGS } from '@/lib/blog/operations';
import { GET_BUSINESS } from '@/lib/business/operations';
import { GET_COMPANY } from '@/lib/company/operations';
import { BlogParentTypes } from '@/gql/graphql';
import { PostEditor, PostEditorHandle } from '@/components/news';

const CreatePostPage: FC = () => {
  const params = useParams();
  const router = useRouter();
  const companyId = params.id as string;
  const projectId = params.projectId as string;

  const editorRef = useRef<PostEditorHandle>(null);

  const { data: companyData } = useQuery(GET_COMPANY, { variables: { id: companyId }, skip: !companyId });
  const { data: businessData } = useQuery(GET_BUSINESS, { variables: { id: projectId }, skip: !projectId });
  const { data: blogsData, refetch: refetchBlogs } = useQuery(GET_BLOGS, {
    variables: { input: { filter: { parentId: projectId } } },
  });

  const [createBlog] = useMutation(CREATE_BLOG);
  const [createPost, { loading: creatingPost }] = useMutation(CREATE_POST);

  const company = companyData?.getCompany;
  const project = businessData?.getBusiness;
  const blog = blogsData?.getBlogs[0];

  const ensureBlog = async (): Promise<string> => {
    if (blog?.id) return blog.id;
    const result = await createBlog({
      variables: { input: { name: project?.name ?? 'News', parentId: projectId, type: BlogParentTypes.Business } },
    });
    await refetchBlogs();
    return result.data!.createBlog.id;
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = async evt => {
    evt.preventDefault();

    const data = editorRef.current?.getData();
    if (!data) return;

    try {
      const blogId = await ensureBlog();
      await createPost({
        variables: {
          input: { blogId, title: data.title, content: data.content, images: data.imageLinks },
        },
      });
      toast('Post published!');
      router.push(`/dashboard/my-companies/${companyId}/projects/${projectId}`);
    } catch {
      toast('Failed to publish post.', 'error');
    }
  };

  const isUploading = editorRef.current?.isUploading() ?? false;

  return (
    <DashboardLayout>
      <form onSubmit={submitHandler}>
        <section className={'mb-12'}>
          <Wrapper>
            {company?.name && project?.name && (
              <Breadcrumbs
                items={[
                  { name: 'My companies', url: '/dashboard/' },
                  { name: company.name, url: `/dashboard/my-companies/${companyId}` },
                  { name: project.name, url: `/dashboard/my-companies/${companyId}/projects/${projectId}` },
                ]}
                currentItem={'Create Post'}
              />
            )}
            <div className={'border-b-1 border-stroke-primary pb-6 flex justify-between'}>
              <Title size={'xs'}>New post</Title>
              <div className={'flex items-center gap-3'}>
                <Button
                  visualType={'quinary'}
                  type={'button'}
                  onClick={() => router.push(`/dashboard/my-companies/${companyId}/projects/${projectId}`)}
                >
                  Cancel
                </Button>
                <Button className={'h-full'} visualType={'quaternary'} type={'submit'} disabled={creatingPost || isUploading}>
                  Publish
                </Button>
              </div>
            </div>
          </Wrapper>
        </section>

        <section>
          <Wrapper>
            <PostEditor ref={editorRef} projectId={projectId} projectName={project?.name} />
          </Wrapper>
        </section>
      </form>
    </DashboardLayout>
  );
};

export default CreatePostPage;