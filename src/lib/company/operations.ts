import { graphql } from '@/gql';

export const CREATE_COMPANY = graphql(`
  mutation CreateCompany($input: CreateCompanyInput!) {
    createCompany(input: $input) {
      id
      name
      description
      ownerId
      createdAt
      updatedAt
    }
  }
`);

export const GET_COMPANIES = graphql(`
  query GetCompanies($input: GetCompaniesInput) {
    getCompanies(input: $input) {
      id
      name
      description
      ownerId
      createdAt
      updatedAt
    }
  }
`);

export const GET_COMPANY = graphql(`
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      name
      description
      ownerId
      users {
        id
        userId
        name
        permissions {
          id
          permission
          entity
        }
      }
      createdAt
      updatedAt
    }
  }
`);

export const UPDATE_COMPANY = graphql(`
  mutation UpdateCompany($input: UpdateCompanyInput!) {
    updateCompany(input: $input) {
      id
      name
      description
      ownerId
      createdAt
      updatedAt
    }
  }
`);

export const DELETE_COMPANY = graphql(`
  mutation DeleteCompany($id: ID!) {
    deleteCompany(id: $id)
  }
`);

export const ADD_MEMBER = graphql(`
  mutation AddMember($input: AddMemberInput!) {
    addMember(input: $input) {
      id
      userId
      name
      createdAt
      updatedAt
    }
  }
`);

export const REMOVE_MEMBER = graphql(`
  mutation RemoveMember($input: RemoveMemberInput!) {
    removeMember(input: $input)
  }
`);
