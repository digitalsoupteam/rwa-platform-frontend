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
