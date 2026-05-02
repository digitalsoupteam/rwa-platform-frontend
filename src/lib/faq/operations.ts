import { graphql } from '@/gql';

export const GET_FAQ_TOPICS = graphql(`
  query GetFaqTopics($input: GetFaqTopicsFilterInput) {
    getFaqTopics(input: $input) {
      id
      name
      parentId
    }
  }
`);

export const CREATE_FAQ_TOPIC = graphql(`
  mutation CreateFaqTopic($input: CreateFaqTopicInput!) {
    createFaqTopic(input: $input) {
      id
      name
      parentId
    }
  }
`);

export const GET_FAQ_ANSWERS = graphql(`
  query GetFaqAnswers($input: GetFaqAnswersFilterInput) {
    getFaqAnswers(input: $input) {
      id
      topicId
      question
      answer
      order
      createdAt
    }
  }
`);

export const GET_FAQ_ANSWER = graphql(`
  query GetFaqAnswer($id: ID!) {
    getFaqAnswer(id: $id) {
      id
      topicId
      question
      answer
      order
      createdAt
    }
  }
`);

export const CREATE_FAQ_ANSWER = graphql(`
  mutation CreateFaqAnswer($input: CreateFaqAnswerInput!) {
    createFaqAnswer(input: $input) {
      id
      topicId
      question
      answer
      createdAt
    }
  }
`);

export const UPDATE_FAQ_ANSWER = graphql(`
  mutation UpdateFaqAnswer($input: UpdateFaqAnswerInput!) {
    updateFaqAnswer(input: $input) {
      id
      question
      answer
      updatedAt
    }
  }
`);

export const DELETE_FAQ_ANSWER = graphql(`
  mutation DeleteFaqAnswer($id: ID!) {
    deleteFaqAnswer(id: $id)
  }
`);