import { graphql } from '@/gql';

export const GET_BUSINESS = graphql(`
  query GetBusiness($id: ID!) {
    getBusiness(id: $id) {
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

export const GET_BUSINESSES = graphql(`
  query GetBusinesses($input: FilterInput!) {
    getBusinesses(input: $input) {
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