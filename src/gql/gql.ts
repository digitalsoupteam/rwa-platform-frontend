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
    "\n  query GetBusiness($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      name\n      description\n      tags\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetBusinessDocument,
    "\n  query GetBusinessDeployInfo($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      ownerId\n      ownerType\n      ownerWallet\n      tokenAddress\n      approvalSignaturesTaskId\n      approvalSignaturesTaskExpired\n    }\n  }\n": typeof types.GetBusinessDeployInfoDocument,
    "\n  mutation RequestBusinessApprovalSignatures($input: RequestBusinessApprovalSignaturesInput!) {\n    requestBusinessApprovalSignatures(input: $input) {\n      taskId\n    }\n  }\n": typeof types.RequestBusinessApprovalSignaturesDocument,
    "\n  mutation RejectBusinessApprovalSignatures($id: ID!) {\n    rejectBusinessApprovalSignatures(id: $id)\n  }\n": typeof types.RejectBusinessApprovalSignaturesDocument,
    "\n  mutation CreateBusiness($input: CreateBusinessInput!) {\n    createBusiness(input: $input) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateBusinessDocument,
    "\n  mutation EditBusiness($input: EditBusinessInput!) {\n    editBusiness(input: $input) {\n      id\n      name\n      description\n    }\n  }\n": typeof types.EditBusinessDocument,
    "\n  query GetBusinesses($input: FilterInput!) {\n    getBusinesses(input: $input) {\n      id\n      name\n      description\n      tags\n      riskScore\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetBusinessesDocument,
    "\n  mutation CreateCompany($input: CreateCompanyInput!) {\n    createCompany(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateCompanyDocument,
    "\n  query GetCompanies($input: GetCompaniesInput) {\n    getCompanies(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetCompaniesDocument,
    "\n  query GetCompany($id: ID!) {\n    getCompany(id: $id) {\n      id\n      name\n      description\n      ownerId\n      users {\n        id\n        userId\n        name\n        permissions {\n          id\n          permission\n          entity\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetCompanyDocument,
    "\n  mutation UpdateCompany($input: UpdateCompanyInput!) {\n    updateCompany(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateCompanyDocument,
    "\n  mutation DeleteCompany($id: ID!) {\n    deleteCompany(id: $id)\n  }\n": typeof types.DeleteCompanyDocument,
    "\n  mutation AddMember($input: AddMemberInput!) {\n    addMember(input: $input) {\n      id\n      userId\n      name\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.AddMemberDocument,
    "\n  mutation RemoveMember($input: RemoveMemberInput!) {\n    removeMember(input: $input)\n  }\n": typeof types.RemoveMemberDocument,
    "\n  query GetFoldersForDocs($input: GetFoldersFilterInput) {\n    getFolders(input: $input) {\n      id\n      name\n      parentId\n      ownerId\n      ownerType\n    }\n  }\n": typeof types.GetFoldersForDocsDocument,
    "\n  mutation CreateFolderForDocs($input: CreateFolderInput!) {\n    createFolder(input: $input) {\n      id\n      name\n      parentId\n      ownerId\n      ownerType\n    }\n  }\n": typeof types.CreateFolderForDocsDocument,
    "\n  query GetDocuments($input: GetDocumentsFilterInput) {\n    getDocuments(input: $input) {\n      id\n      folderId\n      name\n      link\n      ownerId\n      ownerType\n      creator\n      parentId\n      grandParentId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetDocumentsDocument,
    "\n  mutation DeleteDocument($id: ID!) {\n    deleteDocument(id: $id)\n  }\n": typeof types.DeleteDocumentDocument,
    "\n  mutation UpdateDocumentMeta($input: UpdateDocumentInput!) {\n    updateDocument(input: $input) {\n      id\n      folderId\n      name\n      link\n      ownerId\n      ownerType\n      creator\n      parentId\n      grandParentId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateDocumentMetaDocument,
    "\n  query GetFaqTopics($input: GetFaqTopicsFilterInput) {\n    getFaqTopics(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n": typeof types.GetFaqTopicsDocument,
    "\n  mutation CreateFaqTopic($input: CreateFaqTopicInput!) {\n    createFaqTopic(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n": typeof types.CreateFaqTopicDocument,
    "\n  query GetFaqAnswers($input: GetFaqAnswersFilterInput) {\n    getFaqAnswers(input: $input) {\n      id\n      topicId\n      question\n      answer\n      order\n      createdAt\n    }\n  }\n": typeof types.GetFaqAnswersDocument,
    "\n  query GetFaqAnswer($id: ID!) {\n    getFaqAnswer(id: $id) {\n      id\n      topicId\n      question\n      answer\n      order\n      createdAt\n    }\n  }\n": typeof types.GetFaqAnswerDocument,
    "\n  mutation CreateFaqAnswer($input: CreateFaqAnswerInput!) {\n    createFaqAnswer(input: $input) {\n      id\n      topicId\n      question\n      answer\n      createdAt\n    }\n  }\n": typeof types.CreateFaqAnswerDocument,
    "\n  mutation UpdateFaqAnswer($input: UpdateFaqAnswerInput!) {\n    updateFaqAnswer(input: $input) {\n      id\n      question\n      answer\n      updatedAt\n    }\n  }\n": typeof types.UpdateFaqAnswerDocument,
    "\n  mutation DeleteFaqAnswer($id: ID!) {\n    deleteFaqAnswer(id: $id)\n  }\n": typeof types.DeleteFaqAnswerDocument,
    "\n  query GetUnlockTime {\n    getUnlockTime {\n      gasUnlockTime\n      holdUnlockTime\n      platformUnlockTime\n    }\n  }\n": typeof types.GetUnlockTimeDocument,
    "\n  mutation RequestGas($input: RequestTokenInput!) {\n    requestGas(input: $input) {\n      id\n      tokenType\n      amount\n      transactionHash\n    }\n  }\n": typeof types.RequestGasDocument,
    "\n  mutation RequestHold($input: RequestTokenInput!) {\n    requestHold(input: $input) {\n      id\n      tokenType\n      amount\n      transactionHash\n    }\n  }\n": typeof types.RequestHoldDocument,
    "\n  query GetGalleries($input: GetGalleriesFilterInput) {\n    getGalleries(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n": typeof types.GetGalleriesDocument,
    "\n  mutation CreateGallery($input: CreateGalleryInput!) {\n    createGallery(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n": typeof types.CreateGalleryDocument,
    "\n  query GetPools($input: FilterInput!) {\n    getPools(input: $input) {\n      id\n      name\n      description\n      poolAddress\n      expectedHoldAmount\n      rewardPercent\n      entryPeriodStart\n      entryPeriodExpired\n      completionPeriodExpired\n      paused\n      chainId\n      createdAt\n    }\n  }\n": typeof types.GetPoolsDocument,
    "\n  mutation CreatePool($input: CreatePoolInput!) {\n    createPool(input: $input) {\n      id\n      rwaAddress\n      chainId\n      ownerId\n      ownerType\n      entryFeePercent\n      exitFeePercent\n      expectedHoldAmount\n      expectedRwaAmount\n      rewardPercent\n      priceImpactPercent\n      entryPeriodStart\n      entryPeriodExpired\n      completionPeriodExpired\n      fixedSell\n      allowEntryBurn\n      awaitCompletionExpired\n      floatingOutTranchesTimestamps\n      outgoingTranches {\n        amount\n        timestamp\n        executedAmount\n      }\n      incomingTranches {\n        amount\n        expiredAt\n        returnedAmount\n      }\n    }\n  }\n": typeof types.CreatePoolDocument,
    "\n  mutation RequestPoolApprovalSignatures($input: RequestPoolApprovalSignaturesInput!) {\n    requestPoolApprovalSignatures(input: $input) {\n      taskId\n    }\n  }\n": typeof types.RequestPoolApprovalSignaturesDocument,
    "\n  query GetSignatureTask($input: GetSignatureTaskInput!) {\n    getSignatureTask(input: $input) {\n      id\n      completed\n      expired\n      signatures {\n        signer\n        signature\n      }\n    }\n  }\n": typeof types.GetSignatureTaskDocument,
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
    "\n  query GetBusiness($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      name\n      description\n      tags\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetBusinessDocument,
    "\n  query GetBusinessDeployInfo($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      ownerId\n      ownerType\n      ownerWallet\n      tokenAddress\n      approvalSignaturesTaskId\n      approvalSignaturesTaskExpired\n    }\n  }\n": types.GetBusinessDeployInfoDocument,
    "\n  mutation RequestBusinessApprovalSignatures($input: RequestBusinessApprovalSignaturesInput!) {\n    requestBusinessApprovalSignatures(input: $input) {\n      taskId\n    }\n  }\n": types.RequestBusinessApprovalSignaturesDocument,
    "\n  mutation RejectBusinessApprovalSignatures($id: ID!) {\n    rejectBusinessApprovalSignatures(id: $id)\n  }\n": types.RejectBusinessApprovalSignaturesDocument,
    "\n  mutation CreateBusiness($input: CreateBusinessInput!) {\n    createBusiness(input: $input) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateBusinessDocument,
    "\n  mutation EditBusiness($input: EditBusinessInput!) {\n    editBusiness(input: $input) {\n      id\n      name\n      description\n    }\n  }\n": types.EditBusinessDocument,
    "\n  query GetBusinesses($input: FilterInput!) {\n    getBusinesses(input: $input) {\n      id\n      name\n      description\n      tags\n      riskScore\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetBusinessesDocument,
    "\n  mutation CreateCompany($input: CreateCompanyInput!) {\n    createCompany(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateCompanyDocument,
    "\n  query GetCompanies($input: GetCompaniesInput) {\n    getCompanies(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetCompaniesDocument,
    "\n  query GetCompany($id: ID!) {\n    getCompany(id: $id) {\n      id\n      name\n      description\n      ownerId\n      users {\n        id\n        userId\n        name\n        permissions {\n          id\n          permission\n          entity\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetCompanyDocument,
    "\n  mutation UpdateCompany($input: UpdateCompanyInput!) {\n    updateCompany(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateCompanyDocument,
    "\n  mutation DeleteCompany($id: ID!) {\n    deleteCompany(id: $id)\n  }\n": types.DeleteCompanyDocument,
    "\n  mutation AddMember($input: AddMemberInput!) {\n    addMember(input: $input) {\n      id\n      userId\n      name\n      createdAt\n      updatedAt\n    }\n  }\n": types.AddMemberDocument,
    "\n  mutation RemoveMember($input: RemoveMemberInput!) {\n    removeMember(input: $input)\n  }\n": types.RemoveMemberDocument,
    "\n  query GetFoldersForDocs($input: GetFoldersFilterInput) {\n    getFolders(input: $input) {\n      id\n      name\n      parentId\n      ownerId\n      ownerType\n    }\n  }\n": types.GetFoldersForDocsDocument,
    "\n  mutation CreateFolderForDocs($input: CreateFolderInput!) {\n    createFolder(input: $input) {\n      id\n      name\n      parentId\n      ownerId\n      ownerType\n    }\n  }\n": types.CreateFolderForDocsDocument,
    "\n  query GetDocuments($input: GetDocumentsFilterInput) {\n    getDocuments(input: $input) {\n      id\n      folderId\n      name\n      link\n      ownerId\n      ownerType\n      creator\n      parentId\n      grandParentId\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetDocumentsDocument,
    "\n  mutation DeleteDocument($id: ID!) {\n    deleteDocument(id: $id)\n  }\n": types.DeleteDocumentDocument,
    "\n  mutation UpdateDocumentMeta($input: UpdateDocumentInput!) {\n    updateDocument(input: $input) {\n      id\n      folderId\n      name\n      link\n      ownerId\n      ownerType\n      creator\n      parentId\n      grandParentId\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateDocumentMetaDocument,
    "\n  query GetFaqTopics($input: GetFaqTopicsFilterInput) {\n    getFaqTopics(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n": types.GetFaqTopicsDocument,
    "\n  mutation CreateFaqTopic($input: CreateFaqTopicInput!) {\n    createFaqTopic(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n": types.CreateFaqTopicDocument,
    "\n  query GetFaqAnswers($input: GetFaqAnswersFilterInput) {\n    getFaqAnswers(input: $input) {\n      id\n      topicId\n      question\n      answer\n      order\n      createdAt\n    }\n  }\n": types.GetFaqAnswersDocument,
    "\n  query GetFaqAnswer($id: ID!) {\n    getFaqAnswer(id: $id) {\n      id\n      topicId\n      question\n      answer\n      order\n      createdAt\n    }\n  }\n": types.GetFaqAnswerDocument,
    "\n  mutation CreateFaqAnswer($input: CreateFaqAnswerInput!) {\n    createFaqAnswer(input: $input) {\n      id\n      topicId\n      question\n      answer\n      createdAt\n    }\n  }\n": types.CreateFaqAnswerDocument,
    "\n  mutation UpdateFaqAnswer($input: UpdateFaqAnswerInput!) {\n    updateFaqAnswer(input: $input) {\n      id\n      question\n      answer\n      updatedAt\n    }\n  }\n": types.UpdateFaqAnswerDocument,
    "\n  mutation DeleteFaqAnswer($id: ID!) {\n    deleteFaqAnswer(id: $id)\n  }\n": types.DeleteFaqAnswerDocument,
    "\n  query GetUnlockTime {\n    getUnlockTime {\n      gasUnlockTime\n      holdUnlockTime\n      platformUnlockTime\n    }\n  }\n": types.GetUnlockTimeDocument,
    "\n  mutation RequestGas($input: RequestTokenInput!) {\n    requestGas(input: $input) {\n      id\n      tokenType\n      amount\n      transactionHash\n    }\n  }\n": types.RequestGasDocument,
    "\n  mutation RequestHold($input: RequestTokenInput!) {\n    requestHold(input: $input) {\n      id\n      tokenType\n      amount\n      transactionHash\n    }\n  }\n": types.RequestHoldDocument,
    "\n  query GetGalleries($input: GetGalleriesFilterInput) {\n    getGalleries(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n": types.GetGalleriesDocument,
    "\n  mutation CreateGallery($input: CreateGalleryInput!) {\n    createGallery(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n": types.CreateGalleryDocument,
    "\n  query GetPools($input: FilterInput!) {\n    getPools(input: $input) {\n      id\n      name\n      description\n      poolAddress\n      expectedHoldAmount\n      rewardPercent\n      entryPeriodStart\n      entryPeriodExpired\n      completionPeriodExpired\n      paused\n      chainId\n      createdAt\n    }\n  }\n": types.GetPoolsDocument,
    "\n  mutation CreatePool($input: CreatePoolInput!) {\n    createPool(input: $input) {\n      id\n      rwaAddress\n      chainId\n      ownerId\n      ownerType\n      entryFeePercent\n      exitFeePercent\n      expectedHoldAmount\n      expectedRwaAmount\n      rewardPercent\n      priceImpactPercent\n      entryPeriodStart\n      entryPeriodExpired\n      completionPeriodExpired\n      fixedSell\n      allowEntryBurn\n      awaitCompletionExpired\n      floatingOutTranchesTimestamps\n      outgoingTranches {\n        amount\n        timestamp\n        executedAmount\n      }\n      incomingTranches {\n        amount\n        expiredAt\n        returnedAmount\n      }\n    }\n  }\n": types.CreatePoolDocument,
    "\n  mutation RequestPoolApprovalSignatures($input: RequestPoolApprovalSignaturesInput!) {\n    requestPoolApprovalSignatures(input: $input) {\n      taskId\n    }\n  }\n": types.RequestPoolApprovalSignaturesDocument,
    "\n  query GetSignatureTask($input: GetSignatureTaskInput!) {\n    getSignatureTask(input: $input) {\n      id\n      completed\n      expired\n      signatures {\n        signer\n        signature\n      }\n    }\n  }\n": types.GetSignatureTaskDocument,
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
export function graphql(source: "\n  query GetBusiness($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      name\n      description\n      tags\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetBusiness($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      name\n      description\n      tags\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBusinessDeployInfo($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      ownerId\n      ownerType\n      ownerWallet\n      tokenAddress\n      approvalSignaturesTaskId\n      approvalSignaturesTaskExpired\n    }\n  }\n"): (typeof documents)["\n  query GetBusinessDeployInfo($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      ownerId\n      ownerType\n      ownerWallet\n      tokenAddress\n      approvalSignaturesTaskId\n      approvalSignaturesTaskExpired\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RequestBusinessApprovalSignatures($input: RequestBusinessApprovalSignaturesInput!) {\n    requestBusinessApprovalSignatures(input: $input) {\n      taskId\n    }\n  }\n"): (typeof documents)["\n  mutation RequestBusinessApprovalSignatures($input: RequestBusinessApprovalSignaturesInput!) {\n    requestBusinessApprovalSignatures(input: $input) {\n      taskId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RejectBusinessApprovalSignatures($id: ID!) {\n    rejectBusinessApprovalSignatures(id: $id)\n  }\n"): (typeof documents)["\n  mutation RejectBusinessApprovalSignatures($id: ID!) {\n    rejectBusinessApprovalSignatures(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBusiness($input: CreateBusinessInput!) {\n    createBusiness(input: $input) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBusiness($input: CreateBusinessInput!) {\n    createBusiness(input: $input) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EditBusiness($input: EditBusinessInput!) {\n    editBusiness(input: $input) {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  mutation EditBusiness($input: EditBusinessInput!) {\n    editBusiness(input: $input) {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBusinesses($input: FilterInput!) {\n    getBusinesses(input: $input) {\n      id\n      name\n      description\n      tags\n      riskScore\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetBusinesses($input: FilterInput!) {\n    getBusinesses(input: $input) {\n      id\n      name\n      description\n      tags\n      riskScore\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n"];
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
export function graphql(source: "\n  mutation AddMember($input: AddMemberInput!) {\n    addMember(input: $input) {\n      id\n      userId\n      name\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation AddMember($input: AddMemberInput!) {\n    addMember(input: $input) {\n      id\n      userId\n      name\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveMember($input: RemoveMemberInput!) {\n    removeMember(input: $input)\n  }\n"): (typeof documents)["\n  mutation RemoveMember($input: RemoveMemberInput!) {\n    removeMember(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFoldersForDocs($input: GetFoldersFilterInput) {\n    getFolders(input: $input) {\n      id\n      name\n      parentId\n      ownerId\n      ownerType\n    }\n  }\n"): (typeof documents)["\n  query GetFoldersForDocs($input: GetFoldersFilterInput) {\n    getFolders(input: $input) {\n      id\n      name\n      parentId\n      ownerId\n      ownerType\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateFolderForDocs($input: CreateFolderInput!) {\n    createFolder(input: $input) {\n      id\n      name\n      parentId\n      ownerId\n      ownerType\n    }\n  }\n"): (typeof documents)["\n  mutation CreateFolderForDocs($input: CreateFolderInput!) {\n    createFolder(input: $input) {\n      id\n      name\n      parentId\n      ownerId\n      ownerType\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetDocuments($input: GetDocumentsFilterInput) {\n    getDocuments(input: $input) {\n      id\n      folderId\n      name\n      link\n      ownerId\n      ownerType\n      creator\n      parentId\n      grandParentId\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetDocuments($input: GetDocumentsFilterInput) {\n    getDocuments(input: $input) {\n      id\n      folderId\n      name\n      link\n      ownerId\n      ownerType\n      creator\n      parentId\n      grandParentId\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteDocument($id: ID!) {\n    deleteDocument(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteDocument($id: ID!) {\n    deleteDocument(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateDocumentMeta($input: UpdateDocumentInput!) {\n    updateDocument(input: $input) {\n      id\n      folderId\n      name\n      link\n      ownerId\n      ownerType\n      creator\n      parentId\n      grandParentId\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateDocumentMeta($input: UpdateDocumentInput!) {\n    updateDocument(input: $input) {\n      id\n      folderId\n      name\n      link\n      ownerId\n      ownerType\n      creator\n      parentId\n      grandParentId\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFaqTopics($input: GetFaqTopicsFilterInput) {\n    getFaqTopics(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n"): (typeof documents)["\n  query GetFaqTopics($input: GetFaqTopicsFilterInput) {\n    getFaqTopics(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateFaqTopic($input: CreateFaqTopicInput!) {\n    createFaqTopic(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateFaqTopic($input: CreateFaqTopicInput!) {\n    createFaqTopic(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFaqAnswers($input: GetFaqAnswersFilterInput) {\n    getFaqAnswers(input: $input) {\n      id\n      topicId\n      question\n      answer\n      order\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetFaqAnswers($input: GetFaqAnswersFilterInput) {\n    getFaqAnswers(input: $input) {\n      id\n      topicId\n      question\n      answer\n      order\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFaqAnswer($id: ID!) {\n    getFaqAnswer(id: $id) {\n      id\n      topicId\n      question\n      answer\n      order\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetFaqAnswer($id: ID!) {\n    getFaqAnswer(id: $id) {\n      id\n      topicId\n      question\n      answer\n      order\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateFaqAnswer($input: CreateFaqAnswerInput!) {\n    createFaqAnswer(input: $input) {\n      id\n      topicId\n      question\n      answer\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateFaqAnswer($input: CreateFaqAnswerInput!) {\n    createFaqAnswer(input: $input) {\n      id\n      topicId\n      question\n      answer\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateFaqAnswer($input: UpdateFaqAnswerInput!) {\n    updateFaqAnswer(input: $input) {\n      id\n      question\n      answer\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateFaqAnswer($input: UpdateFaqAnswerInput!) {\n    updateFaqAnswer(input: $input) {\n      id\n      question\n      answer\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteFaqAnswer($id: ID!) {\n    deleteFaqAnswer(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteFaqAnswer($id: ID!) {\n    deleteFaqAnswer(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUnlockTime {\n    getUnlockTime {\n      gasUnlockTime\n      holdUnlockTime\n      platformUnlockTime\n    }\n  }\n"): (typeof documents)["\n  query GetUnlockTime {\n    getUnlockTime {\n      gasUnlockTime\n      holdUnlockTime\n      platformUnlockTime\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RequestGas($input: RequestTokenInput!) {\n    requestGas(input: $input) {\n      id\n      tokenType\n      amount\n      transactionHash\n    }\n  }\n"): (typeof documents)["\n  mutation RequestGas($input: RequestTokenInput!) {\n    requestGas(input: $input) {\n      id\n      tokenType\n      amount\n      transactionHash\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RequestHold($input: RequestTokenInput!) {\n    requestHold(input: $input) {\n      id\n      tokenType\n      amount\n      transactionHash\n    }\n  }\n"): (typeof documents)["\n  mutation RequestHold($input: RequestTokenInput!) {\n    requestHold(input: $input) {\n      id\n      tokenType\n      amount\n      transactionHash\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetGalleries($input: GetGalleriesFilterInput) {\n    getGalleries(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n"): (typeof documents)["\n  query GetGalleries($input: GetGalleriesFilterInput) {\n    getGalleries(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateGallery($input: CreateGalleryInput!) {\n    createGallery(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateGallery($input: CreateGalleryInput!) {\n    createGallery(input: $input) {\n      id\n      name\n      parentId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPools($input: FilterInput!) {\n    getPools(input: $input) {\n      id\n      name\n      description\n      poolAddress\n      expectedHoldAmount\n      rewardPercent\n      entryPeriodStart\n      entryPeriodExpired\n      completionPeriodExpired\n      paused\n      chainId\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetPools($input: FilterInput!) {\n    getPools(input: $input) {\n      id\n      name\n      description\n      poolAddress\n      expectedHoldAmount\n      rewardPercent\n      entryPeriodStart\n      entryPeriodExpired\n      completionPeriodExpired\n      paused\n      chainId\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePool($input: CreatePoolInput!) {\n    createPool(input: $input) {\n      id\n      rwaAddress\n      chainId\n      ownerId\n      ownerType\n      entryFeePercent\n      exitFeePercent\n      expectedHoldAmount\n      expectedRwaAmount\n      rewardPercent\n      priceImpactPercent\n      entryPeriodStart\n      entryPeriodExpired\n      completionPeriodExpired\n      fixedSell\n      allowEntryBurn\n      awaitCompletionExpired\n      floatingOutTranchesTimestamps\n      outgoingTranches {\n        amount\n        timestamp\n        executedAmount\n      }\n      incomingTranches {\n        amount\n        expiredAt\n        returnedAmount\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePool($input: CreatePoolInput!) {\n    createPool(input: $input) {\n      id\n      rwaAddress\n      chainId\n      ownerId\n      ownerType\n      entryFeePercent\n      exitFeePercent\n      expectedHoldAmount\n      expectedRwaAmount\n      rewardPercent\n      priceImpactPercent\n      entryPeriodStart\n      entryPeriodExpired\n      completionPeriodExpired\n      fixedSell\n      allowEntryBurn\n      awaitCompletionExpired\n      floatingOutTranchesTimestamps\n      outgoingTranches {\n        amount\n        timestamp\n        executedAmount\n      }\n      incomingTranches {\n        amount\n        expiredAt\n        returnedAmount\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RequestPoolApprovalSignatures($input: RequestPoolApprovalSignaturesInput!) {\n    requestPoolApprovalSignatures(input: $input) {\n      taskId\n    }\n  }\n"): (typeof documents)["\n  mutation RequestPoolApprovalSignatures($input: RequestPoolApprovalSignaturesInput!) {\n    requestPoolApprovalSignatures(input: $input) {\n      taskId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSignatureTask($input: GetSignatureTaskInput!) {\n    getSignatureTask(input: $input) {\n      id\n      completed\n      expired\n      signatures {\n        signer\n        signature\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetSignatureTask($input: GetSignatureTaskInput!) {\n    getSignatureTask(input: $input) {\n      id\n      completed\n      expired\n      signatures {\n        signer\n        signature\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;