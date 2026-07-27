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
    "\n  query GetBusinessWithRisk($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      name\n      description\n      tags\n      riskScore\n      ownerId\n      ownerType\n      image\n      imageUrl\n      fileId\n    }\n  }\n": typeof types.GetBusinessWithRiskDocument,
    "\n  query GetBusiness($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      name\n      description\n      tags\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n      image\n      imageUrl\n      fileId\n    }\n  }\n": typeof types.GetBusinessDocument,
    "\n  query GetBusinessDeployInfo($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      ownerId\n      ownerType\n      ownerWallet\n      tokenAddress\n      approvalSignaturesTaskId\n      approvalSignaturesTaskExpired\n      image\n      imageUrl\n      fileId\n    }\n  }\n": typeof types.GetBusinessDeployInfoDocument,
    "\n  mutation RequestBusinessApprovalSignatures($input: RequestBusinessApprovalSignaturesInput!) {\n    requestBusinessApprovalSignatures(input: $input) {\n      taskId\n    }\n  }\n": typeof types.RequestBusinessApprovalSignaturesDocument,
    "\n  mutation RejectBusinessApprovalSignatures($id: ID!) {\n    rejectBusinessApprovalSignatures(id: $id)\n  }\n": typeof types.RejectBusinessApprovalSignaturesDocument,
    "\n  mutation CreateBusiness($input: CreateBusinessInput!) {\n    createBusiness(input: $input) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n      image\n      imageUrl\n      fileId\n    }\n  }\n": typeof types.CreateBusinessDocument,
    "\n  mutation EditBusiness($input: EditBusinessInput!) {\n    editBusiness(input: $input) {\n      id\n      name\n      description\n      image\n      imageUrl\n      fileId\n    }\n  }\n": typeof types.EditBusinessDocument,
    "\n  query GetBusinesses($input: FilterInput!) {\n    getBusinesses(input: $input) {\n      id\n      name\n      description\n      tags\n      riskScore\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n      image\n      imageUrl\n      fileId\n    }\n  }\n": typeof types.GetBusinessesDocument,
    "\n  mutation CreateCompany($input: CreateCompanyInput!) {\n    createCompany(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateCompanyDocument,
    "\n  query GetCompanies($input: GetCompaniesInput) {\n    getCompanies(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetCompaniesDocument,
    "\n  query GetCompany($id: ID!) {\n    getCompany(id: $id) {\n      id\n      name\n      description\n      ownerId\n      users {\n        id\n        userId\n        name\n        permissions {\n          id\n          permission\n          entity\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetCompanyDocument,
    "\n  mutation UpdateCompany($input: UpdateCompanyInput!) {\n    updateCompany(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateCompanyDocument,
    "\n  mutation DeleteCompany($id: ID!) {\n    deleteCompany(id: $id)\n  }\n": typeof types.DeleteCompanyDocument,
    "\n  mutation AddMember($input: AddMemberInput!) {\n    addMember(input: $input) {\n      id\n      userId\n      name\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.AddMemberDocument,
    "\n  mutation RemoveMember($input: RemoveMemberInput!) {\n    removeMember(input: $input)\n  }\n": typeof types.RemoveMemberDocument,
    "\n  query GetProposals($input: GetProposalsFilterInput) {\n    getProposals(input: $input) {\n      id\n      proposalId\n      proposer\n      target\n      data\n      description\n      startTime\n      endTime\n      state\n      chainId\n      createdAt\n    }\n  }\n": typeof types.GetProposalsDocument,
    "\n  query GetVotes($input: GetVotesFilterInput) {\n    getVotes(input: $input) {\n      id\n      proposalId\n      voterWallet\n      support\n      weight\n      reason\n    }\n  }\n": typeof types.GetVotesDocument,
    "\n  query GetStaking($input: GetStakingFilterInput) {\n    getStaking(input: $input) {\n      id\n      staker\n      amount\n      lastStakeTimestamp\n    }\n  }\n": typeof types.GetStakingDocument,
    "\n  query GetFoldersForDocs($input: GetFoldersFilterInput) {\n    getFolders(input: $input) {\n      id\n      name\n      parentId\n      ownerId\n      ownerType\n    }\n  }\n": typeof types.GetFoldersForDocsDocument,
    "\n  mutation CreateFolderForDocs($input: CreateFolderInput!) {\n    createFolder(input: $input) {\n      id\n      name\n      parentId\n      ownerId\n      ownerType\n    }\n  }\n": typeof types.CreateFolderForDocsDocument,
    "\n  query GetDocuments($input: GetDocumentsFilterInput) {\n    getDocuments(input: $input) {\n      id\n      folderId\n      name\n      url\n      fileId\n      path\n      mimeType\n      size\n      ownerId\n      ownerType\n      creator\n      parentId\n      grandParentId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetDocumentsDocument,
    "\n  mutation DeleteDocument($id: ID!) {\n    deleteDocument(id: $id)\n  }\n": typeof types.DeleteDocumentDocument,
    "\n  mutation UpdateDocumentMeta($input: UpdateDocumentInput!) {\n    updateDocument(input: $input) {\n      id\n      folderId\n      name\n      url\n      fileId\n      path\n      mimeType\n      size\n      ownerId\n      ownerType\n      creator\n      parentId\n      grandParentId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateDocumentMetaDocument,
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
    "\n  query GetPoolById($id: ID!) {\n    getPool(id: $id) {\n      id\n      name\n      businessId\n      description\n      poolAddress\n      rwaAddress\n      expectedHoldAmount\n      expectedRwaAmount\n      rewardPercent\n      entryFeePercent\n      exitFeePercent\n      entryPeriodStart\n      entryPeriodExpired\n      completionPeriodExpired\n      fixedSell\n      paused\n      tags\n      image\n      imageUrl\n      fileId\n      chainId\n      createdAt\n      realHoldReserve\n      virtualHoldReserve\n      virtualRwaReserve\n      ownerId\n      ownerType\n      incomingTranches {\n        amount\n        expiredAt\n        returnedAmount\n      }\n    }\n  }\n": typeof types.GetPoolByIdDocument,
    "\n  query GetPoolDetail($input: FilterInput!) {\n    getPools(input: $input) {\n      id\n      name\n      businessId\n      description\n      poolAddress\n      rwaAddress\n      expectedHoldAmount\n      expectedRwaAmount\n      rewardPercent\n      entryFeePercent\n      exitFeePercent\n      entryPeriodStart\n      entryPeriodExpired\n      completionPeriodExpired\n      fixedSell\n      paused\n      tags\n      image\n      imageUrl\n      fileId\n      chainId\n      createdAt\n      realHoldReserve\n      virtualHoldReserve\n      virtualRwaReserve\n      incomingTranches {\n        amount\n        expiredAt\n        returnedAmount\n      }\n    }\n  }\n": typeof types.GetPoolDetailDocument,
    "\n  query GetPools($input: FilterInput!) {\n    getPools(input: $input) {\n      id\n      name\n      businessId\n      description\n      poolAddress\n      expectedHoldAmount\n      expectedRwaAmount\n      rewardPercent\n      entryPeriodStart\n      entryPeriodExpired\n      completionPeriodExpired\n      fixedSell\n      paused\n      chainId\n      createdAt\n      image\n      imageUrl\n      fileId\n      realHoldReserve\n      virtualHoldReserve\n      virtualRwaReserve\n      isFullyReturned\n      isTargetReached\n      tags\n      riskScore\n    }\n  }\n": typeof types.GetPoolsDocument,
    "\n  mutation CreatePool($input: CreatePoolInput!) {\n    createPool(input: $input) {\n      id\n      rwaAddress\n      chainId\n      ownerId\n      ownerType\n      entryFeePercent\n      exitFeePercent\n      expectedHoldAmount\n      expectedRwaAmount\n      rewardPercent\n      priceImpactPercent\n      entryPeriodStart\n      entryPeriodExpired\n      completionPeriodExpired\n      fixedSell\n      allowEntryBurn\n      awaitCompletionExpired\n      floatingOutTranchesTimestamps\n      outgoingTranches {\n        amount\n        timestamp\n        executedAmount\n      }\n      incomingTranches {\n        amount\n        expiredAt\n        returnedAmount\n      }\n    }\n  }\n": typeof types.CreatePoolDocument,
    "\n  mutation RequestPoolApprovalSignatures($input: RequestPoolApprovalSignaturesInput!) {\n    requestPoolApprovalSignatures(input: $input) {\n      taskId\n    }\n  }\n": typeof types.RequestPoolApprovalSignaturesDocument,
    "\n  query GetRawPriceData($input: GetRawPriceDataInput!) {\n    getRawPriceData(input: $input) {\n      timestamp\n      price\n    }\n  }\n": typeof types.GetRawPriceDataDocument,
    "\n  mutation EditPool($input: EditPoolInput!) {\n    editPool(input: $input) {\n      id\n      name\n      description\n      tags\n      image\n      imageUrl\n      fileId\n    }\n  }\n": typeof types.EditPoolDocument,
    "\n  query GetLatestPrice($input: GetRawPriceDataInput!) {\n    getRawPriceData(input: $input) {\n      price\n    }\n  }\n": typeof types.GetLatestPriceDocument,
    "\n  query GetOhlcPriceData($input: GetOhlcPriceDataInput!) {\n    getOhlcPriceData(input: $input) {\n      timestamp\n      open\n      high\n      low\n      close\n    }\n  }\n": typeof types.GetOhlcPriceDataDocument,
    "\n  query GetVolumeData($input: GetVolumeDataInput!) {\n    getVolumeData(input: $input) {\n      timestamp\n      mintVolume\n      burnVolume\n    }\n  }\n": typeof types.GetVolumeDataDocument,
    "\n  query GetSignatureTask($input: GetSignatureTaskInput!) {\n    getSignatureTask(input: $input) {\n      id\n      completed\n      expired\n      signatures {\n        signer\n        signature\n      }\n    }\n  }\n": typeof types.GetSignatureTaskDocument,
    "\n  query GetReferrals($input: GetReferralsFilterInput) {\n    getReferrals(input: $input) {\n      id\n      userId\n      userWallet\n      referrerId\n      createdAt\n    }\n  }\n": typeof types.GetReferralsDocument,
    "\n  query GetReferrerClaimHistory($input: GetReferrerClaimHistoryFilterInput) {\n    getReferrerClaimHistory(input: $input) {\n      id\n      amount\n      referralWallet\n      tokenAddress\n      transactionHash\n      createdAt\n    }\n  }\n": typeof types.GetReferrerClaimHistoryDocument,
    "\n  query GetReferrerWithdraws($input: GetReferrerWithdrawsFilterInput) {\n    getReferrerWithdraws(input: $input) {\n      id\n      chainId\n      tokenAddress\n      totalWithdrawnAmount\n      taskCooldown\n      taskExpiredAt\n      taskId\n    }\n  }\n": typeof types.GetReferrerWithdrawsDocument,
    "\n  query GetFees($input: GetFeesFilterInput) {\n    getFees(input: $input) {\n      id\n      userId\n      userWallet\n      tokenAddress\n      chainId\n      referralRewardAmount\n      referralRewardCount\n    }\n  }\n": typeof types.GetFeesDocument,
    "\n  mutation CreateReferrerWithdrawTask($input: CreateReferrerWithdrawTaskInput!) {\n    createReferrerWithdrawTask(input: $input) {\n      id\n      taskId\n      taskCooldown\n      taskExpiredAt\n    }\n  }\n": typeof types.CreateReferrerWithdrawTaskDocument,
    "\n  mutation RegisterReferral($input: RegisterReferralInput!) {\n    registerReferral(input: $input) {\n      id\n      userId\n      userWallet\n      referrerId\n      referrerWallet\n    }\n  }\n": typeof types.RegisterReferralDocument,
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
    "\n  query GetBusinessWithRisk($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      name\n      description\n      tags\n      riskScore\n      ownerId\n      ownerType\n      image\n      imageUrl\n      fileId\n    }\n  }\n": types.GetBusinessWithRiskDocument,
    "\n  query GetBusiness($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      name\n      description\n      tags\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n      image\n      imageUrl\n      fileId\n    }\n  }\n": types.GetBusinessDocument,
    "\n  query GetBusinessDeployInfo($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      ownerId\n      ownerType\n      ownerWallet\n      tokenAddress\n      approvalSignaturesTaskId\n      approvalSignaturesTaskExpired\n      image\n      imageUrl\n      fileId\n    }\n  }\n": types.GetBusinessDeployInfoDocument,
    "\n  mutation RequestBusinessApprovalSignatures($input: RequestBusinessApprovalSignaturesInput!) {\n    requestBusinessApprovalSignatures(input: $input) {\n      taskId\n    }\n  }\n": types.RequestBusinessApprovalSignaturesDocument,
    "\n  mutation RejectBusinessApprovalSignatures($id: ID!) {\n    rejectBusinessApprovalSignatures(id: $id)\n  }\n": types.RejectBusinessApprovalSignaturesDocument,
    "\n  mutation CreateBusiness($input: CreateBusinessInput!) {\n    createBusiness(input: $input) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n      image\n      imageUrl\n      fileId\n    }\n  }\n": types.CreateBusinessDocument,
    "\n  mutation EditBusiness($input: EditBusinessInput!) {\n    editBusiness(input: $input) {\n      id\n      name\n      description\n      image\n      imageUrl\n      fileId\n    }\n  }\n": types.EditBusinessDocument,
    "\n  query GetBusinesses($input: FilterInput!) {\n    getBusinesses(input: $input) {\n      id\n      name\n      description\n      tags\n      riskScore\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n      image\n      imageUrl\n      fileId\n    }\n  }\n": types.GetBusinessesDocument,
    "\n  mutation CreateCompany($input: CreateCompanyInput!) {\n    createCompany(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateCompanyDocument,
    "\n  query GetCompanies($input: GetCompaniesInput) {\n    getCompanies(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetCompaniesDocument,
    "\n  query GetCompany($id: ID!) {\n    getCompany(id: $id) {\n      id\n      name\n      description\n      ownerId\n      users {\n        id\n        userId\n        name\n        permissions {\n          id\n          permission\n          entity\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetCompanyDocument,
    "\n  mutation UpdateCompany($input: UpdateCompanyInput!) {\n    updateCompany(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateCompanyDocument,
    "\n  mutation DeleteCompany($id: ID!) {\n    deleteCompany(id: $id)\n  }\n": types.DeleteCompanyDocument,
    "\n  mutation AddMember($input: AddMemberInput!) {\n    addMember(input: $input) {\n      id\n      userId\n      name\n      createdAt\n      updatedAt\n    }\n  }\n": types.AddMemberDocument,
    "\n  mutation RemoveMember($input: RemoveMemberInput!) {\n    removeMember(input: $input)\n  }\n": types.RemoveMemberDocument,
    "\n  query GetProposals($input: GetProposalsFilterInput) {\n    getProposals(input: $input) {\n      id\n      proposalId\n      proposer\n      target\n      data\n      description\n      startTime\n      endTime\n      state\n      chainId\n      createdAt\n    }\n  }\n": types.GetProposalsDocument,
    "\n  query GetVotes($input: GetVotesFilterInput) {\n    getVotes(input: $input) {\n      id\n      proposalId\n      voterWallet\n      support\n      weight\n      reason\n    }\n  }\n": types.GetVotesDocument,
    "\n  query GetStaking($input: GetStakingFilterInput) {\n    getStaking(input: $input) {\n      id\n      staker\n      amount\n      lastStakeTimestamp\n    }\n  }\n": types.GetStakingDocument,
    "\n  query GetFoldersForDocs($input: GetFoldersFilterInput) {\n    getFolders(input: $input) {\n      id\n      name\n      parentId\n      ownerId\n      ownerType\n    }\n  }\n": types.GetFoldersForDocsDocument,
    "\n  mutation CreateFolderForDocs($input: CreateFolderInput!) {\n    createFolder(input: $input) {\n      id\n      name\n      parentId\n      ownerId\n      ownerType\n    }\n  }\n": types.CreateFolderForDocsDocument,
    "\n  query GetDocuments($input: GetDocumentsFilterInput) {\n    getDocuments(input: $input) {\n      id\n      folderId\n      name\n      url\n      fileId\n      path\n      mimeType\n      size\n      ownerId\n      ownerType\n      creator\n      parentId\n      grandParentId\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetDocumentsDocument,
    "\n  mutation DeleteDocument($id: ID!) {\n    deleteDocument(id: $id)\n  }\n": types.DeleteDocumentDocument,
    "\n  mutation UpdateDocumentMeta($input: UpdateDocumentInput!) {\n    updateDocument(input: $input) {\n      id\n      folderId\n      name\n      url\n      fileId\n      path\n      mimeType\n      size\n      ownerId\n      ownerType\n      creator\n      parentId\n      grandParentId\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateDocumentMetaDocument,
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
    "\n  query GetPoolById($id: ID!) {\n    getPool(id: $id) {\n      id\n      name\n      businessId\n      description\n      poolAddress\n      rwaAddress\n      expectedHoldAmount\n      expectedRwaAmount\n      rewardPercent\n      entryFeePercent\n      exitFeePercent\n      entryPeriodStart\n      entryPeriodExpired\n      completionPeriodExpired\n      fixedSell\n      paused\n      tags\n      image\n      imageUrl\n      fileId\n      chainId\n      createdAt\n      realHoldReserve\n      virtualHoldReserve\n      virtualRwaReserve\n      ownerId\n      ownerType\n      incomingTranches {\n        amount\n        expiredAt\n        returnedAmount\n      }\n    }\n  }\n": types.GetPoolByIdDocument,
    "\n  query GetPoolDetail($input: FilterInput!) {\n    getPools(input: $input) {\n      id\n      name\n      businessId\n      description\n      poolAddress\n      rwaAddress\n      expectedHoldAmount\n      expectedRwaAmount\n      rewardPercent\n      entryFeePercent\n      exitFeePercent\n      entryPeriodStart\n      entryPeriodExpired\n      completionPeriodExpired\n      fixedSell\n      paused\n      tags\n      image\n      imageUrl\n      fileId\n      chainId\n      createdAt\n      realHoldReserve\n      virtualHoldReserve\n      virtualRwaReserve\n      incomingTranches {\n        amount\n        expiredAt\n        returnedAmount\n      }\n    }\n  }\n": types.GetPoolDetailDocument,
    "\n  query GetPools($input: FilterInput!) {\n    getPools(input: $input) {\n      id\n      name\n      businessId\n      description\n      poolAddress\n      expectedHoldAmount\n      expectedRwaAmount\n      rewardPercent\n      entryPeriodStart\n      entryPeriodExpired\n      completionPeriodExpired\n      fixedSell\n      paused\n      chainId\n      createdAt\n      image\n      imageUrl\n      fileId\n      realHoldReserve\n      virtualHoldReserve\n      virtualRwaReserve\n      isFullyReturned\n      isTargetReached\n      tags\n      riskScore\n    }\n  }\n": types.GetPoolsDocument,
    "\n  mutation CreatePool($input: CreatePoolInput!) {\n    createPool(input: $input) {\n      id\n      rwaAddress\n      chainId\n      ownerId\n      ownerType\n      entryFeePercent\n      exitFeePercent\n      expectedHoldAmount\n      expectedRwaAmount\n      rewardPercent\n      priceImpactPercent\n      entryPeriodStart\n      entryPeriodExpired\n      completionPeriodExpired\n      fixedSell\n      allowEntryBurn\n      awaitCompletionExpired\n      floatingOutTranchesTimestamps\n      outgoingTranches {\n        amount\n        timestamp\n        executedAmount\n      }\n      incomingTranches {\n        amount\n        expiredAt\n        returnedAmount\n      }\n    }\n  }\n": types.CreatePoolDocument,
    "\n  mutation RequestPoolApprovalSignatures($input: RequestPoolApprovalSignaturesInput!) {\n    requestPoolApprovalSignatures(input: $input) {\n      taskId\n    }\n  }\n": types.RequestPoolApprovalSignaturesDocument,
    "\n  query GetRawPriceData($input: GetRawPriceDataInput!) {\n    getRawPriceData(input: $input) {\n      timestamp\n      price\n    }\n  }\n": types.GetRawPriceDataDocument,
    "\n  mutation EditPool($input: EditPoolInput!) {\n    editPool(input: $input) {\n      id\n      name\n      description\n      tags\n      image\n      imageUrl\n      fileId\n    }\n  }\n": types.EditPoolDocument,
    "\n  query GetLatestPrice($input: GetRawPriceDataInput!) {\n    getRawPriceData(input: $input) {\n      price\n    }\n  }\n": types.GetLatestPriceDocument,
    "\n  query GetOhlcPriceData($input: GetOhlcPriceDataInput!) {\n    getOhlcPriceData(input: $input) {\n      timestamp\n      open\n      high\n      low\n      close\n    }\n  }\n": types.GetOhlcPriceDataDocument,
    "\n  query GetVolumeData($input: GetVolumeDataInput!) {\n    getVolumeData(input: $input) {\n      timestamp\n      mintVolume\n      burnVolume\n    }\n  }\n": types.GetVolumeDataDocument,
    "\n  query GetSignatureTask($input: GetSignatureTaskInput!) {\n    getSignatureTask(input: $input) {\n      id\n      completed\n      expired\n      signatures {\n        signer\n        signature\n      }\n    }\n  }\n": types.GetSignatureTaskDocument,
    "\n  query GetReferrals($input: GetReferralsFilterInput) {\n    getReferrals(input: $input) {\n      id\n      userId\n      userWallet\n      referrerId\n      createdAt\n    }\n  }\n": types.GetReferralsDocument,
    "\n  query GetReferrerClaimHistory($input: GetReferrerClaimHistoryFilterInput) {\n    getReferrerClaimHistory(input: $input) {\n      id\n      amount\n      referralWallet\n      tokenAddress\n      transactionHash\n      createdAt\n    }\n  }\n": types.GetReferrerClaimHistoryDocument,
    "\n  query GetReferrerWithdraws($input: GetReferrerWithdrawsFilterInput) {\n    getReferrerWithdraws(input: $input) {\n      id\n      chainId\n      tokenAddress\n      totalWithdrawnAmount\n      taskCooldown\n      taskExpiredAt\n      taskId\n    }\n  }\n": types.GetReferrerWithdrawsDocument,
    "\n  query GetFees($input: GetFeesFilterInput) {\n    getFees(input: $input) {\n      id\n      userId\n      userWallet\n      tokenAddress\n      chainId\n      referralRewardAmount\n      referralRewardCount\n    }\n  }\n": types.GetFeesDocument,
    "\n  mutation CreateReferrerWithdrawTask($input: CreateReferrerWithdrawTaskInput!) {\n    createReferrerWithdrawTask(input: $input) {\n      id\n      taskId\n      taskCooldown\n      taskExpiredAt\n    }\n  }\n": types.CreateReferrerWithdrawTaskDocument,
    "\n  mutation RegisterReferral($input: RegisterReferralInput!) {\n    registerReferral(input: $input) {\n      id\n      userId\n      userWallet\n      referrerId\n      referrerWallet\n    }\n  }\n": types.RegisterReferralDocument,
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
export function graphql(source: "\n  query GetBusinessWithRisk($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      name\n      description\n      tags\n      riskScore\n      ownerId\n      ownerType\n      image\n      imageUrl\n      fileId\n    }\n  }\n"): (typeof documents)["\n  query GetBusinessWithRisk($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      name\n      description\n      tags\n      riskScore\n      ownerId\n      ownerType\n      image\n      imageUrl\n      fileId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBusiness($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      name\n      description\n      tags\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n      image\n      imageUrl\n      fileId\n    }\n  }\n"): (typeof documents)["\n  query GetBusiness($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      name\n      description\n      tags\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n      image\n      imageUrl\n      fileId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBusinessDeployInfo($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      ownerId\n      ownerType\n      ownerWallet\n      tokenAddress\n      approvalSignaturesTaskId\n      approvalSignaturesTaskExpired\n      image\n      imageUrl\n      fileId\n    }\n  }\n"): (typeof documents)["\n  query GetBusinessDeployInfo($id: ID!) {\n    getBusiness(id: $id) {\n      id\n      ownerId\n      ownerType\n      ownerWallet\n      tokenAddress\n      approvalSignaturesTaskId\n      approvalSignaturesTaskExpired\n      image\n      imageUrl\n      fileId\n    }\n  }\n"];
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
export function graphql(source: "\n  mutation CreateBusiness($input: CreateBusinessInput!) {\n    createBusiness(input: $input) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n      image\n      imageUrl\n      fileId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBusiness($input: CreateBusinessInput!) {\n    createBusiness(input: $input) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n      image\n      imageUrl\n      fileId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EditBusiness($input: EditBusinessInput!) {\n    editBusiness(input: $input) {\n      id\n      name\n      description\n      image\n      imageUrl\n      fileId\n    }\n  }\n"): (typeof documents)["\n  mutation EditBusiness($input: EditBusinessInput!) {\n    editBusiness(input: $input) {\n      id\n      name\n      description\n      image\n      imageUrl\n      fileId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBusinesses($input: FilterInput!) {\n    getBusinesses(input: $input) {\n      id\n      name\n      description\n      tags\n      riskScore\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n      image\n      imageUrl\n      fileId\n    }\n  }\n"): (typeof documents)["\n  query GetBusinesses($input: FilterInput!) {\n    getBusinesses(input: $input) {\n      id\n      name\n      description\n      tags\n      riskScore\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n      image\n      imageUrl\n      fileId\n    }\n  }\n"];
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
export function graphql(source: "\n  query GetProposals($input: GetProposalsFilterInput) {\n    getProposals(input: $input) {\n      id\n      proposalId\n      proposer\n      target\n      data\n      description\n      startTime\n      endTime\n      state\n      chainId\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetProposals($input: GetProposalsFilterInput) {\n    getProposals(input: $input) {\n      id\n      proposalId\n      proposer\n      target\n      data\n      description\n      startTime\n      endTime\n      state\n      chainId\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetVotes($input: GetVotesFilterInput) {\n    getVotes(input: $input) {\n      id\n      proposalId\n      voterWallet\n      support\n      weight\n      reason\n    }\n  }\n"): (typeof documents)["\n  query GetVotes($input: GetVotesFilterInput) {\n    getVotes(input: $input) {\n      id\n      proposalId\n      voterWallet\n      support\n      weight\n      reason\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetStaking($input: GetStakingFilterInput) {\n    getStaking(input: $input) {\n      id\n      staker\n      amount\n      lastStakeTimestamp\n    }\n  }\n"): (typeof documents)["\n  query GetStaking($input: GetStakingFilterInput) {\n    getStaking(input: $input) {\n      id\n      staker\n      amount\n      lastStakeTimestamp\n    }\n  }\n"];
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
export function graphql(source: "\n  query GetDocuments($input: GetDocumentsFilterInput) {\n    getDocuments(input: $input) {\n      id\n      folderId\n      name\n      url\n      fileId\n      path\n      mimeType\n      size\n      ownerId\n      ownerType\n      creator\n      parentId\n      grandParentId\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetDocuments($input: GetDocumentsFilterInput) {\n    getDocuments(input: $input) {\n      id\n      folderId\n      name\n      url\n      fileId\n      path\n      mimeType\n      size\n      ownerId\n      ownerType\n      creator\n      parentId\n      grandParentId\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteDocument($id: ID!) {\n    deleteDocument(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteDocument($id: ID!) {\n    deleteDocument(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateDocumentMeta($input: UpdateDocumentInput!) {\n    updateDocument(input: $input) {\n      id\n      folderId\n      name\n      url\n      fileId\n      path\n      mimeType\n      size\n      ownerId\n      ownerType\n      creator\n      parentId\n      grandParentId\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateDocumentMeta($input: UpdateDocumentInput!) {\n    updateDocument(input: $input) {\n      id\n      folderId\n      name\n      url\n      fileId\n      path\n      mimeType\n      size\n      ownerId\n      ownerType\n      creator\n      parentId\n      grandParentId\n      createdAt\n      updatedAt\n    }\n  }\n"];
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
export function graphql(source: "\n  query GetPoolById($id: ID!) {\n    getPool(id: $id) {\n      id\n      name\n      businessId\n      description\n      poolAddress\n      rwaAddress\n      expectedHoldAmount\n      expectedRwaAmount\n      rewardPercent\n      entryFeePercent\n      exitFeePercent\n      entryPeriodStart\n      entryPeriodExpired\n      completionPeriodExpired\n      fixedSell\n      paused\n      tags\n      image\n      imageUrl\n      fileId\n      chainId\n      createdAt\n      realHoldReserve\n      virtualHoldReserve\n      virtualRwaReserve\n      ownerId\n      ownerType\n      incomingTranches {\n        amount\n        expiredAt\n        returnedAmount\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPoolById($id: ID!) {\n    getPool(id: $id) {\n      id\n      name\n      businessId\n      description\n      poolAddress\n      rwaAddress\n      expectedHoldAmount\n      expectedRwaAmount\n      rewardPercent\n      entryFeePercent\n      exitFeePercent\n      entryPeriodStart\n      entryPeriodExpired\n      completionPeriodExpired\n      fixedSell\n      paused\n      tags\n      image\n      imageUrl\n      fileId\n      chainId\n      createdAt\n      realHoldReserve\n      virtualHoldReserve\n      virtualRwaReserve\n      ownerId\n      ownerType\n      incomingTranches {\n        amount\n        expiredAt\n        returnedAmount\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPoolDetail($input: FilterInput!) {\n    getPools(input: $input) {\n      id\n      name\n      businessId\n      description\n      poolAddress\n      rwaAddress\n      expectedHoldAmount\n      expectedRwaAmount\n      rewardPercent\n      entryFeePercent\n      exitFeePercent\n      entryPeriodStart\n      entryPeriodExpired\n      completionPeriodExpired\n      fixedSell\n      paused\n      tags\n      image\n      imageUrl\n      fileId\n      chainId\n      createdAt\n      realHoldReserve\n      virtualHoldReserve\n      virtualRwaReserve\n      incomingTranches {\n        amount\n        expiredAt\n        returnedAmount\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPoolDetail($input: FilterInput!) {\n    getPools(input: $input) {\n      id\n      name\n      businessId\n      description\n      poolAddress\n      rwaAddress\n      expectedHoldAmount\n      expectedRwaAmount\n      rewardPercent\n      entryFeePercent\n      exitFeePercent\n      entryPeriodStart\n      entryPeriodExpired\n      completionPeriodExpired\n      fixedSell\n      paused\n      tags\n      image\n      imageUrl\n      fileId\n      chainId\n      createdAt\n      realHoldReserve\n      virtualHoldReserve\n      virtualRwaReserve\n      incomingTranches {\n        amount\n        expiredAt\n        returnedAmount\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPools($input: FilterInput!) {\n    getPools(input: $input) {\n      id\n      name\n      businessId\n      description\n      poolAddress\n      expectedHoldAmount\n      expectedRwaAmount\n      rewardPercent\n      entryPeriodStart\n      entryPeriodExpired\n      completionPeriodExpired\n      fixedSell\n      paused\n      chainId\n      createdAt\n      image\n      imageUrl\n      fileId\n      realHoldReserve\n      virtualHoldReserve\n      virtualRwaReserve\n      isFullyReturned\n      isTargetReached\n      tags\n      riskScore\n    }\n  }\n"): (typeof documents)["\n  query GetPools($input: FilterInput!) {\n    getPools(input: $input) {\n      id\n      name\n      businessId\n      description\n      poolAddress\n      expectedHoldAmount\n      expectedRwaAmount\n      rewardPercent\n      entryPeriodStart\n      entryPeriodExpired\n      completionPeriodExpired\n      fixedSell\n      paused\n      chainId\n      createdAt\n      image\n      imageUrl\n      fileId\n      realHoldReserve\n      virtualHoldReserve\n      virtualRwaReserve\n      isFullyReturned\n      isTargetReached\n      tags\n      riskScore\n    }\n  }\n"];
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
export function graphql(source: "\n  query GetRawPriceData($input: GetRawPriceDataInput!) {\n    getRawPriceData(input: $input) {\n      timestamp\n      price\n    }\n  }\n"): (typeof documents)["\n  query GetRawPriceData($input: GetRawPriceDataInput!) {\n    getRawPriceData(input: $input) {\n      timestamp\n      price\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EditPool($input: EditPoolInput!) {\n    editPool(input: $input) {\n      id\n      name\n      description\n      tags\n      image\n      imageUrl\n      fileId\n    }\n  }\n"): (typeof documents)["\n  mutation EditPool($input: EditPoolInput!) {\n    editPool(input: $input) {\n      id\n      name\n      description\n      tags\n      image\n      imageUrl\n      fileId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLatestPrice($input: GetRawPriceDataInput!) {\n    getRawPriceData(input: $input) {\n      price\n    }\n  }\n"): (typeof documents)["\n  query GetLatestPrice($input: GetRawPriceDataInput!) {\n    getRawPriceData(input: $input) {\n      price\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOhlcPriceData($input: GetOhlcPriceDataInput!) {\n    getOhlcPriceData(input: $input) {\n      timestamp\n      open\n      high\n      low\n      close\n    }\n  }\n"): (typeof documents)["\n  query GetOhlcPriceData($input: GetOhlcPriceDataInput!) {\n    getOhlcPriceData(input: $input) {\n      timestamp\n      open\n      high\n      low\n      close\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetVolumeData($input: GetVolumeDataInput!) {\n    getVolumeData(input: $input) {\n      timestamp\n      mintVolume\n      burnVolume\n    }\n  }\n"): (typeof documents)["\n  query GetVolumeData($input: GetVolumeDataInput!) {\n    getVolumeData(input: $input) {\n      timestamp\n      mintVolume\n      burnVolume\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSignatureTask($input: GetSignatureTaskInput!) {\n    getSignatureTask(input: $input) {\n      id\n      completed\n      expired\n      signatures {\n        signer\n        signature\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetSignatureTask($input: GetSignatureTaskInput!) {\n    getSignatureTask(input: $input) {\n      id\n      completed\n      expired\n      signatures {\n        signer\n        signature\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetReferrals($input: GetReferralsFilterInput) {\n    getReferrals(input: $input) {\n      id\n      userId\n      userWallet\n      referrerId\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetReferrals($input: GetReferralsFilterInput) {\n    getReferrals(input: $input) {\n      id\n      userId\n      userWallet\n      referrerId\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetReferrerClaimHistory($input: GetReferrerClaimHistoryFilterInput) {\n    getReferrerClaimHistory(input: $input) {\n      id\n      amount\n      referralWallet\n      tokenAddress\n      transactionHash\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetReferrerClaimHistory($input: GetReferrerClaimHistoryFilterInput) {\n    getReferrerClaimHistory(input: $input) {\n      id\n      amount\n      referralWallet\n      tokenAddress\n      transactionHash\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetReferrerWithdraws($input: GetReferrerWithdrawsFilterInput) {\n    getReferrerWithdraws(input: $input) {\n      id\n      chainId\n      tokenAddress\n      totalWithdrawnAmount\n      taskCooldown\n      taskExpiredAt\n      taskId\n    }\n  }\n"): (typeof documents)["\n  query GetReferrerWithdraws($input: GetReferrerWithdrawsFilterInput) {\n    getReferrerWithdraws(input: $input) {\n      id\n      chainId\n      tokenAddress\n      totalWithdrawnAmount\n      taskCooldown\n      taskExpiredAt\n      taskId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFees($input: GetFeesFilterInput) {\n    getFees(input: $input) {\n      id\n      userId\n      userWallet\n      tokenAddress\n      chainId\n      referralRewardAmount\n      referralRewardCount\n    }\n  }\n"): (typeof documents)["\n  query GetFees($input: GetFeesFilterInput) {\n    getFees(input: $input) {\n      id\n      userId\n      userWallet\n      tokenAddress\n      chainId\n      referralRewardAmount\n      referralRewardCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateReferrerWithdrawTask($input: CreateReferrerWithdrawTaskInput!) {\n    createReferrerWithdrawTask(input: $input) {\n      id\n      taskId\n      taskCooldown\n      taskExpiredAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateReferrerWithdrawTask($input: CreateReferrerWithdrawTaskInput!) {\n    createReferrerWithdrawTask(input: $input) {\n      id\n      taskId\n      taskCooldown\n      taskExpiredAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RegisterReferral($input: RegisterReferralInput!) {\n    registerReferral(input: $input) {\n      id\n      userId\n      userWallet\n      referrerId\n      referrerWallet\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterReferral($input: RegisterReferralInput!) {\n    registerReferral(input: $input) {\n      id\n      userId\n      userWallet\n      referrerId\n      referrerWallet\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;