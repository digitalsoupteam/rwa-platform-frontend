import { graphql } from '@/gql';
import { gql } from '@apollo/client';

export const GET_BUSINESS_WITH_RISK = gql`
  query GetBusinessWithRisk($id: ID!) {
    getBusiness(id: $id) {
      id
      name
      description
      tags
      riskScore
      ownerId
      ownerType
    }
  }
`;

export const GET_BUSINESS = graphql(`
  query GetBusiness($id: ID!) {
    getBusiness(id: $id) {
      id
      name
      description
      tags
      ownerId
      ownerType
      chainId
      createdAt
      updatedAt
    }
  }
`);

export const GET_BUSINESS_DEPLOY_INFO = gql`
  query GetBusinessDeployInfo($id: ID!) {
    getBusiness(id: $id) {
      id
      ownerId
      ownerType
      ownerWallet
      tokenAddress
      approvalSignaturesTaskId
      approvalSignaturesTaskExpired
    }
  }
`;

export const REQUEST_BUSINESS_APPROVAL_SIGNATURES = gql`
  mutation RequestBusinessApprovalSignatures($input: RequestBusinessApprovalSignaturesInput!) {
    requestBusinessApprovalSignatures(input: $input) {
      taskId
    }
  }
`;

export const REJECT_BUSINESS_APPROVAL_SIGNATURES = gql`
  mutation RejectBusinessApprovalSignatures($id: ID!) {
    rejectBusinessApprovalSignatures(id: $id)
  }
`;

export const CREATE_BUSINESS = graphql(`
  mutation CreateBusiness($input: CreateBusinessInput!) {
    createBusiness(input: $input) {
      id
      name
      description
      ownerId
      ownerType
      chainId
      createdAt
      updatedAt
    }
  }
`);

export const EDIT_BUSINESS = graphql(`
  mutation EditBusiness($input: EditBusinessInput!) {
    editBusiness(input: $input) {
      id
      name
      description
    }
  }
`);

export const GET_BUSINESSES = graphql(`
  query GetBusinesses($input: FilterInput!) {
    getBusinesses(input: $input) {
      id
      name
      description
      tags
      riskScore
      ownerId
      ownerType
      chainId
      createdAt
      updatedAt
    }
  }
`);