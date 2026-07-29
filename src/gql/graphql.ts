/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AddMemberInput = {
  companyId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Answer = {
  __typename?: 'Answer';
  createdAt: Scalars['Float']['output'];
  text: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
  userId: Scalars['String']['output'];
};

export type ApiKey = {
  __typename?: 'ApiKey';
  createdAt: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  prefix: Scalars['String']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['String']['output'];
  wallet: Scalars['String']['output'];
};

export type ApprovalSignaturesResponse = {
  __typename?: 'ApprovalSignaturesResponse';
  taskId: Scalars['String']['output'];
};

export type Assistant = {
  __typename?: 'Assistant';
  contextPreferences: Array<AssistantContext>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export enum AssistantContext {
  InvestorBase = 'investor_base',
  PopularPools = 'popular_pools',
  ProductOwnerBase = 'product_owner_base',
  UserPortfolio = 'user_portfolio'
}

export type AuthTokens = {
  __typename?: 'AuthTokens';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  wallet: Scalars['String']['output'];
};

export type AuthenticateInput = {
  signature: Scalars['String']['input'];
  timestamp: Scalars['Int']['input'];
  wallet: Scalars['String']['input'];
};

export type Blog = {
  __typename?: 'Blog';
  createdAt: Scalars['Float']['output'];
  creator: Scalars['String']['output'];
  grandParentId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  ownerType: Scalars['String']['output'];
  parentId: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
};

export enum BlogParentTypes {
  Business = 'business',
  Pool = 'pool'
}

export type Business = {
  __typename?: 'Business';
  approvalSignaturesTaskExpired?: Maybe<Scalars['Float']['output']>;
  approvalSignaturesTaskId?: Maybe<Scalars['String']['output']>;
  businessType?: Maybe<Scalars['String']['output']>;
  chainId: Scalars['String']['output'];
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  fileId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  ownerType: Scalars['String']['output'];
  ownerWallet?: Maybe<Scalars['String']['output']>;
  paused: Scalars['Boolean']['output'];
  riskScore?: Maybe<Scalars['Int']['output']>;
  riskScoreEvaluationProcess: Scalars['Boolean']['output'];
  socials: Array<SocialLink>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  tokenAddress?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Float']['output'];
};

export enum BusinessOwnerType {
  Company = 'company'
}

export enum BusinessType {
  Franchise = 'franchise',
  Growth = 'growth',
  Startup = 'startup'
}

export type Company = {
  __typename?: 'Company';
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  socials: Array<SocialLink>;
  updatedAt: Scalars['Int']['output'];
};

export type CompanyWithDetails = {
  __typename?: 'CompanyWithDetails';
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  socials: Array<SocialLink>;
  updatedAt: Scalars['Int']['output'];
  users: Array<UserWithPermissions>;
};

export type CreateApiKeyInput = {
  name: Scalars['String']['input'];
};

export type CreateApiKeyResult = {
  __typename?: 'CreateApiKeyResult';
  createdAt: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  prefix: Scalars['String']['output'];
};

export type CreateAssistantInput = {
  contextPreferences: Array<AssistantContext>;
  name: Scalars['String']['input'];
};

export type CreateBlogInput = {
  name: Scalars['String']['input'];
  parentId: Scalars['String']['input'];
  type: BlogParentTypes;
};

export type CreateBusinessInput = {
  businessType?: InputMaybe<BusinessType>;
  chainId: Scalars['String']['input'];
  country?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId: Scalars['String']['input'];
  ownerType: BusinessOwnerType;
  socials?: InputMaybe<Array<SocialLinkInput>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateBusinessWithAiInput = {
  chainId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  ownerId: Scalars['String']['input'];
  ownerType: BusinessOwnerType;
};

export type CreateCompanyInput = {
  country?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  socials?: InputMaybe<Array<SocialLinkInput>>;
};

export type CreateDocumentInput = {
  file: Scalars['Upload']['input'];
  folderId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateFaqAnswerInput = {
  answer: Scalars['String']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
  question: Scalars['String']['input'];
  topicId: Scalars['String']['input'];
};

export type CreateFaqTopicInput = {
  name: Scalars['String']['input'];
  parentId: Scalars['String']['input'];
  type: FaqParentTypes;
};

export type CreateFolderInput = {
  name: Scalars['String']['input'];
  parentId: Scalars['String']['input'];
  type: ParentTypes;
};

export type CreateGalleryInput = {
  name: Scalars['String']['input'];
  parentId: Scalars['String']['input'];
  type: GalleryParentTypes;
};

export type CreateImageInput = {
  description: Scalars['String']['input'];
  file?: InputMaybe<Scalars['Upload']['input']>;
  galleryId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateMessageInput = {
  assistantId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};

export type CreatePoolInput = {
  allowEntryBurn?: InputMaybe<Scalars['Boolean']['input']>;
  awaitCompletionExpired?: InputMaybe<Scalars['Boolean']['input']>;
  businessId: Scalars['String']['input'];
  completionPeriodExpired?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  entryFeePercent?: InputMaybe<Scalars['String']['input']>;
  entryPeriodExpired?: InputMaybe<Scalars['Float']['input']>;
  entryPeriodStart?: InputMaybe<Scalars['Float']['input']>;
  exitFeePercent?: InputMaybe<Scalars['String']['input']>;
  expectedHoldAmount?: InputMaybe<Scalars['String']['input']>;
  expectedRwaAmount?: InputMaybe<Scalars['String']['input']>;
  fixedSell?: InputMaybe<Scalars['Boolean']['input']>;
  floatingOutTranchesTimestamps?: InputMaybe<Scalars['Boolean']['input']>;
  incomingTranches?: InputMaybe<Array<IncomingTrancheInput>>;
  name: Scalars['String']['input'];
  outgoingTranches?: InputMaybe<Array<OutgoingTrancheInput>>;
  priceImpactPercent?: InputMaybe<Scalars['String']['input']>;
  rewardPercent?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreatePoolWithAiInput = {
  businessId: Scalars['String']['input'];
  description: Scalars['String']['input'];
};

export type CreatePostInput = {
  blogId: Scalars['String']['input'];
  content: Scalars['String']['input'];
  documents?: InputMaybe<Array<Scalars['String']['input']>>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type CreateQuestionAnswerInput = {
  id: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};

export type CreateQuestionInput = {
  text: Scalars['String']['input'];
  topicId: Scalars['String']['input'];
};

export type CreateReferrerWithdrawTaskInput = {
  amount: Scalars['String']['input'];
  chainId: Scalars['String']['input'];
  tokenAddress: Scalars['String']['input'];
};

export type CreateTopicInput = {
  name: Scalars['String']['input'];
  parentId: Scalars['String']['input'];
  type: ParentTypes;
};

export type CreateWebhookEndpointInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  events: Array<Scalars['String']['input']>;
  rateLimitPerMinute?: InputMaybe<Scalars['Int']['input']>;
  url: Scalars['String']['input'];
};

export type CreateWebhookEndpointResult = {
  __typename?: 'CreateWebhookEndpointResult';
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  events: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  rateLimitPerMinute: Scalars['Int']['output'];
  secret: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Document = {
  __typename?: 'Document';
  createdAt: Scalars['Float']['output'];
  creator: Scalars['String']['output'];
  fileId: Scalars['String']['output'];
  folderId: Scalars['String']['output'];
  grandParentId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mimeType: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  ownerType: Scalars['String']['output'];
  parentId: Scalars['String']['output'];
  path: Scalars['String']['output'];
  size: Scalars['Float']['output'];
  updatedAt: Scalars['Float']['output'];
  url: Scalars['String']['output'];
};

export type EditBusinessDataInput = {
  businessType?: InputMaybe<BusinessType>;
  chainId?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  socials?: InputMaybe<Array<SocialLinkInput>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type EditBusinessInput = {
  id: Scalars['ID']['input'];
  updateData: EditBusinessDataInput;
};

export type EditPoolDataInput = {
  allowEntryBurn?: InputMaybe<Scalars['Boolean']['input']>;
  awaitCompletionExpired?: InputMaybe<Scalars['Boolean']['input']>;
  chainId?: InputMaybe<Scalars['String']['input']>;
  completionPeriodExpired?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  entryFeePercent?: InputMaybe<Scalars['String']['input']>;
  entryPeriodExpired?: InputMaybe<Scalars['Float']['input']>;
  entryPeriodStart?: InputMaybe<Scalars['Float']['input']>;
  exitFeePercent?: InputMaybe<Scalars['String']['input']>;
  expectedHoldAmount?: InputMaybe<Scalars['String']['input']>;
  expectedRwaAmount?: InputMaybe<Scalars['String']['input']>;
  fixedSell?: InputMaybe<Scalars['Boolean']['input']>;
  floatingOutTranchesTimestamps?: InputMaybe<Scalars['Boolean']['input']>;
  incomingTranches?: InputMaybe<Array<IncomingTrancheInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  outgoingTranches?: InputMaybe<Array<OutgoingTrancheInput>>;
  priceImpactPercent?: InputMaybe<Scalars['String']['input']>;
  rewardPercent?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type EditPoolInput = {
  id: Scalars['ID']['input'];
  updateData: EditPoolDataInput;
};

export type EntityReactionsResponse = {
  __typename?: 'EntityReactionsResponse';
  reactions: Scalars['JSON']['output'];
  userReactions: Array<Scalars['String']['output']>;
};

export type Evaluation = {
  __typename?: 'Evaluation';
  createdAt: Scalars['Float']['output'];
  entityType: EvaluationEntityType;
  evaluatedDocuments: Array<EvaluationDocumentRef>;
  evaluatedImages: Array<EvaluationImageRef>;
  factors: Array<EvaluationFactor>;
  grandParentId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  modelUsed?: Maybe<Scalars['String']['output']>;
  ownerId: Scalars['String']['output'];
  ownerType: Scalars['String']['output'];
  parentId: Scalars['String']['output'];
  reasoning?: Maybe<Scalars['String']['output']>;
  riskScore?: Maybe<Scalars['Int']['output']>;
  stage1Response?: Maybe<Scalars['String']['output']>;
  stage2Response?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type EvaluationDocumentRef = {
  __typename?: 'EvaluationDocumentRef';
  id: Scalars['String']['output'];
  mimeType: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export enum EvaluationEntityType {
  Business = 'business',
  Pool = 'pool'
}

export type EvaluationFactor = {
  __typename?: 'EvaluationFactor';
  detail: Scalars['String']['output'];
  impact: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type EvaluationFilterInput = {
  entityType?: InputMaybe<EvaluationEntityType>;
  grandParentId?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export type EvaluationImageRef = {
  __typename?: 'EvaluationImageRef';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type EvaluationSortInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  riskScore?: InputMaybe<Scalars['String']['input']>;
};

export type FaqAnswer = {
  __typename?: 'FaqAnswer';
  answer: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  creator: Scalars['String']['output'];
  grandParentId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  order: Scalars['Int']['output'];
  ownerId: Scalars['String']['output'];
  ownerType: Scalars['String']['output'];
  parentId: Scalars['String']['output'];
  question: Scalars['String']['output'];
  topicId: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
};

export enum FaqParentTypes {
  Business = 'business',
  Pool = 'pool'
}

export type FaqTopic = {
  __typename?: 'FaqTopic';
  createdAt: Scalars['Float']['output'];
  creator: Scalars['String']['output'];
  grandParentId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  ownerType: Scalars['String']['output'];
  parentId: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type FaucetRequest = {
  __typename?: 'FaucetRequest';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  tokenType: FaucetTokenType;
  transactionHash: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  wallet: Scalars['String']['output'];
};

export enum FaucetTokenType {
  Gas = 'gas',
  Hold = 'hold',
  Platform = 'platform'
}

export type Fees = {
  __typename?: 'Fees';
  buyCommissionAmount: Scalars['String']['output'];
  buyCommissionCount: Scalars['Int']['output'];
  chainId: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  poolCreationCommissionAmount: Scalars['String']['output'];
  poolCreationCommissionCount: Scalars['Int']['output'];
  referralRewardAmount: Scalars['String']['output'];
  referralRewardCount: Scalars['Int']['output'];
  sellCommissionAmount: Scalars['String']['output'];
  sellCommissionCount: Scalars['Int']['output'];
  tokenAddress: Scalars['String']['output'];
  tokenCreationCommissionAmount: Scalars['String']['output'];
  tokenCreationCommissionCount: Scalars['Int']['output'];
  updatedAt: Scalars['Float']['output'];
  userId: Scalars['String']['output'];
  userWallet: Scalars['String']['output'];
};

export type FilterInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type Folder = {
  __typename?: 'Folder';
  createdAt: Scalars['Float']['output'];
  creator: Scalars['String']['output'];
  grandParentId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  ownerType: Scalars['String']['output'];
  parentId: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type Gallery = {
  __typename?: 'Gallery';
  createdAt: Scalars['Float']['output'];
  creator: Scalars['String']['output'];
  grandParentId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  ownerType: Scalars['String']['output'];
  parentId: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
};

export enum GalleryParentTypes {
  Business = 'business',
  Pool = 'pool',
  User = 'user'
}

export type GetBalancesInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetBlogsFilterInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetCompaniesInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetDocumentsFilterInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetEvaluationsInput = {
  filter?: InputMaybe<EvaluationFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<EvaluationSortInput>;
};

export type GetFaqAnswersFilterInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetFaqTopicsFilterInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetFeesFilterInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetFoldersFilterInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetGalleriesFilterInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetImagesFilterInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetOhlcPriceDataInput = {
  endTime: Scalars['Float']['input'];
  interval: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  poolAddress: Scalars['String']['input'];
  startTime: Scalars['Float']['input'];
};

export type GetPoolTransactionsInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetPostsFilterInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetProposalsFilterInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetQuestionsFilterInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetRawPriceDataInput = {
  endTime: Scalars['Float']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  poolAddress: Scalars['String']['input'];
  sort?: InputMaybe<Scalars['JSON']['input']>;
  startTime: Scalars['Float']['input'];
};

export type GetReactionsFilterInput = {
  filter: Scalars['JSON']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetReferralsFilterInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetReferrerClaimHistoryFilterInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetReferrerWithdrawsFilterInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetSignatureTaskInput = {
  taskId: Scalars['String']['input'];
};

export type GetStakingFilterInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetStakingHistoryFilterInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetTimelockTasksFilterInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetTopicsFilterInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetTransactionsInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetTreasuryWithdrawsFilterInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetVolumeDataInput = {
  endTime: Scalars['Float']['input'];
  interval: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  poolAddress: Scalars['String']['input'];
  startTime: Scalars['Float']['input'];
};

export type GetVotesFilterInput = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};

export type GrantPermissionInput = {
  companyId: Scalars['ID']['input'];
  entity: Scalars['String']['input'];
  memberId: Scalars['ID']['input'];
  permission: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type IdResponse = {
  __typename?: 'IdResponse';
  id: Scalars['ID']['output'];
};

export type Image = {
  __typename?: 'Image';
  createdAt: Scalars['Float']['output'];
  creator: Scalars['String']['output'];
  description: Scalars['String']['output'];
  fileId: Scalars['String']['output'];
  galleryId: Scalars['String']['output'];
  grandParentId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mimeType: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  ownerType: Scalars['String']['output'];
  parentId: Scalars['String']['output'];
  path: Scalars['String']['output'];
  size: Scalars['Float']['output'];
  updatedAt: Scalars['Float']['output'];
  url: Scalars['String']['output'];
};

export type IncomingTranche = {
  __typename?: 'IncomingTranche';
  amount: Scalars['String']['output'];
  expiredAt: Scalars['Float']['output'];
  returnedAmount: Scalars['String']['output'];
};

export type IncomingTrancheInput = {
  amount: Scalars['String']['input'];
  expiredAt: Scalars['Float']['input'];
  returnedAmount: Scalars['String']['input'];
};

export type Member = {
  __typename?: 'Member';
  createdAt: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['String']['output'];
};

export type Message = {
  __typename?: 'Message';
  assistantId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']['output']>;
  addMember: Member;
  authenticate: AuthTokens;
  createApiKey: CreateApiKeyResult;
  createAssistant: Assistant;
  createBlog: Blog;
  createBusiness: Business;
  createBusinessWithAI: Business;
  createCompany: Company;
  createDocument: Document;
  createFaqAnswer: FaqAnswer;
  createFaqTopic: FaqTopic;
  createFolder: Folder;
  createGallery: Gallery;
  createImage: Image;
  createMessage: Array<Message>;
  createPool: Pool;
  createPoolWithAI: Pool;
  createPost: Post;
  createQuestion: Question;
  createQuestionAnswer: Question;
  createReferrerWithdrawTask: ReferrerWithdraw;
  createTopic: Topic;
  createWebhookEndpoint: CreateWebhookEndpointResult;
  deleteApiKey: Scalars['ID']['output'];
  deleteAssistant: IdResponse;
  deleteBlog: Scalars['ID']['output'];
  deleteCompany: Scalars['ID']['output'];
  deleteDocument: Scalars['ID']['output'];
  deleteFaqAnswer: Scalars['ID']['output'];
  deleteFaqTopic: Scalars['ID']['output'];
  deleteFolder: Scalars['ID']['output'];
  deleteGallery: Scalars['ID']['output'];
  deleteImage: Scalars['ID']['output'];
  deleteMessage: IdResponse;
  deletePost: Scalars['ID']['output'];
  deleteQuestion: Scalars['ID']['output'];
  deleteTopic: Scalars['ID']['output'];
  deleteWebhookEndpoint: Scalars['ID']['output'];
  editBusiness: Business;
  editPool: Pool;
  grantPermission: Permission;
  refreshToken: AuthTokens;
  registerReferral: Referral;
  rejectBusinessApprovalSignatures: Scalars['Boolean']['output'];
  rejectPoolApprovalSignatures: Scalars['Boolean']['output'];
  removeMember: Scalars['ID']['output'];
  requestBusinessApprovalSignatures: ApprovalSignaturesResponse;
  requestGas: FaucetRequest;
  requestHold: FaucetRequest;
  requestPlatform: FaucetRequest;
  requestPoolApprovalSignatures: ApprovalSignaturesResponse;
  resetReaction?: Maybe<Reaction>;
  revokePermission: Scalars['ID']['output'];
  revokeTokens: RevokeTokensResult;
  setReaction: Reaction;
  toggleQuestionLike: Scalars['Boolean']['output'];
  updateApiKey: ApiKey;
  updateAssistant: Assistant;
  updateBlog: Blog;
  updateBusinessRiskScore: Business;
  updateCompany: Company;
  updateDocument: Document;
  updateFaqAnswer: FaqAnswer;
  updateFaqTopic: FaqTopic;
  updateFolder: Folder;
  updateGallery: Gallery;
  updateImage: Image;
  updateMessage: Message;
  updatePoolRiskScore: Pool;
  updatePost: Post;
  updateQuestionAnswer: Question;
  updateQuestionText: Question;
  updateTopic: Topic;
  updateWebhookEndpoint: WebhookEndpoint;
};


export type MutationAddMemberArgs = {
  input: AddMemberInput;
};


export type MutationAuthenticateArgs = {
  input: AuthenticateInput;
};


export type MutationCreateApiKeyArgs = {
  input: CreateApiKeyInput;
};


export type MutationCreateAssistantArgs = {
  input: CreateAssistantInput;
};


export type MutationCreateBlogArgs = {
  input: CreateBlogInput;
};


export type MutationCreateBusinessArgs = {
  input: CreateBusinessInput;
};


export type MutationCreateBusinessWithAiArgs = {
  input: CreateBusinessWithAiInput;
};


export type MutationCreateCompanyArgs = {
  input: CreateCompanyInput;
};


export type MutationCreateDocumentArgs = {
  input: CreateDocumentInput;
};


export type MutationCreateFaqAnswerArgs = {
  input: CreateFaqAnswerInput;
};


export type MutationCreateFaqTopicArgs = {
  input: CreateFaqTopicInput;
};


export type MutationCreateFolderArgs = {
  input: CreateFolderInput;
};


export type MutationCreateGalleryArgs = {
  input: CreateGalleryInput;
};


export type MutationCreateImageArgs = {
  input: CreateImageInput;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationCreatePoolArgs = {
  input: CreatePoolInput;
};


export type MutationCreatePoolWithAiArgs = {
  input: CreatePoolWithAiInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateQuestionArgs = {
  input: CreateQuestionInput;
};


export type MutationCreateQuestionAnswerArgs = {
  input: CreateQuestionAnswerInput;
};


export type MutationCreateReferrerWithdrawTaskArgs = {
  input: CreateReferrerWithdrawTaskInput;
};


export type MutationCreateTopicArgs = {
  input: CreateTopicInput;
};


export type MutationCreateWebhookEndpointArgs = {
  input: CreateWebhookEndpointInput;
};


export type MutationDeleteApiKeyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteAssistantArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteBlogArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteFaqAnswerArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteFaqTopicArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteFolderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteGalleryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteImageArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteQuestionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTopicArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteWebhookEndpointArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEditBusinessArgs = {
  input: EditBusinessInput;
};


export type MutationEditPoolArgs = {
  input: EditPoolInput;
};


export type MutationGrantPermissionArgs = {
  input: GrantPermissionInput;
};


export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput;
};


export type MutationRegisterReferralArgs = {
  input: RegisterReferralInput;
};


export type MutationRejectBusinessApprovalSignaturesArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRejectPoolApprovalSignaturesArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveMemberArgs = {
  input: RemoveMemberInput;
};


export type MutationRequestBusinessApprovalSignaturesArgs = {
  input: RequestBusinessApprovalSignaturesInput;
};


export type MutationRequestGasArgs = {
  input: RequestTokenInput;
};


export type MutationRequestHoldArgs = {
  input: RequestTokenInput;
};


export type MutationRequestPlatformArgs = {
  input: RequestTokenInput;
};


export type MutationRequestPoolApprovalSignaturesArgs = {
  input: RequestPoolApprovalSignaturesInput;
};


export type MutationResetReactionArgs = {
  input: SetReactionInput;
};


export type MutationRevokePermissionArgs = {
  input: RevokePermissionInput;
};


export type MutationRevokeTokensArgs = {
  input: RevokeTokensInput;
};


export type MutationSetReactionArgs = {
  input: SetReactionInput;
};


export type MutationToggleQuestionLikeArgs = {
  questionId: Scalars['ID']['input'];
};


export type MutationUpdateApiKeyArgs = {
  input: UpdateApiKeyInput;
};


export type MutationUpdateAssistantArgs = {
  input: UpdateAssistantInput;
};


export type MutationUpdateBlogArgs = {
  input: UpdateBlogInput;
};


export type MutationUpdateBusinessRiskScoreArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCompanyArgs = {
  input: UpdateCompanyInput;
};


export type MutationUpdateDocumentArgs = {
  input: UpdateDocumentInput;
};


export type MutationUpdateFaqAnswerArgs = {
  input: UpdateFaqAnswerInput;
};


export type MutationUpdateFaqTopicArgs = {
  input: UpdateFaqTopicInput;
};


export type MutationUpdateFolderArgs = {
  input: UpdateFolderInput;
};


export type MutationUpdateGalleryArgs = {
  input: UpdateGalleryInput;
};


export type MutationUpdateImageArgs = {
  input: UpdateImageInput;
};


export type MutationUpdateMessageArgs = {
  input: UpdateMessageInput;
};


export type MutationUpdatePoolRiskScoreArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


export type MutationUpdateQuestionAnswerArgs = {
  input: UpdateQuestionAnswerInput;
};


export type MutationUpdateQuestionTextArgs = {
  input: UpdateQuestionTextInput;
};


export type MutationUpdateTopicArgs = {
  input: UpdateTopicInput;
};


export type MutationUpdateWebhookEndpointArgs = {
  input: UpdateWebhookEndpointInput;
};

export type OhlcData = {
  __typename?: 'OhlcData';
  close: Scalars['String']['output'];
  high: Scalars['String']['output'];
  low: Scalars['String']['output'];
  open: Scalars['String']['output'];
  timestamp: Scalars['Float']['output'];
};

export type OutgoingTranche = {
  __typename?: 'OutgoingTranche';
  amount: Scalars['String']['output'];
  executedAmount: Scalars['String']['output'];
  timestamp: Scalars['Float']['output'];
};

export type OutgoingTrancheInput = {
  amount: Scalars['String']['input'];
  executedAmount: Scalars['String']['input'];
  timestamp: Scalars['Float']['input'];
};

export type PaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFieldInput>;
};

export enum ParentType {
  Blog = 'blog',
  Business = 'business',
  Company = 'company',
  Document = 'document',
  Image = 'image',
  Pool = 'pool',
  Post = 'post'
}

export enum ParentTypes {
  Business = 'business',
  Pool = 'pool'
}

export type Permission = {
  __typename?: 'Permission';
  createdAt: Scalars['Int']['output'];
  entity?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  permission: Scalars['String']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type Pool = {
  __typename?: 'Pool';
  allowEntryBurn: Scalars['Boolean']['output'];
  approvalSignaturesTaskExpired?: Maybe<Scalars['Float']['output']>;
  approvalSignaturesTaskId?: Maybe<Scalars['String']['output']>;
  awaitCompletionExpired: Scalars['Boolean']['output'];
  awaitingBonusAmount?: Maybe<Scalars['String']['output']>;
  awaitingRwaAmount?: Maybe<Scalars['String']['output']>;
  businessId: Scalars['String']['output'];
  chainId: Scalars['String']['output'];
  completionPeriodExpired?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  entryFeePercent?: Maybe<Scalars['String']['output']>;
  entryPeriodExpired?: Maybe<Scalars['Float']['output']>;
  entryPeriodStart?: Maybe<Scalars['Float']['output']>;
  exitFeePercent?: Maybe<Scalars['String']['output']>;
  expectedBonusAmount?: Maybe<Scalars['String']['output']>;
  expectedHoldAmount?: Maybe<Scalars['String']['output']>;
  expectedRwaAmount?: Maybe<Scalars['String']['output']>;
  fileId?: Maybe<Scalars['String']['output']>;
  fixedSell: Scalars['Boolean']['output'];
  floatingOutTranchesTimestamps: Scalars['Boolean']['output'];
  floatingTimestampOffset: Scalars['Float']['output'];
  fullReturnTimestamp?: Maybe<Scalars['Float']['output']>;
  holdToken?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  incomingTranches: Array<IncomingTranche>;
  isFullyReturned: Scalars['Boolean']['output'];
  isTargetReached: Scalars['Boolean']['output'];
  k?: Maybe<Scalars['String']['output']>;
  lastCompletedIncomingTranche: Scalars['Int']['output'];
  liquidityCoefficient?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  outgoingTranches: Array<OutgoingTranche>;
  outgoingTranchesBalance?: Maybe<Scalars['String']['output']>;
  ownerId: Scalars['String']['output'];
  ownerType: Scalars['String']['output'];
  ownerWallet?: Maybe<Scalars['String']['output']>;
  paused: Scalars['Boolean']['output'];
  poolAddress?: Maybe<Scalars['String']['output']>;
  priceImpactPercent?: Maybe<Scalars['String']['output']>;
  realHoldReserve?: Maybe<Scalars['String']['output']>;
  rewardPercent?: Maybe<Scalars['String']['output']>;
  riskScore?: Maybe<Scalars['Int']['output']>;
  riskScoreEvaluationProcess: Scalars['Boolean']['output'];
  rwaAddress: Scalars['String']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  tokenId?: Maybe<Scalars['String']['output']>;
  totalClaimedAmount?: Maybe<Scalars['String']['output']>;
  totalReturnedAmount?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Float']['output'];
  virtualHoldReserve?: Maybe<Scalars['String']['output']>;
  virtualRwaReserve?: Maybe<Scalars['String']['output']>;
};

export type PoolTransaction = {
  __typename?: 'PoolTransaction';
  bonusAmount: Scalars['String']['output'];
  bonusFee: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  holdAmount: Scalars['String']['output'];
  holdFee: Scalars['String']['output'];
  id: Scalars['String']['output'];
  poolAddress: Scalars['String']['output'];
  rwaAmount: Scalars['String']['output'];
  timestamp: Scalars['Float']['output'];
  transactionType: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
  userAddress: Scalars['String']['output'];
};

export type Post = {
  __typename?: 'Post';
  blogId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  creator: Scalars['String']['output'];
  documents: Array<Scalars['String']['output']>;
  grandParentId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  ownerId: Scalars['String']['output'];
  ownerType: Scalars['String']['output'];
  parentId: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type PriceData = {
  __typename?: 'PriceData';
  blockNumber: Scalars['Float']['output'];
  createdAt: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  poolAddress: Scalars['String']['output'];
  price: Scalars['String']['output'];
  realHoldReserve: Scalars['String']['output'];
  timestamp: Scalars['Float']['output'];
  updatedAt: Scalars['Float']['output'];
  virtualHoldReserve: Scalars['String']['output'];
  virtualRwaReserve: Scalars['String']['output'];
};

export type PriceUpdateEvent = {
  __typename?: 'PriceUpdateEvent';
  poolAddress: Scalars['String']['output'];
  price: Scalars['String']['output'];
  realHoldReserve: Scalars['String']['output'];
  timestamp: Scalars['Float']['output'];
  virtualHoldReserve: Scalars['String']['output'];
  virtualRwaReserve: Scalars['String']['output'];
};

export type Proposal = {
  __typename?: 'Proposal';
  chainId: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  data: Scalars['String']['output'];
  description: Scalars['String']['output'];
  endTime: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  logIndex: Scalars['Float']['output'];
  proposalId: Scalars['String']['output'];
  proposer: Scalars['String']['output'];
  startTime: Scalars['Float']['output'];
  state: Scalars['String']['output'];
  target: Scalars['String']['output'];
  transactionHash: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']['output']>;
  getApiKey: ApiKey;
  getApiKeys: Array<ApiKey>;
  getAssistant: Assistant;
  getBalances: Array<TokenBalance>;
  getBlog: Blog;
  getBlogs: Array<Blog>;
  getBusiness: Business;
  getBusinesses: Array<Business>;
  getCompanies: Array<Company>;
  getCompany: CompanyWithDetails;
  getDocument: Document;
  getDocuments: Array<Document>;
  getEntityReactions: EntityReactionsResponse;
  getEvaluation: Evaluation;
  getEvaluations: Array<Evaluation>;
  getFaqAnswer: FaqAnswer;
  getFaqAnswers: Array<FaqAnswer>;
  getFaqTopic: FaqTopic;
  getFaqTopics: Array<FaqTopic>;
  getFees: Array<Fees>;
  getFolder: Folder;
  getFolders: Array<Folder>;
  getGalleries: Array<Gallery>;
  getGallery: Gallery;
  getHistory: Array<FaucetRequest>;
  getImage: Image;
  getImages: Array<Image>;
  getMessage: Message;
  getMessageHistory: Array<Message>;
  getOhlcPriceData: Array<OhlcData>;
  getPool: Pool;
  getPoolTransactions: Array<PoolTransaction>;
  getPools: Array<Pool>;
  getPost: Post;
  getPosts: Array<Post>;
  getProposals: Array<Proposal>;
  getQuestion: Question;
  getQuestions: Array<Question>;
  getRawPriceData: Array<PriceData>;
  getReactions: Array<Reaction>;
  getReferrals: Array<Referral>;
  getReferrerClaimHistory: Array<ReferrerClaimHistory>;
  getReferrerWithdraws: Array<ReferrerWithdraw>;
  getSignatureTask: SignatureTask;
  getStaking: Array<Staking>;
  getStakingHistory: Array<StakingHistory>;
  getTimelockTasks: Array<TimelockTask>;
  getTopic: Topic;
  getTopics: Array<Topic>;
  getTransactions: Array<Transaction>;
  getTreasuryWithdraws: Array<TreasuryWithdraw>;
  getUnlockTime: UnlockTimeResponse;
  getUserAssistants: Array<Assistant>;
  getUserTokens: Array<RefreshToken>;
  getVolumeData: Array<VolumeData>;
  getVotes: Array<Vote>;
  getWebhookEndpoint: WebhookEndpoint;
  getWebhookEndpoints: Array<WebhookEndpoint>;
};


export type QueryGetApiKeyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetAssistantArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetBalancesArgs = {
  input: GetBalancesInput;
};


export type QueryGetBlogArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetBlogsArgs = {
  input?: InputMaybe<GetBlogsFilterInput>;
};


export type QueryGetBusinessArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetBusinessesArgs = {
  input: FilterInput;
};


export type QueryGetCompaniesArgs = {
  input?: InputMaybe<GetCompaniesInput>;
};


export type QueryGetCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetDocumentsArgs = {
  input?: InputMaybe<GetDocumentsFilterInput>;
};


export type QueryGetEntityReactionsArgs = {
  parentId: Scalars['String']['input'];
  parentType: Scalars['String']['input'];
};


export type QueryGetEvaluationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetEvaluationsArgs = {
  input?: InputMaybe<GetEvaluationsInput>;
};


export type QueryGetFaqAnswerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetFaqAnswersArgs = {
  input?: InputMaybe<GetFaqAnswersFilterInput>;
};


export type QueryGetFaqTopicArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetFaqTopicsArgs = {
  input?: InputMaybe<GetFaqTopicsFilterInput>;
};


export type QueryGetFeesArgs = {
  input?: InputMaybe<GetFeesFilterInput>;
};


export type QueryGetFolderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetFoldersArgs = {
  input?: InputMaybe<GetFoldersFilterInput>;
};


export type QueryGetGalleriesArgs = {
  input?: InputMaybe<GetGalleriesFilterInput>;
};


export type QueryGetGalleryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetHistoryArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryGetImageArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetImagesArgs = {
  input?: InputMaybe<GetImagesFilterInput>;
};


export type QueryGetMessageArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetMessageHistoryArgs = {
  assistantId: Scalars['ID']['input'];
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryGetOhlcPriceDataArgs = {
  input: GetOhlcPriceDataInput;
};


export type QueryGetPoolArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPoolTransactionsArgs = {
  input: GetPoolTransactionsInput;
};


export type QueryGetPoolsArgs = {
  input: FilterInput;
};


export type QueryGetPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPostsArgs = {
  input?: InputMaybe<GetPostsFilterInput>;
};


export type QueryGetProposalsArgs = {
  input?: InputMaybe<GetProposalsFilterInput>;
};


export type QueryGetQuestionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetQuestionsArgs = {
  input?: InputMaybe<GetQuestionsFilterInput>;
};


export type QueryGetRawPriceDataArgs = {
  input: GetRawPriceDataInput;
};


export type QueryGetReactionsArgs = {
  input: GetReactionsFilterInput;
};


export type QueryGetReferralsArgs = {
  input?: InputMaybe<GetReferralsFilterInput>;
};


export type QueryGetReferrerClaimHistoryArgs = {
  input?: InputMaybe<GetReferrerClaimHistoryFilterInput>;
};


export type QueryGetReferrerWithdrawsArgs = {
  input?: InputMaybe<GetReferrerWithdrawsFilterInput>;
};


export type QueryGetSignatureTaskArgs = {
  input: GetSignatureTaskInput;
};


export type QueryGetStakingArgs = {
  input?: InputMaybe<GetStakingFilterInput>;
};


export type QueryGetStakingHistoryArgs = {
  input?: InputMaybe<GetStakingHistoryFilterInput>;
};


export type QueryGetTimelockTasksArgs = {
  input?: InputMaybe<GetTimelockTasksFilterInput>;
};


export type QueryGetTopicArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTopicsArgs = {
  input?: InputMaybe<GetTopicsFilterInput>;
};


export type QueryGetTransactionsArgs = {
  input: GetTransactionsInput;
};


export type QueryGetTreasuryWithdrawsArgs = {
  input?: InputMaybe<GetTreasuryWithdrawsFilterInput>;
};


export type QueryGetUserAssistantsArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryGetVolumeDataArgs = {
  input: GetVolumeDataInput;
};


export type QueryGetVotesArgs = {
  input?: InputMaybe<GetVotesFilterInput>;
};


export type QueryGetWebhookEndpointArgs = {
  id: Scalars['ID']['input'];
};

export type Question = {
  __typename?: 'Question';
  answer?: Maybe<Answer>;
  answered: Scalars['Boolean']['output'];
  createdAt: Scalars['Float']['output'];
  creator: Scalars['String']['output'];
  grandParentId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  likesCount: Scalars['Int']['output'];
  ownerId: Scalars['String']['output'];
  ownerType: Scalars['String']['output'];
  parentId: Scalars['String']['output'];
  text: Scalars['String']['output'];
  topicId: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type Reaction = {
  __typename?: 'Reaction';
  createdAt: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  parentId: Scalars['String']['output'];
  parentType: Scalars['String']['output'];
  reaction: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
  userId: Scalars['String']['output'];
};

export enum ReactionType {
  Angry = 'angry',
  Dislike = 'dislike',
  Haha = 'haha',
  Like = 'like',
  Love = 'love',
  Sad = 'sad',
  Wow = 'wow'
}

export type Referral = {
  __typename?: 'Referral';
  createdAt: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  referrerId?: Maybe<Scalars['String']['output']>;
  referrerWallet?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Float']['output'];
  userId: Scalars['String']['output'];
  userWallet: Scalars['String']['output'];
};

export type ReferrerClaimHistory = {
  __typename?: 'ReferrerClaimHistory';
  amount: Scalars['String']['output'];
  blockNumber: Scalars['Int']['output'];
  chainId: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  logIndex: Scalars['Int']['output'];
  referralWallet: Scalars['String']['output'];
  referrerId: Scalars['String']['output'];
  referrerWallet: Scalars['String']['output'];
  tokenAddress: Scalars['String']['output'];
  transactionHash: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type ReferrerWithdraw = {
  __typename?: 'ReferrerWithdraw';
  chainId: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  referrerId: Scalars['String']['output'];
  referrerWallet: Scalars['String']['output'];
  taskCooldown?: Maybe<Scalars['Float']['output']>;
  taskExpiredAt?: Maybe<Scalars['Float']['output']>;
  taskId?: Maybe<Scalars['String']['output']>;
  tokenAddress: Scalars['String']['output'];
  totalWithdrawnAmount: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type RefreshToken = {
  __typename?: 'RefreshToken';
  createdAt: Scalars['Int']['output'];
  expiresAt: Scalars['Int']['output'];
  tokenHash: Scalars['String']['output'];
  tokenId: Scalars['String']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['String']['output'];
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String']['input'];
};

export type RegisterReferralInput = {
  referrerId?: InputMaybe<Scalars['String']['input']>;
};

export type RemoveMemberInput = {
  companyId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};

export type RequestBusinessApprovalSignaturesInput = {
  createRWAFee: Scalars['String']['input'];
  deployerWallet: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  ownerWallet: Scalars['String']['input'];
};

export type RequestPoolApprovalSignaturesInput = {
  createPoolFeeRatio: Scalars['String']['input'];
  deployerWallet: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  ownerWallet: Scalars['String']['input'];
};

export type RequestTokenInput = {
  amount: Scalars['Float']['input'];
};

export type RevokePermissionInput = {
  companyId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};

export type RevokeTokensInput = {
  tokenHashes: Array<Scalars['String']['input']>;
};

export type RevokeTokensResult = {
  __typename?: 'RevokeTokensResult';
  revokedCount: Scalars['Int']['output'];
};

export type SetReactionInput = {
  parentId: Scalars['String']['input'];
  parentType: ParentType;
  reaction: ReactionType;
};

export type Signature = {
  __typename?: 'Signature';
  signature: Scalars['String']['output'];
  signer: Scalars['String']['output'];
};

export type SignatureTask = {
  __typename?: 'SignatureTask';
  completed: Scalars['Boolean']['output'];
  expired: Scalars['Float']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  ownerId: Scalars['String']['output'];
  ownerType: Scalars['String']['output'];
  requiredSignatures: Scalars['Int']['output'];
  signatures?: Maybe<Array<Signature>>;
};

export type SocialLink = {
  __typename?: 'SocialLink';
  type: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type SocialLinkInput = {
  type: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type SortFieldInput = {
  direction: SortDirection;
  field: Scalars['String']['input'];
};

export type Staking = {
  __typename?: 'Staking';
  amount: Scalars['String']['output'];
  chainId: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  lastStakeTimestamp: Scalars['Float']['output'];
  staker: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type StakingHistory = {
  __typename?: 'StakingHistory';
  amount: Scalars['String']['output'];
  chainId: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  logIndex: Scalars['Float']['output'];
  operation: Scalars['String']['output'];
  staker: Scalars['String']['output'];
  transactionHash: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  _?: Maybe<Scalars['Boolean']['output']>;
  poolDeployed: Pool;
  priceUpdates: PriceUpdateEvent;
  transactionUpdates: TransactionEvent;
};


export type SubscriptionPriceUpdatesArgs = {
  poolAddress: Scalars['String']['input'];
};


export type SubscriptionTransactionUpdatesArgs = {
  poolAddress: Scalars['String']['input'];
};

export type TimelockTask = {
  __typename?: 'TimelockTask';
  chainId: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  data: Scalars['String']['output'];
  eta: Scalars['Float']['output'];
  executed: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  target: Scalars['String']['output'];
  txHash: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type TokenBalance = {
  __typename?: 'TokenBalance';
  balance: Scalars['Int']['output'];
  chainId: Scalars['String']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  lastUpdateBlock: Scalars['Int']['output'];
  owner: Scalars['String']['output'];
  poolAddress: Scalars['String']['output'];
  tokenAddress: Scalars['String']['output'];
  tokenId: Scalars['String']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type Topic = {
  __typename?: 'Topic';
  createdAt: Scalars['Float']['output'];
  creator: Scalars['String']['output'];
  grandParentId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  ownerType: Scalars['String']['output'];
  parentId: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Int']['output'];
  blockNumber: Scalars['Int']['output'];
  chainId: Scalars['String']['output'];
  createdAt: Scalars['Int']['output'];
  from: Scalars['String']['output'];
  id: Scalars['String']['output'];
  poolAddress: Scalars['String']['output'];
  to: Scalars['String']['output'];
  tokenAddress: Scalars['String']['output'];
  tokenId: Scalars['String']['output'];
  transactionHash: Scalars['String']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type TransactionEvent = {
  __typename?: 'TransactionEvent';
  bonusAmount?: Maybe<Scalars['String']['output']>;
  bonusFee?: Maybe<Scalars['String']['output']>;
  holdAmount: Scalars['String']['output'];
  holdFee: Scalars['String']['output'];
  poolAddress: Scalars['String']['output'];
  rwaAmount: Scalars['String']['output'];
  timestamp: Scalars['Float']['output'];
  transactionType: Scalars['String']['output'];
  userAddress: Scalars['String']['output'];
};

export type TreasuryWithdraw = {
  __typename?: 'TreasuryWithdraw';
  amount: Scalars['String']['output'];
  chainId: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  logIndex: Scalars['Float']['output'];
  recipient: Scalars['String']['output'];
  token: Scalars['String']['output'];
  transactionHash: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type UnlockTimeResponse = {
  __typename?: 'UnlockTimeResponse';
  gasUnlockTime: Scalars['Float']['output'];
  holdUnlockTime: Scalars['Float']['output'];
  platformUnlockTime: Scalars['Float']['output'];
};

export type UpdateApiKeyInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateAssistantInput = {
  contextPreferences?: InputMaybe<Array<AssistantContext>>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBlogDataInput = {
  name: Scalars['String']['input'];
};

export type UpdateBlogInput = {
  id: Scalars['ID']['input'];
  updateData: UpdateBlogDataInput;
};

export type UpdateCompanyDataInput = {
  country?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  socials?: InputMaybe<Array<SocialLinkInput>>;
};

export type UpdateCompanyInput = {
  id: Scalars['ID']['input'];
  updateData: UpdateCompanyDataInput;
};

export type UpdateDocumentDataInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDocumentInput = {
  id: Scalars['ID']['input'];
  updateData: UpdateDocumentDataInput;
};

export type UpdateFaqAnswerDataInput = {
  answer?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  question?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFaqAnswerInput = {
  id: Scalars['ID']['input'];
  updateData: UpdateFaqAnswerDataInput;
};

export type UpdateFaqTopicDataInput = {
  name: Scalars['String']['input'];
};

export type UpdateFaqTopicInput = {
  id: Scalars['ID']['input'];
  updateData: UpdateFaqTopicDataInput;
};

export type UpdateFolderDataInput = {
  name: Scalars['String']['input'];
};

export type UpdateFolderInput = {
  id: Scalars['ID']['input'];
  updateData: UpdateFolderDataInput;
};

export type UpdateGalleryDataInput = {
  name: Scalars['String']['input'];
};

export type UpdateGalleryInput = {
  id: Scalars['ID']['input'];
  updateData: UpdateGalleryDataInput;
};

export type UpdateImageDataInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateImageInput = {
  id: Scalars['ID']['input'];
  updateData: UpdateImageDataInput;
};

export type UpdateMessageInput = {
  id: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};

export type UpdatePostDataInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  documents?: InputMaybe<Array<Scalars['String']['input']>>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePostInput = {
  id: Scalars['ID']['input'];
  updateData: UpdatePostDataInput;
};

export type UpdateQuestionAnswerDataInput = {
  text: Scalars['String']['input'];
};

export type UpdateQuestionAnswerInput = {
  id: Scalars['ID']['input'];
  updateData: UpdateQuestionAnswerDataInput;
};

export type UpdateQuestionTextDataInput = {
  text: Scalars['String']['input'];
};

export type UpdateQuestionTextInput = {
  id: Scalars['ID']['input'];
  updateData: UpdateQuestionTextDataInput;
};

export type UpdateTopicDataInput = {
  name: Scalars['String']['input'];
};

export type UpdateTopicInput = {
  id: Scalars['ID']['input'];
  updateData: UpdateTopicDataInput;
};

export type UpdateWebhookEndpointInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  events?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['ID']['input'];
  rateLimitPerMinute?: InputMaybe<Scalars['Int']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['String']['output'];
  wallet: Scalars['String']['output'];
};

export type UserPermission = {
  __typename?: 'UserPermission';
  entity?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  permission: Scalars['String']['output'];
};

export type UserWithPermissions = {
  __typename?: 'UserWithPermissions';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  permissions: Array<UserPermission>;
  userId: Scalars['String']['output'];
};

export type VolumeData = {
  __typename?: 'VolumeData';
  burnVolume: Scalars['String']['output'];
  mintVolume: Scalars['String']['output'];
  timestamp: Scalars['Float']['output'];
};

export type Vote = {
  __typename?: 'Vote';
  blockNumber: Scalars['Float']['output'];
  chainId: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  governanceAddress: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logIndex: Scalars['Float']['output'];
  proposalId: Scalars['String']['output'];
  reason: Scalars['String']['output'];
  support: Scalars['Boolean']['output'];
  transactionHash: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
  voterWallet: Scalars['String']['output'];
  weight: Scalars['String']['output'];
};

export type WebhookEndpoint = {
  __typename?: 'WebhookEndpoint';
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  events: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  rateLimitPerMinute: Scalars['Int']['output'];
  updatedAt: Scalars['Float']['output'];
  url: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type CreateAssistantMutationVariables = Exact<{
  input: CreateAssistantInput;
}>;


export type CreateAssistantMutation = { __typename?: 'Mutation', createAssistant: { __typename?: 'Assistant', id: string, name: string, contextPreferences: Array<AssistantContext> } };

export type GetUserAssistantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserAssistantsQuery = { __typename?: 'Query', getUserAssistants: Array<{ __typename?: 'Assistant', id: string, name: string, contextPreferences: Array<AssistantContext> }> };

export type CreateMessageMutationVariables = Exact<{
  input: CreateMessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: Array<{ __typename?: 'Message', id: string, assistantId: string, text: string }> };

export type GetMessageHistoryQueryVariables = Exact<{
  assistantId: Scalars['ID']['input'];
}>;


export type GetMessageHistoryQuery = { __typename?: 'Query', getMessageHistory: Array<{ __typename?: 'Message', id: string, assistantId: string, text: string }> };

export type AuthenticateMutationVariables = Exact<{
  input: AuthenticateInput;
}>;


export type AuthenticateMutation = { __typename?: 'Mutation', authenticate: { __typename?: 'AuthTokens', userId: string, wallet: string, accessToken: string, refreshToken: string } };

export type RefreshTokenMutationVariables = Exact<{
  input: RefreshTokenInput;
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'AuthTokens', userId: string, wallet: string, accessToken: string, refreshToken: string } };

export type RevokeTokensMutationVariables = Exact<{
  input: RevokeTokensInput;
}>;


export type RevokeTokensMutation = { __typename?: 'Mutation', revokeTokens: { __typename?: 'RevokeTokensResult', revokedCount: number } };

export type GetUserTokensQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserTokensQuery = { __typename?: 'Query', getUserTokens: Array<{ __typename?: 'RefreshToken', tokenId: string, userId: string, tokenHash: string, expiresAt: number, createdAt: number, updatedAt: number }> };

export type GetBlogsQueryVariables = Exact<{
  input?: InputMaybe<GetBlogsFilterInput>;
}>;


export type GetBlogsQuery = { __typename?: 'Query', getBlogs: Array<{ __typename?: 'Blog', id: string, name: string, parentId: string, ownerId: string, ownerType: string, createdAt: number }> };

export type CreateBlogMutationVariables = Exact<{
  input: CreateBlogInput;
}>;


export type CreateBlogMutation = { __typename?: 'Mutation', createBlog: { __typename?: 'Blog', id: string, name: string, parentId: string } };

export type GetPostsQueryVariables = Exact<{
  input?: InputMaybe<GetPostsFilterInput>;
}>;


export type GetPostsQuery = { __typename?: 'Query', getPosts: Array<{ __typename?: 'Post', id: string, blogId: string, title: string, content: string, images: Array<string>, documents: Array<string>, creator: string, createdAt: number, updatedAt: number }> };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, blogId: string, title: string, content: string, images: Array<string>, documents: Array<string>, createdAt: number } };

export type UpdatePostMutationVariables = Exact<{
  input: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', id: string, title: string, content: string, images: Array<string>, documents: Array<string>, updatedAt: number } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: string };

export type GetPostQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPostQuery = { __typename?: 'Query', getPost: { __typename?: 'Post', id: string, blogId: string, title: string, content: string, images: Array<string>, createdAt: number, updatedAt: number } };

export type GetBusinessWithRiskQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetBusinessWithRiskQuery = { __typename?: 'Query', getBusiness: { __typename?: 'Business', id: string, name: string, description?: string | null, tags?: Array<string> | null, riskScore?: number | null, country?: string | null, businessType?: string | null, ownerId: string, ownerType: string, image?: string | null, imageUrl?: string | null, fileId?: string | null, socials: Array<{ __typename?: 'SocialLink', type: string, url: string }> } };

export type GetBusinessQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetBusinessQuery = { __typename?: 'Query', getBusiness: { __typename?: 'Business', id: string, name: string, description?: string | null, tags?: Array<string> | null, country?: string | null, businessType?: string | null, ownerId: string, ownerType: string, chainId: string, createdAt: number, updatedAt: number, image?: string | null, imageUrl?: string | null, fileId?: string | null, socials: Array<{ __typename?: 'SocialLink', type: string, url: string }> } };

export type GetBusinessDeployInfoQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetBusinessDeployInfoQuery = { __typename?: 'Query', getBusiness: { __typename?: 'Business', id: string, ownerId: string, ownerType: string, ownerWallet?: string | null, tokenAddress?: string | null, approvalSignaturesTaskId?: string | null, approvalSignaturesTaskExpired?: number | null, image?: string | null, imageUrl?: string | null, fileId?: string | null } };

export type RequestBusinessApprovalSignaturesMutationVariables = Exact<{
  input: RequestBusinessApprovalSignaturesInput;
}>;


export type RequestBusinessApprovalSignaturesMutation = { __typename?: 'Mutation', requestBusinessApprovalSignatures: { __typename?: 'ApprovalSignaturesResponse', taskId: string } };

export type RejectBusinessApprovalSignaturesMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RejectBusinessApprovalSignaturesMutation = { __typename?: 'Mutation', rejectBusinessApprovalSignatures: boolean };

export type CreateBusinessMutationVariables = Exact<{
  input: CreateBusinessInput;
}>;


export type CreateBusinessMutation = { __typename?: 'Mutation', createBusiness: { __typename?: 'Business', id: string, name: string, description?: string | null, country?: string | null, businessType?: string | null, ownerId: string, ownerType: string, chainId: string, createdAt: number, updatedAt: number, image?: string | null, imageUrl?: string | null, fileId?: string | null, socials: Array<{ __typename?: 'SocialLink', type: string, url: string }> } };

export type EditBusinessMutationVariables = Exact<{
  input: EditBusinessInput;
}>;


export type EditBusinessMutation = { __typename?: 'Mutation', editBusiness: { __typename?: 'Business', id: string, name: string, description?: string | null, country?: string | null, businessType?: string | null, image?: string | null, imageUrl?: string | null, fileId?: string | null, socials: Array<{ __typename?: 'SocialLink', type: string, url: string }> } };

export type GetBusinessesQueryVariables = Exact<{
  input: FilterInput;
}>;


export type GetBusinessesQuery = { __typename?: 'Query', getBusinesses: Array<{ __typename?: 'Business', id: string, name: string, description?: string | null, tags?: Array<string> | null, riskScore?: number | null, country?: string | null, businessType?: string | null, ownerId: string, ownerType: string, chainId: string, createdAt: number, updatedAt: number, image?: string | null, imageUrl?: string | null, fileId?: string | null, socials: Array<{ __typename?: 'SocialLink', type: string, url: string }> }> };

export type CreateCompanyMutationVariables = Exact<{
  input: CreateCompanyInput;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutation', createCompany: { __typename?: 'Company', id: string, name: string, description: string, country?: string | null, ownerId: string, createdAt: number, updatedAt: number, socials: Array<{ __typename?: 'SocialLink', type: string, url: string }> } };

export type GetCompaniesQueryVariables = Exact<{
  input?: InputMaybe<GetCompaniesInput>;
}>;


export type GetCompaniesQuery = { __typename?: 'Query', getCompanies: Array<{ __typename?: 'Company', id: string, name: string, description: string, country?: string | null, ownerId: string, createdAt: number, updatedAt: number, socials: Array<{ __typename?: 'SocialLink', type: string, url: string }> }> };

export type GetCompanyQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCompanyQuery = { __typename?: 'Query', getCompany: { __typename?: 'CompanyWithDetails', id: string, name: string, description: string, country?: string | null, ownerId: string, createdAt: number, updatedAt: number, socials: Array<{ __typename?: 'SocialLink', type: string, url: string }>, users: Array<{ __typename?: 'UserWithPermissions', id: string, userId: string, name: string, permissions: Array<{ __typename?: 'UserPermission', id: string, permission: string, entity?: string | null }> }> } };

export type UpdateCompanyMutationVariables = Exact<{
  input: UpdateCompanyInput;
}>;


export type UpdateCompanyMutation = { __typename?: 'Mutation', updateCompany: { __typename?: 'Company', id: string, name: string, description: string, country?: string | null, ownerId: string, createdAt: number, updatedAt: number, socials: Array<{ __typename?: 'SocialLink', type: string, url: string }> } };

export type DeleteCompanyMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCompanyMutation = { __typename?: 'Mutation', deleteCompany: string };

export type AddMemberMutationVariables = Exact<{
  input: AddMemberInput;
}>;


export type AddMemberMutation = { __typename?: 'Mutation', addMember: { __typename?: 'Member', id: string, userId: string, name: string, createdAt: number, updatedAt: number } };

export type RemoveMemberMutationVariables = Exact<{
  input: RemoveMemberInput;
}>;


export type RemoveMemberMutation = { __typename?: 'Mutation', removeMember: string };

export type GetProposalsQueryVariables = Exact<{
  input?: InputMaybe<GetProposalsFilterInput>;
}>;


export type GetProposalsQuery = { __typename?: 'Query', getProposals: Array<{ __typename?: 'Proposal', id: string, proposalId: string, proposer: string, target: string, data: string, description: string, startTime: number, endTime: number, state: string, chainId: string, createdAt: number }> };

export type GetVotesQueryVariables = Exact<{
  input?: InputMaybe<GetVotesFilterInput>;
}>;


export type GetVotesQuery = { __typename?: 'Query', getVotes: Array<{ __typename?: 'Vote', id: string, proposalId: string, voterWallet: string, support: boolean, weight: string, reason: string }> };

export type GetStakingQueryVariables = Exact<{
  input?: InputMaybe<GetStakingFilterInput>;
}>;


export type GetStakingQuery = { __typename?: 'Query', getStaking: Array<{ __typename?: 'Staking', id: string, staker: string, amount: string, lastStakeTimestamp: number }> };

export type GetPoolsForDebtRepaymentsQueryVariables = Exact<{
  input: FilterInput;
}>;


export type GetPoolsForDebtRepaymentsQuery = { __typename?: 'Query', getPools: Array<{ __typename?: 'Pool', id: string, name: string, poolAddress?: string | null, rwaAddress: string, businessId: string, ownerId: string, ownerType: string, virtualHoldReserve?: string | null, realHoldReserve?: string | null, virtualRwaReserve?: string | null, exitFeePercent?: string | null, lastCompletedIncomingTranche: number, incomingTranches: Array<{ __typename?: 'IncomingTranche', amount: string, expiredAt: number, returnedAmount: string }> }> };

export type GetBusinessesForDebtRepaymentsQueryVariables = Exact<{
  input: FilterInput;
}>;


export type GetBusinessesForDebtRepaymentsQuery = { __typename?: 'Query', getBusinesses: Array<{ __typename?: 'Business', id: string, name: string, ownerId: string, ownerType: string }> };

export type GetCompaniesForDebtRepaymentsQueryVariables = Exact<{
  input?: InputMaybe<GetCompaniesInput>;
}>;


export type GetCompaniesForDebtRepaymentsQuery = { __typename?: 'Query', getCompanies: Array<{ __typename?: 'Company', id: string, name: string }> };

export type GetDebtRepaymentTransactionsQueryVariables = Exact<{
  input: GetTransactionsInput;
}>;


export type GetDebtRepaymentTransactionsQuery = { __typename?: 'Query', getTransactions: Array<{ __typename?: 'Transaction', id: string, from: string, to: string, poolAddress: string, transactionHash: string, amount: number, createdAt: number }> };

export type GetPoolRecipientsQueryVariables = Exact<{
  input: GetBalancesInput;
}>;


export type GetPoolRecipientsQuery = { __typename?: 'Query', getBalances: Array<{ __typename?: 'TokenBalance', id: string, owner: string, balance: number }> };

export type GetFoldersForDocsQueryVariables = Exact<{
  input?: InputMaybe<GetFoldersFilterInput>;
}>;


export type GetFoldersForDocsQuery = { __typename?: 'Query', getFolders: Array<{ __typename?: 'Folder', id: string, name: string, parentId: string, ownerId: string, ownerType: string }> };

export type CreateFolderForDocsMutationVariables = Exact<{
  input: CreateFolderInput;
}>;


export type CreateFolderForDocsMutation = { __typename?: 'Mutation', createFolder: { __typename?: 'Folder', id: string, name: string, parentId: string, ownerId: string, ownerType: string } };

export type GetDocumentsQueryVariables = Exact<{
  input?: InputMaybe<GetDocumentsFilterInput>;
}>;


export type GetDocumentsQuery = { __typename?: 'Query', getDocuments: Array<{ __typename?: 'Document', id: string, folderId: string, name: string, url: string, fileId: string, path: string, mimeType: string, size: number, ownerId: string, ownerType: string, creator: string, parentId: string, grandParentId: string, createdAt: number, updatedAt: number }> };

export type DeleteDocumentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteDocumentMutation = { __typename?: 'Mutation', deleteDocument: string };

export type UpdateDocumentMetaMutationVariables = Exact<{
  input: UpdateDocumentInput;
}>;


export type UpdateDocumentMetaMutation = { __typename?: 'Mutation', updateDocument: { __typename?: 'Document', id: string, folderId: string, name: string, url: string, fileId: string, path: string, mimeType: string, size: number, ownerId: string, ownerType: string, creator: string, parentId: string, grandParentId: string, createdAt: number, updatedAt: number } };

export type GetFaqTopicsQueryVariables = Exact<{
  input?: InputMaybe<GetFaqTopicsFilterInput>;
}>;


export type GetFaqTopicsQuery = { __typename?: 'Query', getFaqTopics: Array<{ __typename?: 'FaqTopic', id: string, name: string, parentId: string }> };

export type CreateFaqTopicMutationVariables = Exact<{
  input: CreateFaqTopicInput;
}>;


export type CreateFaqTopicMutation = { __typename?: 'Mutation', createFaqTopic: { __typename?: 'FaqTopic', id: string, name: string, parentId: string } };

export type GetFaqAnswersQueryVariables = Exact<{
  input?: InputMaybe<GetFaqAnswersFilterInput>;
}>;


export type GetFaqAnswersQuery = { __typename?: 'Query', getFaqAnswers: Array<{ __typename?: 'FaqAnswer', id: string, topicId: string, question: string, answer: string, order: number, createdAt: number }> };

export type GetFaqAnswerQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetFaqAnswerQuery = { __typename?: 'Query', getFaqAnswer: { __typename?: 'FaqAnswer', id: string, topicId: string, question: string, answer: string, order: number, createdAt: number } };

export type CreateFaqAnswerMutationVariables = Exact<{
  input: CreateFaqAnswerInput;
}>;


export type CreateFaqAnswerMutation = { __typename?: 'Mutation', createFaqAnswer: { __typename?: 'FaqAnswer', id: string, topicId: string, question: string, answer: string, createdAt: number } };

export type UpdateFaqAnswerMutationVariables = Exact<{
  input: UpdateFaqAnswerInput;
}>;


export type UpdateFaqAnswerMutation = { __typename?: 'Mutation', updateFaqAnswer: { __typename?: 'FaqAnswer', id: string, question: string, answer: string, updatedAt: number } };

export type DeleteFaqAnswerMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteFaqAnswerMutation = { __typename?: 'Mutation', deleteFaqAnswer: string };

export type GetUnlockTimeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnlockTimeQuery = { __typename?: 'Query', getUnlockTime: { __typename?: 'UnlockTimeResponse', gasUnlockTime: number, holdUnlockTime: number, platformUnlockTime: number } };

export type RequestGasMutationVariables = Exact<{
  input: RequestTokenInput;
}>;


export type RequestGasMutation = { __typename?: 'Mutation', requestGas: { __typename?: 'FaucetRequest', id: string, tokenType: FaucetTokenType, amount: number, transactionHash: string } };

export type RequestHoldMutationVariables = Exact<{
  input: RequestTokenInput;
}>;


export type RequestHoldMutation = { __typename?: 'Mutation', requestHold: { __typename?: 'FaucetRequest', id: string, tokenType: FaucetTokenType, amount: number, transactionHash: string } };

export type GetGalleriesQueryVariables = Exact<{
  input?: InputMaybe<GetGalleriesFilterInput>;
}>;


export type GetGalleriesQuery = { __typename?: 'Query', getGalleries: Array<{ __typename?: 'Gallery', id: string, name: string, parentId: string }> };

export type CreateGalleryMutationVariables = Exact<{
  input: CreateGalleryInput;
}>;


export type CreateGalleryMutation = { __typename?: 'Mutation', createGallery: { __typename?: 'Gallery', id: string, name: string, parentId: string } };

export type GetPoolByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPoolByIdQuery = { __typename?: 'Query', getPool: { __typename?: 'Pool', id: string, name: string, businessId: string, description?: string | null, poolAddress?: string | null, rwaAddress: string, expectedHoldAmount?: string | null, expectedRwaAmount?: string | null, rewardPercent?: string | null, entryFeePercent?: string | null, exitFeePercent?: string | null, entryPeriodStart?: number | null, entryPeriodExpired?: number | null, completionPeriodExpired?: number | null, fixedSell: boolean, paused: boolean, tags?: Array<string> | null, image?: string | null, imageUrl?: string | null, fileId?: string | null, chainId: string, createdAt: number, realHoldReserve?: string | null, virtualHoldReserve?: string | null, virtualRwaReserve?: string | null, ownerId: string, ownerType: string, incomingTranches: Array<{ __typename?: 'IncomingTranche', amount: string, expiredAt: number, returnedAmount: string }> } };

export type GetPoolDetailQueryVariables = Exact<{
  input: FilterInput;
}>;


export type GetPoolDetailQuery = { __typename?: 'Query', getPools: Array<{ __typename?: 'Pool', id: string, name: string, businessId: string, description?: string | null, poolAddress?: string | null, rwaAddress: string, expectedHoldAmount?: string | null, expectedRwaAmount?: string | null, rewardPercent?: string | null, entryFeePercent?: string | null, exitFeePercent?: string | null, entryPeriodStart?: number | null, entryPeriodExpired?: number | null, completionPeriodExpired?: number | null, fixedSell: boolean, paused: boolean, tags?: Array<string> | null, image?: string | null, imageUrl?: string | null, fileId?: string | null, chainId: string, createdAt: number, realHoldReserve?: string | null, virtualHoldReserve?: string | null, virtualRwaReserve?: string | null, incomingTranches: Array<{ __typename?: 'IncomingTranche', amount: string, expiredAt: number, returnedAmount: string }> }> };

export type GetPoolsQueryVariables = Exact<{
  input: FilterInput;
}>;


export type GetPoolsQuery = { __typename?: 'Query', getPools: Array<{ __typename?: 'Pool', id: string, name: string, businessId: string, description?: string | null, poolAddress?: string | null, expectedHoldAmount?: string | null, expectedRwaAmount?: string | null, rewardPercent?: string | null, entryPeriodStart?: number | null, entryPeriodExpired?: number | null, completionPeriodExpired?: number | null, fixedSell: boolean, paused: boolean, chainId: string, createdAt: number, image?: string | null, imageUrl?: string | null, fileId?: string | null, realHoldReserve?: string | null, virtualHoldReserve?: string | null, virtualRwaReserve?: string | null, isFullyReturned: boolean, isTargetReached: boolean, tags?: Array<string> | null, riskScore?: number | null }> };

export type CreatePoolMutationVariables = Exact<{
  input: CreatePoolInput;
}>;


export type CreatePoolMutation = { __typename?: 'Mutation', createPool: { __typename?: 'Pool', id: string, rwaAddress: string, chainId: string, ownerId: string, ownerType: string, entryFeePercent?: string | null, exitFeePercent?: string | null, expectedHoldAmount?: string | null, expectedRwaAmount?: string | null, rewardPercent?: string | null, priceImpactPercent?: string | null, entryPeriodStart?: number | null, entryPeriodExpired?: number | null, completionPeriodExpired?: number | null, fixedSell: boolean, allowEntryBurn: boolean, awaitCompletionExpired: boolean, floatingOutTranchesTimestamps: boolean, outgoingTranches: Array<{ __typename?: 'OutgoingTranche', amount: string, timestamp: number, executedAmount: string }>, incomingTranches: Array<{ __typename?: 'IncomingTranche', amount: string, expiredAt: number, returnedAmount: string }> } };

export type RequestPoolApprovalSignaturesMutationVariables = Exact<{
  input: RequestPoolApprovalSignaturesInput;
}>;


export type RequestPoolApprovalSignaturesMutation = { __typename?: 'Mutation', requestPoolApprovalSignatures: { __typename?: 'ApprovalSignaturesResponse', taskId: string } };

export type GetRawPriceDataQueryVariables = Exact<{
  input: GetRawPriceDataInput;
}>;


export type GetRawPriceDataQuery = { __typename?: 'Query', getRawPriceData: Array<{ __typename?: 'PriceData', timestamp: number, price: string }> };

export type EditPoolMutationVariables = Exact<{
  input: EditPoolInput;
}>;


export type EditPoolMutation = { __typename?: 'Mutation', editPool: { __typename?: 'Pool', id: string, name: string, description?: string | null, tags?: Array<string> | null, image?: string | null, imageUrl?: string | null, fileId?: string | null } };

export type GetLatestPriceQueryVariables = Exact<{
  input: GetRawPriceDataInput;
}>;


export type GetLatestPriceQuery = { __typename?: 'Query', getRawPriceData: Array<{ __typename?: 'PriceData', price: string }> };

export type GetOhlcPriceDataQueryVariables = Exact<{
  input: GetOhlcPriceDataInput;
}>;


export type GetOhlcPriceDataQuery = { __typename?: 'Query', getOhlcPriceData: Array<{ __typename?: 'OhlcData', timestamp: number, open: string, high: string, low: string, close: string }> };

export type GetVolumeDataQueryVariables = Exact<{
  input: GetVolumeDataInput;
}>;


export type GetVolumeDataQuery = { __typename?: 'Query', getVolumeData: Array<{ __typename?: 'VolumeData', timestamp: number, mintVolume: string, burnVolume: string }> };

export type GetSignatureTaskQueryVariables = Exact<{
  input: GetSignatureTaskInput;
}>;


export type GetSignatureTaskQuery = { __typename?: 'Query', getSignatureTask: { __typename?: 'SignatureTask', id: string, completed: boolean, expired: number, signatures?: Array<{ __typename?: 'Signature', signer: string, signature: string }> | null } };

export type GetPortfolioBalancesQueryVariables = Exact<{
  input: GetBalancesInput;
}>;


export type GetPortfolioBalancesQuery = { __typename?: 'Query', getBalances: Array<{ __typename?: 'TokenBalance', id: string, owner: string, poolAddress: string, tokenAddress: string, tokenId: string, chainId: string, balance: number }> };

export type GetPoolsForPortfolioQueryVariables = Exact<{
  input: FilterInput;
}>;


export type GetPoolsForPortfolioQuery = { __typename?: 'Query', getPools: Array<{ __typename?: 'Pool', id: string, name: string, poolAddress?: string | null, rwaAddress: string, businessId: string, tags?: Array<string> | null, riskScore?: number | null, rewardPercent?: string | null, fixedSell: boolean, expectedHoldAmount?: string | null, expectedRwaAmount?: string | null, awaitingRwaAmount?: string | null, realHoldReserve?: string | null, virtualHoldReserve?: string | null, virtualRwaReserve?: string | null, exitFeePercent?: string | null, isTargetReached: boolean, isFullyReturned: boolean, entryPeriodExpired?: number | null, completionPeriodExpired?: number | null, lastCompletedIncomingTranche: number, image?: string | null, incomingTranches: Array<{ __typename?: 'IncomingTranche', amount: string, expiredAt: number, returnedAmount: string }> }> };

export type GetBusinessesForPortfolioQueryVariables = Exact<{
  input: FilterInput;
}>;


export type GetBusinessesForPortfolioQuery = { __typename?: 'Query', getBusinesses: Array<{ __typename?: 'Business', id: string, name: string, ownerId: string, ownerType: string, tags?: Array<string> | null, businessType?: string | null, country?: string | null, description?: string | null }> };

export type GetCompaniesForPortfolioQueryVariables = Exact<{
  input?: InputMaybe<GetCompaniesInput>;
}>;


export type GetCompaniesForPortfolioQuery = { __typename?: 'Query', getCompanies: Array<{ __typename?: 'Company', id: string, name: string }> };

export type GetPoolTransactionsForPortfolioQueryVariables = Exact<{
  input: GetPoolTransactionsInput;
}>;


export type GetPoolTransactionsForPortfolioQuery = { __typename?: 'Query', getPoolTransactions: Array<{ __typename?: 'PoolTransaction', id: string, userAddress: string, poolAddress: string, transactionType: string, holdAmount: string, rwaAmount: string, bonusAmount: string, createdAt: number }> };

export type GetReferralsQueryVariables = Exact<{
  input?: InputMaybe<GetReferralsFilterInput>;
}>;


export type GetReferralsQuery = { __typename?: 'Query', getReferrals: Array<{ __typename?: 'Referral', id: string, userId: string, userWallet: string, referrerId?: string | null, createdAt: number }> };

export type GetReferrerClaimHistoryQueryVariables = Exact<{
  input?: InputMaybe<GetReferrerClaimHistoryFilterInput>;
}>;


export type GetReferrerClaimHistoryQuery = { __typename?: 'Query', getReferrerClaimHistory: Array<{ __typename?: 'ReferrerClaimHistory', id: string, amount: string, referralWallet: string, tokenAddress: string, transactionHash: string, createdAt: number }> };

export type GetReferrerWithdrawsQueryVariables = Exact<{
  input?: InputMaybe<GetReferrerWithdrawsFilterInput>;
}>;


export type GetReferrerWithdrawsQuery = { __typename?: 'Query', getReferrerWithdraws: Array<{ __typename?: 'ReferrerWithdraw', id: string, chainId: string, tokenAddress: string, totalWithdrawnAmount: string, taskCooldown?: number | null, taskExpiredAt?: number | null, taskId?: string | null }> };

export type GetFeesQueryVariables = Exact<{
  input?: InputMaybe<GetFeesFilterInput>;
}>;


export type GetFeesQuery = { __typename?: 'Query', getFees: Array<{ __typename?: 'Fees', id: string, userId: string, userWallet: string, tokenAddress: string, chainId: string, referralRewardAmount: string, referralRewardCount: number }> };

export type CreateReferrerWithdrawTaskMutationVariables = Exact<{
  input: CreateReferrerWithdrawTaskInput;
}>;


export type CreateReferrerWithdrawTaskMutation = { __typename?: 'Mutation', createReferrerWithdrawTask: { __typename?: 'ReferrerWithdraw', id: string, taskId?: string | null, taskCooldown?: number | null, taskExpiredAt?: number | null } };

export type RegisterReferralMutationVariables = Exact<{
  input: RegisterReferralInput;
}>;


export type RegisterReferralMutation = { __typename?: 'Mutation', registerReferral: { __typename?: 'Referral', id: string, userId: string, userWallet: string, referrerId?: string | null, referrerWallet?: string | null } };

export type GetBalancesForWithdrawalsQueryVariables = Exact<{
  input: GetBalancesInput;
}>;


export type GetBalancesForWithdrawalsQuery = { __typename?: 'Query', getBalances: Array<{ __typename?: 'TokenBalance', id: string, owner: string, poolAddress: string, tokenAddress: string, tokenId: string, chainId: string, balance: number }> };

export type GetPoolsForWithdrawalsQueryVariables = Exact<{
  input: FilterInput;
}>;


export type GetPoolsForWithdrawalsQuery = { __typename?: 'Query', getPools: Array<{ __typename?: 'Pool', id: string, name: string, poolAddress?: string | null, rwaAddress: string, businessId: string, entryFeePercent?: string | null, exitFeePercent?: string | null, expectedHoldAmount?: string | null, expectedRwaAmount?: string | null, awaitingRwaAmount?: string | null, realHoldReserve?: string | null, virtualHoldReserve?: string | null, virtualRwaReserve?: string | null, isTargetReached: boolean, isFullyReturned: boolean, entryPeriodExpired?: number | null, completionPeriodExpired?: number | null }> };

export type GetBusinessesForWithdrawalsQueryVariables = Exact<{
  input: FilterInput;
}>;


export type GetBusinessesForWithdrawalsQuery = { __typename?: 'Query', getBusinesses: Array<{ __typename?: 'Business', id: string, name: string, ownerId: string, ownerType: string }> };

export type GetCompaniesForWithdrawalsQueryVariables = Exact<{
  input?: InputMaybe<GetCompaniesInput>;
}>;


export type GetCompaniesForWithdrawalsQuery = { __typename?: 'Query', getCompanies: Array<{ __typename?: 'Company', id: string, name: string }> };

export type GetWithdrawalTransactionsQueryVariables = Exact<{
  input: GetTransactionsInput;
}>;


export type GetWithdrawalTransactionsQuery = { __typename?: 'Query', getTransactions: Array<{ __typename?: 'Transaction', id: string, from: string, to: string, poolAddress: string, transactionHash: string, amount: number, createdAt: number }> };


export const CreateAssistantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAssistant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAssistantInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAssistant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"contextPreferences"}}]}}]}}]} as unknown as DocumentNode<CreateAssistantMutation, CreateAssistantMutationVariables>;
export const GetUserAssistantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserAssistants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserAssistants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"contextPreferences"}}]}}]}}]} as unknown as DocumentNode<GetUserAssistantsQuery, GetUserAssistantsQueryVariables>;
export const CreateMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assistantId"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]} as unknown as DocumentNode<CreateMessageMutation, CreateMessageMutationVariables>;
export const GetMessageHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMessageHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assistantId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMessageHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assistantId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assistantId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assistantId"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]} as unknown as DocumentNode<GetMessageHistoryQuery, GetMessageHistoryQueryVariables>;
export const AuthenticateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Authenticate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthenticateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"wallet"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<AuthenticateMutation, AuthenticateMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RefreshTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"wallet"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const RevokeTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RevokeTokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RevokeTokensInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revokeTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revokedCount"}}]}}]}}]} as unknown as DocumentNode<RevokeTokensMutation, RevokeTokensMutationVariables>;
export const GetUserTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"tokenHash"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetUserTokensQuery, GetUserTokensQueryVariables>;
export const GetBlogsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBlogs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetBlogsFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBlogs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetBlogsQuery, GetBlogsQueryVariables>;
export const CreateBlogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBlog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBlogInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBlog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]}}]} as unknown as DocumentNode<CreateBlogMutation, CreateBlogMutationVariables>;
export const GetPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetPostsFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"blogId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"documents"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetPostsQuery, GetPostsQueryVariables>;
export const CreatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"blogId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"documents"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreatePostMutation, CreatePostMutationVariables>;
export const UpdatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"documents"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdatePostMutation, UpdatePostMutationVariables>;
export const DeletePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeletePostMutation, DeletePostMutationVariables>;
export const GetPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"blogId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetPostQuery, GetPostQueryVariables>;
export const GetBusinessWithRiskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBusinessWithRisk"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBusiness"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"riskScore"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"businessType"}},{"kind":"Field","name":{"kind":"Name","value":"socials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerType"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}}]}}]}}]} as unknown as DocumentNode<GetBusinessWithRiskQuery, GetBusinessWithRiskQueryVariables>;
export const GetBusinessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBusiness"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBusiness"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"businessType"}},{"kind":"Field","name":{"kind":"Name","value":"socials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerType"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}}]}}]}}]} as unknown as DocumentNode<GetBusinessQuery, GetBusinessQueryVariables>;
export const GetBusinessDeployInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBusinessDeployInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBusiness"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerType"}},{"kind":"Field","name":{"kind":"Name","value":"ownerWallet"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}},{"kind":"Field","name":{"kind":"Name","value":"approvalSignaturesTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"approvalSignaturesTaskExpired"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}}]}}]}}]} as unknown as DocumentNode<GetBusinessDeployInfoQuery, GetBusinessDeployInfoQueryVariables>;
export const RequestBusinessApprovalSignaturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestBusinessApprovalSignatures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestBusinessApprovalSignaturesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestBusinessApprovalSignatures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskId"}}]}}]}}]} as unknown as DocumentNode<RequestBusinessApprovalSignaturesMutation, RequestBusinessApprovalSignaturesMutationVariables>;
export const RejectBusinessApprovalSignaturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RejectBusinessApprovalSignatures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rejectBusinessApprovalSignatures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RejectBusinessApprovalSignaturesMutation, RejectBusinessApprovalSignaturesMutationVariables>;
export const CreateBusinessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBusiness"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBusinessInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBusiness"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"businessType"}},{"kind":"Field","name":{"kind":"Name","value":"socials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerType"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}}]}}]}}]} as unknown as DocumentNode<CreateBusinessMutation, CreateBusinessMutationVariables>;
export const EditBusinessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditBusiness"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditBusinessInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editBusiness"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"businessType"}},{"kind":"Field","name":{"kind":"Name","value":"socials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}}]}}]}}]} as unknown as DocumentNode<EditBusinessMutation, EditBusinessMutationVariables>;
export const GetBusinessesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBusinesses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBusinesses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"riskScore"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"businessType"}},{"kind":"Field","name":{"kind":"Name","value":"socials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerType"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}}]}}]}}]} as unknown as DocumentNode<GetBusinessesQuery, GetBusinessesQueryVariables>;
export const CreateCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCompanyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"socials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateCompanyMutation, CreateCompanyMutationVariables>;
export const GetCompaniesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompanies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetCompaniesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCompanies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"socials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetCompaniesQuery, GetCompaniesQueryVariables>;
export const GetCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"socials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"entity"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetCompanyQuery, GetCompanyQueryVariables>;
export const UpdateCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCompanyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"socials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateCompanyMutation, UpdateCompanyMutationVariables>;
export const DeleteCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCompanyMutation, DeleteCompanyMutationVariables>;
export const AddMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddMemberInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AddMemberMutation, AddMemberMutationVariables>;
export const RemoveMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveMemberInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<RemoveMemberMutation, RemoveMemberMutationVariables>;
export const GetProposalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProposals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetProposalsFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProposals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"proposalId"}},{"kind":"Field","name":{"kind":"Name","value":"proposer"}},{"kind":"Field","name":{"kind":"Name","value":"target"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetProposalsQuery, GetProposalsQueryVariables>;
export const GetVotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetVotesFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"proposalId"}},{"kind":"Field","name":{"kind":"Name","value":"voterWallet"}},{"kind":"Field","name":{"kind":"Name","value":"support"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}}]}}]} as unknown as DocumentNode<GetVotesQuery, GetVotesQueryVariables>;
export const GetStakingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStaking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetStakingFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStaking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"staker"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"lastStakeTimestamp"}}]}}]}}]} as unknown as DocumentNode<GetStakingQuery, GetStakingQueryVariables>;
export const GetPoolsForDebtRepaymentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPoolsForDebtRepayments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPools"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"poolAddress"}},{"kind":"Field","name":{"kind":"Name","value":"rwaAddress"}},{"kind":"Field","name":{"kind":"Name","value":"businessId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerType"}},{"kind":"Field","name":{"kind":"Name","value":"virtualHoldReserve"}},{"kind":"Field","name":{"kind":"Name","value":"realHoldReserve"}},{"kind":"Field","name":{"kind":"Name","value":"virtualRwaReserve"}},{"kind":"Field","name":{"kind":"Name","value":"exitFeePercent"}},{"kind":"Field","name":{"kind":"Name","value":"incomingTranches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"expiredAt"}},{"kind":"Field","name":{"kind":"Name","value":"returnedAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastCompletedIncomingTranche"}}]}}]}}]} as unknown as DocumentNode<GetPoolsForDebtRepaymentsQuery, GetPoolsForDebtRepaymentsQueryVariables>;
export const GetBusinessesForDebtRepaymentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBusinessesForDebtRepayments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBusinesses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerType"}}]}}]}}]} as unknown as DocumentNode<GetBusinessesForDebtRepaymentsQuery, GetBusinessesForDebtRepaymentsQueryVariables>;
export const GetCompaniesForDebtRepaymentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompaniesForDebtRepayments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetCompaniesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCompanies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetCompaniesForDebtRepaymentsQuery, GetCompaniesForDebtRepaymentsQueryVariables>;
export const GetDebtRepaymentTransactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDebtRepaymentTransactions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetTransactionsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTransactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"poolAddress"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetDebtRepaymentTransactionsQuery, GetDebtRepaymentTransactionsQueryVariables>;
export const GetPoolRecipientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPoolRecipients"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetBalancesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBalances"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]}}]} as unknown as DocumentNode<GetPoolRecipientsQuery, GetPoolRecipientsQueryVariables>;
export const GetFoldersForDocsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFoldersForDocs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetFoldersFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFolders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerType"}}]}}]}}]} as unknown as DocumentNode<GetFoldersForDocsQuery, GetFoldersForDocsQueryVariables>;
export const CreateFolderForDocsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFolderForDocs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFolderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerType"}}]}}]}}]} as unknown as DocumentNode<CreateFolderForDocsMutation, CreateFolderForDocsMutationVariables>;
export const GetDocumentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDocuments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetDocumentsFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDocuments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"folderId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerType"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"grandParentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetDocumentsQuery, GetDocumentsQueryVariables>;
export const DeleteDocumentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteDocument"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteDocument"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteDocumentMutation, DeleteDocumentMutationVariables>;
export const UpdateDocumentMetaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDocumentMeta"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDocumentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDocument"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"folderId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerType"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"grandParentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateDocumentMetaMutation, UpdateDocumentMetaMutationVariables>;
export const GetFaqTopicsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFaqTopics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetFaqTopicsFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFaqTopics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]}}]} as unknown as DocumentNode<GetFaqTopicsQuery, GetFaqTopicsQueryVariables>;
export const CreateFaqTopicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFaqTopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFaqTopicInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFaqTopic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]}}]} as unknown as DocumentNode<CreateFaqTopicMutation, CreateFaqTopicMutationVariables>;
export const GetFaqAnswersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFaqAnswers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetFaqAnswersFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFaqAnswers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topicId"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answer"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetFaqAnswersQuery, GetFaqAnswersQueryVariables>;
export const GetFaqAnswerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFaqAnswer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFaqAnswer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topicId"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answer"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetFaqAnswerQuery, GetFaqAnswerQueryVariables>;
export const CreateFaqAnswerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFaqAnswer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFaqAnswerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFaqAnswer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topicId"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answer"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateFaqAnswerMutation, CreateFaqAnswerMutationVariables>;
export const UpdateFaqAnswerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFaqAnswer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateFaqAnswerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFaqAnswer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answer"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateFaqAnswerMutation, UpdateFaqAnswerMutationVariables>;
export const DeleteFaqAnswerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFaqAnswer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFaqAnswer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteFaqAnswerMutation, DeleteFaqAnswerMutationVariables>;
export const GetUnlockTimeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUnlockTime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUnlockTime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gasUnlockTime"}},{"kind":"Field","name":{"kind":"Name","value":"holdUnlockTime"}},{"kind":"Field","name":{"kind":"Name","value":"platformUnlockTime"}}]}}]}}]} as unknown as DocumentNode<GetUnlockTimeQuery, GetUnlockTimeQueryVariables>;
export const RequestGasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestGas"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestGas"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokenType"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}}]}}]}}]} as unknown as DocumentNode<RequestGasMutation, RequestGasMutationVariables>;
export const RequestHoldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestHold"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestHold"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokenType"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}}]}}]}}]} as unknown as DocumentNode<RequestHoldMutation, RequestHoldMutationVariables>;
export const GetGalleriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGalleries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetGalleriesFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGalleries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]}}]} as unknown as DocumentNode<GetGalleriesQuery, GetGalleriesQueryVariables>;
export const CreateGalleryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGallery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGalleryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGallery"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]}}]} as unknown as DocumentNode<CreateGalleryMutation, CreateGalleryMutationVariables>;
export const GetPoolByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPoolById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPool"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"businessId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"poolAddress"}},{"kind":"Field","name":{"kind":"Name","value":"rwaAddress"}},{"kind":"Field","name":{"kind":"Name","value":"expectedHoldAmount"}},{"kind":"Field","name":{"kind":"Name","value":"expectedRwaAmount"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPercent"}},{"kind":"Field","name":{"kind":"Name","value":"entryFeePercent"}},{"kind":"Field","name":{"kind":"Name","value":"exitFeePercent"}},{"kind":"Field","name":{"kind":"Name","value":"entryPeriodStart"}},{"kind":"Field","name":{"kind":"Name","value":"entryPeriodExpired"}},{"kind":"Field","name":{"kind":"Name","value":"completionPeriodExpired"}},{"kind":"Field","name":{"kind":"Name","value":"fixedSell"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"realHoldReserve"}},{"kind":"Field","name":{"kind":"Name","value":"virtualHoldReserve"}},{"kind":"Field","name":{"kind":"Name","value":"virtualRwaReserve"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerType"}},{"kind":"Field","name":{"kind":"Name","value":"incomingTranches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"expiredAt"}},{"kind":"Field","name":{"kind":"Name","value":"returnedAmount"}}]}}]}}]}}]} as unknown as DocumentNode<GetPoolByIdQuery, GetPoolByIdQueryVariables>;
export const GetPoolDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPoolDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPools"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"businessId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"poolAddress"}},{"kind":"Field","name":{"kind":"Name","value":"rwaAddress"}},{"kind":"Field","name":{"kind":"Name","value":"expectedHoldAmount"}},{"kind":"Field","name":{"kind":"Name","value":"expectedRwaAmount"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPercent"}},{"kind":"Field","name":{"kind":"Name","value":"entryFeePercent"}},{"kind":"Field","name":{"kind":"Name","value":"exitFeePercent"}},{"kind":"Field","name":{"kind":"Name","value":"entryPeriodStart"}},{"kind":"Field","name":{"kind":"Name","value":"entryPeriodExpired"}},{"kind":"Field","name":{"kind":"Name","value":"completionPeriodExpired"}},{"kind":"Field","name":{"kind":"Name","value":"fixedSell"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"realHoldReserve"}},{"kind":"Field","name":{"kind":"Name","value":"virtualHoldReserve"}},{"kind":"Field","name":{"kind":"Name","value":"virtualRwaReserve"}},{"kind":"Field","name":{"kind":"Name","value":"incomingTranches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"expiredAt"}},{"kind":"Field","name":{"kind":"Name","value":"returnedAmount"}}]}}]}}]}}]} as unknown as DocumentNode<GetPoolDetailQuery, GetPoolDetailQueryVariables>;
export const GetPoolsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPools"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPools"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"businessId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"poolAddress"}},{"kind":"Field","name":{"kind":"Name","value":"expectedHoldAmount"}},{"kind":"Field","name":{"kind":"Name","value":"expectedRwaAmount"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPercent"}},{"kind":"Field","name":{"kind":"Name","value":"entryPeriodStart"}},{"kind":"Field","name":{"kind":"Name","value":"entryPeriodExpired"}},{"kind":"Field","name":{"kind":"Name","value":"completionPeriodExpired"}},{"kind":"Field","name":{"kind":"Name","value":"fixedSell"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}},{"kind":"Field","name":{"kind":"Name","value":"realHoldReserve"}},{"kind":"Field","name":{"kind":"Name","value":"virtualHoldReserve"}},{"kind":"Field","name":{"kind":"Name","value":"virtualRwaReserve"}},{"kind":"Field","name":{"kind":"Name","value":"isFullyReturned"}},{"kind":"Field","name":{"kind":"Name","value":"isTargetReached"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"riskScore"}}]}}]}}]} as unknown as DocumentNode<GetPoolsQuery, GetPoolsQueryVariables>;
export const CreatePoolDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePool"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePoolInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPool"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rwaAddress"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerType"}},{"kind":"Field","name":{"kind":"Name","value":"entryFeePercent"}},{"kind":"Field","name":{"kind":"Name","value":"exitFeePercent"}},{"kind":"Field","name":{"kind":"Name","value":"expectedHoldAmount"}},{"kind":"Field","name":{"kind":"Name","value":"expectedRwaAmount"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPercent"}},{"kind":"Field","name":{"kind":"Name","value":"priceImpactPercent"}},{"kind":"Field","name":{"kind":"Name","value":"entryPeriodStart"}},{"kind":"Field","name":{"kind":"Name","value":"entryPeriodExpired"}},{"kind":"Field","name":{"kind":"Name","value":"completionPeriodExpired"}},{"kind":"Field","name":{"kind":"Name","value":"fixedSell"}},{"kind":"Field","name":{"kind":"Name","value":"allowEntryBurn"}},{"kind":"Field","name":{"kind":"Name","value":"awaitCompletionExpired"}},{"kind":"Field","name":{"kind":"Name","value":"floatingOutTranchesTimestamps"}},{"kind":"Field","name":{"kind":"Name","value":"outgoingTranches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"executedAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"incomingTranches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"expiredAt"}},{"kind":"Field","name":{"kind":"Name","value":"returnedAmount"}}]}}]}}]}}]} as unknown as DocumentNode<CreatePoolMutation, CreatePoolMutationVariables>;
export const RequestPoolApprovalSignaturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestPoolApprovalSignatures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestPoolApprovalSignaturesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestPoolApprovalSignatures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskId"}}]}}]}}]} as unknown as DocumentNode<RequestPoolApprovalSignaturesMutation, RequestPoolApprovalSignaturesMutationVariables>;
export const GetRawPriceDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRawPriceData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetRawPriceDataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRawPriceData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<GetRawPriceDataQuery, GetRawPriceDataQueryVariables>;
export const EditPoolDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditPool"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditPoolInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editPool"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}}]}}]}}]} as unknown as DocumentNode<EditPoolMutation, EditPoolMutationVariables>;
export const GetLatestPriceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLatestPrice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetRawPriceDataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRawPriceData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<GetLatestPriceQuery, GetLatestPriceQueryVariables>;
export const GetOhlcPriceDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOhlcPriceData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetOhlcPriceDataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOhlcPriceData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"high"}},{"kind":"Field","name":{"kind":"Name","value":"low"}},{"kind":"Field","name":{"kind":"Name","value":"close"}}]}}]}}]} as unknown as DocumentNode<GetOhlcPriceDataQuery, GetOhlcPriceDataQueryVariables>;
export const GetVolumeDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVolumeData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetVolumeDataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVolumeData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"mintVolume"}},{"kind":"Field","name":{"kind":"Name","value":"burnVolume"}}]}}]}}]} as unknown as DocumentNode<GetVolumeDataQuery, GetVolumeDataQueryVariables>;
export const GetSignatureTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSignatureTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetSignatureTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSignatureTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"expired"}},{"kind":"Field","name":{"kind":"Name","value":"signatures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signer"}},{"kind":"Field","name":{"kind":"Name","value":"signature"}}]}}]}}]}}]} as unknown as DocumentNode<GetSignatureTaskQuery, GetSignatureTaskQueryVariables>;
export const GetPortfolioBalancesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPortfolioBalances"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetBalancesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBalances"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"poolAddress"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]}}]} as unknown as DocumentNode<GetPortfolioBalancesQuery, GetPortfolioBalancesQueryVariables>;
export const GetPoolsForPortfolioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPoolsForPortfolio"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPools"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"poolAddress"}},{"kind":"Field","name":{"kind":"Name","value":"rwaAddress"}},{"kind":"Field","name":{"kind":"Name","value":"businessId"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"riskScore"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPercent"}},{"kind":"Field","name":{"kind":"Name","value":"fixedSell"}},{"kind":"Field","name":{"kind":"Name","value":"expectedHoldAmount"}},{"kind":"Field","name":{"kind":"Name","value":"expectedRwaAmount"}},{"kind":"Field","name":{"kind":"Name","value":"awaitingRwaAmount"}},{"kind":"Field","name":{"kind":"Name","value":"realHoldReserve"}},{"kind":"Field","name":{"kind":"Name","value":"virtualHoldReserve"}},{"kind":"Field","name":{"kind":"Name","value":"virtualRwaReserve"}},{"kind":"Field","name":{"kind":"Name","value":"exitFeePercent"}},{"kind":"Field","name":{"kind":"Name","value":"isTargetReached"}},{"kind":"Field","name":{"kind":"Name","value":"isFullyReturned"}},{"kind":"Field","name":{"kind":"Name","value":"entryPeriodExpired"}},{"kind":"Field","name":{"kind":"Name","value":"completionPeriodExpired"}},{"kind":"Field","name":{"kind":"Name","value":"incomingTranches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"expiredAt"}},{"kind":"Field","name":{"kind":"Name","value":"returnedAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastCompletedIncomingTranche"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<GetPoolsForPortfolioQuery, GetPoolsForPortfolioQueryVariables>;
export const GetBusinessesForPortfolioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBusinessesForPortfolio"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBusinesses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerType"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"businessType"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetBusinessesForPortfolioQuery, GetBusinessesForPortfolioQueryVariables>;
export const GetCompaniesForPortfolioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompaniesForPortfolio"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetCompaniesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCompanies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetCompaniesForPortfolioQuery, GetCompaniesForPortfolioQueryVariables>;
export const GetPoolTransactionsForPortfolioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPoolTransactionsForPortfolio"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetPoolTransactionsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPoolTransactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userAddress"}},{"kind":"Field","name":{"kind":"Name","value":"poolAddress"}},{"kind":"Field","name":{"kind":"Name","value":"transactionType"}},{"kind":"Field","name":{"kind":"Name","value":"holdAmount"}},{"kind":"Field","name":{"kind":"Name","value":"rwaAmount"}},{"kind":"Field","name":{"kind":"Name","value":"bonusAmount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetPoolTransactionsForPortfolioQuery, GetPoolTransactionsForPortfolioQueryVariables>;
export const GetReferralsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReferrals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetReferralsFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getReferrals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"userWallet"}},{"kind":"Field","name":{"kind":"Name","value":"referrerId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetReferralsQuery, GetReferralsQueryVariables>;
export const GetReferrerClaimHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReferrerClaimHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetReferrerClaimHistoryFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getReferrerClaimHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"referralWallet"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetReferrerClaimHistoryQuery, GetReferrerClaimHistoryQueryVariables>;
export const GetReferrerWithdrawsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReferrerWithdraws"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetReferrerWithdrawsFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getReferrerWithdraws"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}},{"kind":"Field","name":{"kind":"Name","value":"totalWithdrawnAmount"}},{"kind":"Field","name":{"kind":"Name","value":"taskCooldown"}},{"kind":"Field","name":{"kind":"Name","value":"taskExpiredAt"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}}]}}]}}]} as unknown as DocumentNode<GetReferrerWithdrawsQuery, GetReferrerWithdrawsQueryVariables>;
export const GetFeesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFees"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetFeesFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFees"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"userWallet"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"referralRewardAmount"}},{"kind":"Field","name":{"kind":"Name","value":"referralRewardCount"}}]}}]}}]} as unknown as DocumentNode<GetFeesQuery, GetFeesQueryVariables>;
export const CreateReferrerWithdrawTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReferrerWithdrawTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateReferrerWithdrawTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReferrerWithdrawTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"taskCooldown"}},{"kind":"Field","name":{"kind":"Name","value":"taskExpiredAt"}}]}}]}}]} as unknown as DocumentNode<CreateReferrerWithdrawTaskMutation, CreateReferrerWithdrawTaskMutationVariables>;
export const RegisterReferralDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterReferral"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterReferralInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerReferral"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"userWallet"}},{"kind":"Field","name":{"kind":"Name","value":"referrerId"}},{"kind":"Field","name":{"kind":"Name","value":"referrerWallet"}}]}}]}}]} as unknown as DocumentNode<RegisterReferralMutation, RegisterReferralMutationVariables>;
export const GetBalancesForWithdrawalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBalancesForWithdrawals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetBalancesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBalances"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"poolAddress"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]}}]} as unknown as DocumentNode<GetBalancesForWithdrawalsQuery, GetBalancesForWithdrawalsQueryVariables>;
export const GetPoolsForWithdrawalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPoolsForWithdrawals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPools"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"poolAddress"}},{"kind":"Field","name":{"kind":"Name","value":"rwaAddress"}},{"kind":"Field","name":{"kind":"Name","value":"businessId"}},{"kind":"Field","name":{"kind":"Name","value":"entryFeePercent"}},{"kind":"Field","name":{"kind":"Name","value":"exitFeePercent"}},{"kind":"Field","name":{"kind":"Name","value":"expectedHoldAmount"}},{"kind":"Field","name":{"kind":"Name","value":"expectedRwaAmount"}},{"kind":"Field","name":{"kind":"Name","value":"awaitingRwaAmount"}},{"kind":"Field","name":{"kind":"Name","value":"realHoldReserve"}},{"kind":"Field","name":{"kind":"Name","value":"virtualHoldReserve"}},{"kind":"Field","name":{"kind":"Name","value":"virtualRwaReserve"}},{"kind":"Field","name":{"kind":"Name","value":"isTargetReached"}},{"kind":"Field","name":{"kind":"Name","value":"isFullyReturned"}},{"kind":"Field","name":{"kind":"Name","value":"entryPeriodExpired"}},{"kind":"Field","name":{"kind":"Name","value":"completionPeriodExpired"}}]}}]}}]} as unknown as DocumentNode<GetPoolsForWithdrawalsQuery, GetPoolsForWithdrawalsQueryVariables>;
export const GetBusinessesForWithdrawalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBusinessesForWithdrawals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBusinesses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerType"}}]}}]}}]} as unknown as DocumentNode<GetBusinessesForWithdrawalsQuery, GetBusinessesForWithdrawalsQueryVariables>;
export const GetCompaniesForWithdrawalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompaniesForWithdrawals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetCompaniesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCompanies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetCompaniesForWithdrawalsQuery, GetCompaniesForWithdrawalsQueryVariables>;
export const GetWithdrawalTransactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWithdrawalTransactions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetTransactionsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTransactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"poolAddress"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetWithdrawalTransactionsQuery, GetWithdrawalTransactionsQueryVariables>;