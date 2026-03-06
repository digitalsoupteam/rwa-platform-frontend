'use client';

import React, { FC, FormEventHandler, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout, Wrapper } from '@/components/layout';
import { Breadcrumbs } from '@/components/dashboard';
import { Button, Title, toast } from '@/components/ui';
import { DeleteConfirmModal } from '@/components/common';
import { useMutation, useQuery } from '@apollo/client/react';
import { GET_COMPANY } from '@/lib/company/operations';
import { GET_BUSINESS } from '@/lib/business/operations';
import { DELETE_POST, GET_POST, UPDATE_POST } from '@/lib/blog/operations';
import { PostEditor, PostEditorHandle } from '@/components/news';

const EditPostPage: FC = () => {
  const params = useParams();
  const router = useRouter();
  const companyId = params.id as string;
  const projectId = params.projectId as string;
  const postId = params.postId as string;

  const editorRef = useRef<PostEditorHandle>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { data: companyData } = useQuery(GET_COMPANY, { variables: { id: companyId }, skip: !companyId });
  const { data: businessData } = useQuery(GET_BUSINESS, { variables: { id: projectId }, skip: !projectId });
  const { data: postData, loading: postLoading } = useQuery(GET_POST, { variables: { id: postId }, skip: !postId });

  const [updatePost, { loading: updatingPost }] = useMutation(UPDATE_POST);
  const [deletePost, { loading: deletingPost }] = useMutation(DELETE_POST);

  const company = companyData?.getCompany;
  const project = businessData?.getBusiness;
  const post = postData?.getPost;

  const submitHandler: FormEventHandler<HTMLFormElement> = async evt => {
    evt.preventDefault();

    const data = editorRef.current?.getData();
    if (!data) return;

    try {
      await updatePost({
        variables: {
          input: { id: postId, updateData: { title: data.title, content: data.content, images: data.imageLinks } },
        },
      });
      toast('Post updated!');
      router.push(`/dashboard/my-companies/${companyId}/projects/${projectId}`);
    } catch {
      toast('Failed to update post.', 'error');
    }
  };

  const deleteHandler = async () => {
    try {
      await deletePost({ variables: { id: postId } });
      toast('Post deleted.');
      router.push(`/dashboard/my-companies/${companyId}/projects/${projectId}`);
    } catch {
      toast('Failed to delete post.', 'error');
    }
  };

  const isUploading = editorRef.current?.isUploading() ?? false;

  if (postLoading || !post) return null;

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
                currentItem={'Edit Post'}
              />
            )}
            <div className={'border-b-1 border-stroke-primary pb-6 flex justify-between'}>
              <Title size={'xs'}>Edit post</Title>
              <div className={'flex items-center gap-3'}>
                <Button
                  visualType={'quinary'}
                  type={'button'}
                  onClick={() => setDeleteModalOpen(true)}
                >
                  Delete
                </Button>
                <Button
                  visualType={'quinary'}
                  type={'button'}
                  onClick={() => router.push(`/dashboard/my-companies/${companyId}/projects/${projectId}`)}
                >
                  Cancel
                </Button>
                <Button className={'h-full'} visualType={'quaternary'} type={'submit'} disabled={updatingPost || isUploading}>
                  Save
                </Button>
              </div>
            </div>
          </Wrapper>
        </section>

        <section>
          <Wrapper>
            <PostEditor
              ref={editorRef}
              projectId={projectId}
              projectName={project?.name}
              initialTitle={post.title}
              initialContent={post.content}
            />
          </Wrapper>
        </section>
      </form>

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        description={'This action cannot be undone.'}
        loading={deletingPost}
        onConfirm={deleteHandler}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </DashboardLayout>
  );
};

export default EditPostPage;
