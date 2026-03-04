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
    "\n  mutation CreateBusiness($input: CreateBusinessInput!) {\n    createBusiness(input: $input) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateBusinessDocument,
    "\n  query GetBusinesses($input: FilterInput!) {\n    getBusinesses(input: $input) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetBusinessesDocument,
    "\n  mutation CreateCompany($input: CreateCompanyInput!) {\n    createCompany(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateCompanyDocument,
    "\n  query GetCompanies($input: GetCompaniesInput) {\n    getCompanies(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetCompaniesDocument,
    "\n  query GetCompany($id: ID!) {\n    getCompany(id: $id) {\n      id\n      name\n      description\n      ownerId\n      users {\n        id\n        userId\n        name\n        permissions {\n          id\n          permission\n          entity\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetCompanyDocument,
    "\n  mutation UpdateCompany($input: UpdateCompanyInput!) {\n    updateCompany(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateCompanyDocument,
    "\n  mutation DeleteCompany($id: ID!) {\n    deleteCompany(id: $id)\n  }\n": typeof types.DeleteCompanyDocument,
};
const documents: Documents = {
    "\n  mutation Authenticate($input: AuthenticateInput!) {\n    authenticate(input: $input) {\n      userId\n      wallet\n      accessToken\n      refreshToken\n    }\n  }\n": types.AuthenticateDocument,
    "\n  mutation RefreshToken($input: RefreshTokenInput!) {\n    refreshToken(input: $input) {\n      userId\n      wallet\n      accessToken\n      refreshToken\n    }\n  }\n": types.RefreshTokenDocument,
    "\n  mutation RevokeTokens($input: RevokeTokensInput!) {\n    revokeTokens(input: $input) {\n      revokedCount\n    }\n  }\n": types.RevokeTokensDocument,
    "\n  query GetUserTokens {\n    getUserTokens {\n      tokenId\n      userId\n      tokenHash\n      expiresAt\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetUserTokensDocument,
    "\n  mutation CreateBusiness($input: CreateBusinessInput!) {\n    createBusiness(input: $input) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateBusinessDocument,
    "\n  query GetBusinesses($input: FilterInput!) {\n    getBusinesses(input: $input) {\n      id\n      name\n      description\n      ownerId\n      ownerType\n      chainId\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetBusinessesDocument,
    "\n  mutation CreateCompany($input: CreateCompanyInput!) {\n    createCompany(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateCompanyDocument,
    "\n  query GetCompanies($input: GetCompaniesInput) {\n    getCompanies(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetCompaniesDocument,
    "\n  query GetCompany($id: ID!) {\n    getCompany(id: $id) {\n      id\n      name\n      description\n      ownerId\n      users {\n        id\n        userId\n        name\n        permissions {\n          id\n          permission\n          entity\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetCompanyDocument,
    "\n  mutation UpdateCompany($input: UpdateCompanyInput!) {\n    updateCompany(input: $input) {\n      id\n      name\n      description\n      ownerId\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateCompanyDocument,
    "\n  mutation DeleteCompany($id: ID!) {\n    deleteCompany(id: $id)\n  }\n": types.DeleteCompanyDocument,
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

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;