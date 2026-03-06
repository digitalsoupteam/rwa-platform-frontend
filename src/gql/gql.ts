/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation Authenticate($input: AuthenticateInput!) {\n    authenticate(input: $input) {\n      userId\n      wallet\n      accessToken\n      refreshToken\n    }\n  }\n": typeof types.AuthenticateDocument,
    "\n  mutation RefreshToken($input: RefreshTokenInput!) {\n    refreshToken(input: $input) {\n      userId\n      wallet\n      accessToken\n      refreshToken\n    }\n  }\n": typeof types.RefreshTokenDocument,
    "\n  mutation RevokeTokens($input: RevokeTokensInput!) {\n    revokeTokens(input: $input) {\n      revokedCount\n    }\n  }\n": typeof types.RevokeTokensDocument,
    "\n  query GetUserTokens {\n    getUserTokens {\n      tokenId\n      userId\n      tokenHash\n      expiresAt\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetUserTokensDocument,
    "\n  query GetBlogs($input: GetBlogsFilterInput) {\n    getBlogs(input: $input) {\n      id\n      name\n      parentId\n      ownerId\n      ownerType\n      createdAt\n    }\n  }\n": typeof types.GetBlogsDocument,
    "\n  mutation CreateBlog($input: CreateBlogInput!) {\n    createBlog(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n": typeof types.CreateBlogDocument,
    "\n  query GetPosts($input: GetPostsFilterInput) {\n    getPosts(input: $input) {\n      id\n      blogId\n      title\n      content\n      images\n      documents\n      creator\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetPostsDocument,
    "\n  mutation CreatePost($input: CreatePostInput!) {\n    createPost(input: $input) {\n      id\n      blogId\n      title\n      content\n      images\n      documents\n      createdAt\n    }\n  }\n": typeof types.CreatePostDocument,
    "\n  mutation UpdatePost($input: UpdatePostInput!) {\n    updatePost(input: $input) {\n      id\n      title\n      content\n      images\n      documents\n      updatedAt\n    }\n  }\n": typeof types.UpdatePostDocument,
    "\n  mutation DeletePost($id: ID!) {\n    deletePost(id: $id)\n  }\n": typeof types.DeletePostDocument,
    "\n  query GetPost($id: ID!) {\n    getPost(id: $id) {\n      id\n      blogId\n      title\n      content\n      images\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetPostDocument,
    "\n  query GetBusiness($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetBusinessDocument,
    "\n  mutation CreateBusiness($input: CreateBusinessInput!) {\n    createBusiness(input: $input) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateBusinessDocument,
    "\n  query GetBusinesses($input: FilterInput!) {\n    getBusinesses(input: $input) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetBusinessesDocument,
    "\n  mutation CreateCompany($input: CreateCompanyInput!) {\n    createCompany(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateCompanyDocument,
    "\n  query GetCompanies($input: GetCompaniesInput) {\n    getCompanies(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetCompaniesDocument,
    "\n  query GetCompany($id: ID!) {\n    getCompany(id: $id) {\n      id\n      name\n      description\n      ownerId\n      users {\n        id\n        userId\n        name\n        permissions {\n          id\n          permission\n          entity\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetCompanyDocument,
    "\n  mutation UpdateCompany($input: UpdateCompanyInput!) {\n    updateCompany(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateCompanyDocument,
    "\n  mutation DeleteCompany($id: ID!) {\n    deleteCompany(id: $id)\n  }\n": typeof types.DeleteCompanyDocument,
    "\n  query GetGalleries($input: GetGalleriesFilterInput) {\n    getGalleries(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n": typeof types.GetGalleriesDocument,
    "\n  mutation CreateGallery($input: CreateGalleryInput!) {\n    createGallery(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n": typeof types.CreateGalleryDocument,
};
const documents: Documents = {
    "\n  mutation Authenticate($input: AuthenticateInput!) {\n    authenticate(input: $input) {\n      userId\n      wallet\n      accessToken\n      refreshToken\n    }\n  }\n": types.AuthenticateDocument,
    "\n  mutation RefreshToken($input: RefreshTokenInput!) {\n    refreshToken(input: $input) {\n      userId\n      wallet\n      accessToken\n      refreshToken\n    }\n  }\n": types.RefreshTokenDocument,
    "\n  mutation RevokeTokens($input: RevokeTokensInput!) {\n    revokeTokens(input: $input) {\n      revokedCount\n    }\n  }\n": types.RevokeTokensDocument,
    "\n  query GetUserTokens {\n    getUserTokens {\n      tokenId\n      userId\n      tokenHash\n      expiresAt\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetUserTokensDocument,
    "\n  query GetBlogs($input: GetBlogsFilterInput) {\n    getBlogs(input: $input) {\n      id\n      name\n      parentId\n      ownerId\n      ownerType\n      createdAt\n    }\n  }\n": types.GetBlogsDocument,
    "\n  mutation CreateBlog($input: CreateBlogInput!) {\n    createBlog(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n": types.CreateBlogDocument,
    "\n  query GetPosts($input: GetPostsFilterInput) {\n    getPosts(input: $input) {\n      id\n      blogId\n      title\n      content\n      images\n      documents\n      creator\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetPostsDocument,
    "\n  mutation CreatePost($input: CreatePostInput!) {\n    createPost(input: $input) {\n      id\n      blogId\n      title\n      content\n      images\n      documents\n      createdAt\n    }\n  }\n": types.CreatePostDocument,
    "\n  mutation UpdatePost($input: UpdatePostInput!) {\n    updatePost(input: $input) {\n      id\n      title\n      content\n      images\n      documents\n      updatedAt\n    }\n  }\n": types.UpdatePostDocument,
    "\n  mutation DeletePost($id: ID!) {\n    deletePost(id: $id)\n  }\n": types.DeletePostDocument,
    "\n  query GetPost($id: ID!) {\n    getPost(id: $id) {\n      id\n      blogId\n      title\n      content\n      images\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetPostDocument,
    "\n  query GetBusiness($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetBusinessDocument,
    "\n  mutation CreateBusiness($input: CreateBusinessInput!) {\n    createBusiness(input: $input) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateBusinessDocument,
    "\n  query GetBusinesses($input: FilterInput!) {\n    getBusinesses(input: $input) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetBusinessesDocument,
    "\n  mutation CreateCompany($input: CreateCompanyInput!) {\n    createCompany(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateCompanyDocument,
    "\n  query GetCompanies($input: GetCompaniesInput) {\n    getCompanies(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetCompaniesDocument,
    "\n  query GetCompany($id: ID!) {\n    getCompany(id: $id) {\n      id\n      name\n      description\n      ownerId\n      users {\n        id\n        userId\n        name\n        permissions {\n          id\n          permission\n          entity\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetCompanyDocument,
    "\n  mutation UpdateCompany($input: UpdateCompanyInput!) {\n    updateCompany(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateCompanyDocument,
    "\n  mutation DeleteCompany($id: ID!) {\n    deleteCompany(id: $id)\n  }\n": types.DeleteCompanyDocument,
    "\n  query GetGalleries($input: GetGalleriesFilterInput) {\n    getGalleries(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n": types.GetGalleriesDocument,
    "\n  mutation CreateGallery($input: CreateGalleryInput!) {\n    createGallery(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n": types.CreateGalleryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Authenticate($input: AuthenticateInput!) {\n    authenticate(input: $input) {\n      userId\n      wallet\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation Authenticate($input: AuthenticateInput!) {\n    authenticate(input: $input) {\n      userId\n      wallet\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RefreshToken($input: RefreshTokenInput!) {\n    refreshToken(input: $input) {\n      userId\n      wallet\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation RefreshToken($input: RefreshTokenInput!) {\n    refreshToken(input: $input) {\n      userId\n      wallet\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RevokeTokens($input: RevokeTokensInput!) {\n    revokeTokens(input: $input) {\n      revokedCount\n    }\n  }\n"): (typeof documents)["\n  mutation RevokeTokens($input: RevokeTokensInput!) {\n    revokeTokens(input: $input) {\n      revokedCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserTokens {\n    getUserTokens {\n      tokenId\n      userId\n      tokenHash\n      expiresAt\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetUserTokens {\n    getUserTokens {\n      tokenId\n      userId\n      tokenHash\n      expiresAt\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBlogs($input: GetBlogsFilterInput) {\n    getBlogs(input: $input) {\n      id\n      name\n      parentId\n      ownerId\n      ownerType\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetBlogs($input: GetBlogsFilterInput) {\n    getBlogs(input: $input) {\n      id\n      name\n      parentId\n      ownerId\n      ownerType\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBlog($input: CreateBlogInput!) {\n    createBlog(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBlog($input: CreateBlogInput!) {\n    createBlog(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPosts($input: GetPostsFilterInput) {\n    getPosts(input: $input) {\n      id\n      blogId\n      title\n      content\n      images\n      documents\n      creator\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetPosts($input: GetPostsFilterInput) {\n    getPosts(input: $input) {\n      id\n      blogId\n      title\n      content\n      images\n      documents\n      creator\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePost($input: CreatePostInput!) {\n    createPost(input: $input) {\n      id\n      blogId\n      title\n      content\n      images\n      documents\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePost($input: CreatePostInput!) {\n    createPost(input: $input) {\n      id\n      blogId\n      title\n      content\n      images\n      documents\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePost($input: UpdatePostInput!) {\n    updatePost(input: $input) {\n      id\n      title\n      content\n      images\n      documents\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePost($input: UpdatePostInput!) {\n    updatePost(input: $input) {\n      id\n      title\n      content\n      images\n      documents\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeletePost($id: ID!) {\n    deletePost(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeletePost($id: ID!) {\n    deletePost(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPost($id: ID!) {\n    getPost(id: $id) {\n      id\n      blogId\n      title\n      content\n      images\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetPost($id: ID!) {\n    getPost(id: $id) {\n      id\n      blogId\n      title\n      content\n      images\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBusiness($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetBusiness($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBusiness($input: CreateBusinessInput!) {\n    createBusiness(input: $input) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBusiness($input: CreateBusinessInput!) {\n    createBusiness(input: $input) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBusinesses($input: FilterInput!) {\n    getBusinesses(input: $input) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetBusinesses($input: FilterInput!) {\n    getBusinesses(input: $input) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCompany($input: CreateCompanyInput!) {\n    createCompany(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCompany($input: CreateCompanyInput!) {\n    createCompany(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCompanies($input: GetCompaniesInput) {\n    getCompanies(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetCompanies($input: GetCompaniesInput) {\n    getCompanies(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCompany($id: ID!) {\n    getCompany(id: $id) {\n      id\n      name\n      description\n      ownerId\n      users {\n        id\n        userId\n        name\n        permissions {\n          id\n          permission\n          entity\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetCompany($id: ID!) {\n    getCompany(id: $id) {\n      id\n      name\n      description\n      ownerId\n      users {\n        id\n        userId\n        name\n        permissions {\n          id\n          permission\n          entity\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCompany($input: UpdateCompanyInput!) {\n    updateCompany(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCompany($input: UpdateCompanyInput!) {\n    updateCompany(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteCompany($id: ID!) {\n    deleteCompany(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteCompany($id: ID!) {\n    deleteCompany(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetGalleries($input: GetGalleriesFilterInput) {\n    getGalleries(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n"): (typeof documents)["\n  query GetGalleries($input: GetGalleriesFilterInput) {\n    getGalleries(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateGallery($input: CreateGalleryInput!) {\n    createGallery(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateGallery($input: CreateGalleryInput!) {\n    createGallery(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;