import { graphql } from '@/gql';

export const GET_BLOGS = graphql(`
  query GetBlogs($input: GetBlogsFilterInput) {
    getBlogs(input: $input) {
      id
      name
      parentId
      ownerId
      ownerType
      createdAt
    }
  }
`);

export const CREATE_BLOG = graphql(`
  mutation CreateBlog($input: CreateBlogInput!) {
    createBlog(input: $input) {
      id
      name
      parentId
    }
  }
`);

export const GET_POSTS = graphql(`
  query GetPosts($input: GetPostsFilterInput) {
    getPosts(input: $input) {
      id
      blogId
      title
      content
      images
      documents
      creator
      createdAt
      updatedAt
    }
  }
`);

export const CREATE_POST = graphql(`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      blogId
      title
      content
      images
      documents
      createdAt
    }
  }
`);

export const UPDATE_POST = graphql(`
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(input: $input) {
      id
      title
      content
      images
      documents
      updatedAt
    }
  }
`);

export const DELETE_POST = graphql(`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`);

export const GET_POST = graphql(`
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      blogId
      title
      content
      images
      createdAt
      updatedAt
    }
  }
`);