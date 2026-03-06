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
  chainId: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  ownerType: Scalars['String']['output'];
  ownerWallet?: Maybe<Scalars['String']['output']>;
  paused: Scalars['Boolean']['output'];
  riskScore: Scalars['Float']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  tokenAddress?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Float']['output'];
};

export enum BusinessOwnerType {
  Company = 'company'
}

export type Company = {
  __typename?: 'Company';
  createdAt: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type CompanyWithDetails = {
  __typename?: 'CompanyWithDetails';
  createdAt: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  updatedAt: Scalars['Int']['output'];
  users: Array<UserWithPermissions>;
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
  chainId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId: Scalars['String']['input'];
  ownerType: BusinessOwnerType;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateBusinessWithAiInput = {
  chainId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  ownerId: Scalars['String']['input'];
  ownerType: BusinessOwnerType;
};

export type CreateCompanyInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
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
  image?: InputMaybe<Scalars['String']['input']>;
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

export type Document = {
  __typename?: 'Document';
  createdAt: Scalars['Float']['output'];
  creator: Scalars['String']['output'];
  folderId: Scalars['String']['output'];
  grandParentId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  link: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  ownerType: Scalars['String']['output'];
  parentId: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type EditBusinessDataInput = {
  chainId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
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
  image?: InputMaybe<Scalars['String']['input']>;
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
  galleryId: Scalars['String']['output'];
  grandParentId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  link: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  ownerType: Scalars['String']['output'];
  parentId: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
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
};


export type MutationAddMemberArgs = {
  input: AddMemberInput;
};


export type MutationAuthenticateArgs = {
  input: AuthenticateInput;
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
  fixedSell: Scalars['Boolean']['output'];
  floatingOutTranchesTimestamps: Scalars['Boolean']['output'];
  floatingTimestampOffset: Scalars['Float']['output'];
  fullReturnTimestamp?: Maybe<Scalars['Float']['output']>;
  holdToken?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
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
  riskScore: Scalars['Float']['output'];
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
  countdown: Scalars['Int']['output'];
  poolDeployed: Pool;
  priceUpdates: PriceUpdateEvent;
  transactionUpdates: TransactionEvent;
};


export type SubscriptionCountdownArgs = {
  from: Scalars['Int']['input'];
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
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCompanyInput = {
  id: Scalars['ID']['input'];
  updateData: UpdateCompanyDataInput;
};

export type UpdateDocumentDataInput = {
  link?: InputMaybe<Scalars['String']['input']>;
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
  link?: InputMaybe<Scalars['String']['input']>;
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

export type GetBusinessQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetBusinessQuery = { __typename?: 'Query', getBusiness: { __typename?: 'Business', id: string, name: string, description?: string | null, ownerId: string, ownerType: string, chainId: string, createdAt: number, updatedAt: number } };

export type CreateBusinessMutationVariables = Exact<{
  input: CreateBusinessInput;
}>;


export type CreateBusinessMutation = { __typename?: 'Mutation', createBusiness: { __typename?: 'Business', id: string, name: string, description?: string | null, ownerId: string, ownerType: string, chainId: string, createdAt: number, updatedAt: number } };

export type GetBusinessesQueryVariables = Exact<{
  input: FilterInput;
}>;


export type GetBusinessesQuery = { __typename?: 'Query', getBusinesses: Array<{ __typename?: 'Business', id: string, name: string, description?: string | null, ownerId: string, ownerType: string, chainId: string, createdAt: number, updatedAt: number }> };

export type CreateCompanyMutationVariables = Exact<{
  input: CreateCompanyInput;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutation', createCompany: { __typename?: 'Company', id: string, name: string, description: string, ownerId: string, createdAt: number, updatedAt: number } };

export type GetCompaniesQueryVariables = Exact<{
  input?: InputMaybe<GetCompaniesInput>;
}>;


export type GetCompaniesQuery = { __typename?: 'Query', getCompanies: Array<{ __typename?: 'Company', id: string, name: string, description: string, ownerId: string, createdAt: number, updatedAt: number }> };

export type GetCompanyQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCompanyQuery = { __typename?: 'Query', getCompany: { __typename?: 'CompanyWithDetails', id: string, name: string, description: string, ownerId: string, createdAt: number, updatedAt: number, users: Array<{ __typename?: 'UserWithPermissions', id: string, userId: string, name: string, permissions: Array<{ __typename?: 'UserPermission', id: string, permission: string, entity?: string | null }> }> } };

export type UpdateCompanyMutationVariables = Exact<{
  input: UpdateCompanyInput;
}>;


export type UpdateCompanyMutation = { __typename?: 'Mutation', updateCompany: { __typename?: 'Company', id: string, name: string, description: string, ownerId: string, createdAt: number, updatedAt: number } };

export type DeleteCompanyMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCompanyMutation = { __typename?: 'Mutation', deleteCompany: string };

export type GetGalleriesQueryVariables = Exact<{
  input?: InputMaybe<GetGalleriesFilterInput>;
}>;


export type GetGalleriesQuery = { __typename?: 'Query', getGalleries: Array<{ __typename?: 'Gallery', id: string, name: string, parentId: string }> };

export type CreateGalleryMutationVariables = Exact<{
  input: CreateGalleryInput;
}>;


export type CreateGalleryMutation = { __typename?: 'Mutation', createGallery: { __typename?: 'Gallery', id: string, name: string, parentId: string } };


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
export const GetBusinessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBusiness"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBusiness"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerType"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetBusinessQuery, GetBusinessQueryVariables>;
export const CreateBusinessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBusiness"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBusinessInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBusiness"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerType"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateBusinessMutation, CreateBusinessMutationVariables>;
export const GetBusinessesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBusinesses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBusinesses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerType"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetBusinessesQuery, GetBusinessesQueryVariables>;
export const CreateCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCompanyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateCompanyMutation, CreateCompanyMutationVariables>;
export const GetCompaniesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompanies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetCompaniesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCompanies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetCompaniesQuery, GetCompaniesQueryVariables>;
export const GetCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"entity"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetCompanyQuery, GetCompanyQueryVariables>;
export const UpdateCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCompanyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateCompanyMutation, UpdateCompanyMutationVariables>;
export const DeleteCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCompanyMutation, DeleteCompanyMutationVariables>;
export const GetGalleriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGalleries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetGalleriesFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGalleries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]}}]} as unknown as DocumentNode<GetGalleriesQuery, GetGalleriesQueryVariables>;
export const CreateGalleryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGallery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGalleryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGallery"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]}}]} as unknown as DocumentNode<CreateGalleryMutation, CreateGalleryMutationVariables>;