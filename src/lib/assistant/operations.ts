import { graphql } from '@/gql';

export const CREATE_ASSISTANT = graphql(`
  mutation CreateAssistant($input: CreateAssistantInput!) {
    createAssistant(input: $input) {
      id
      name
      contextPreferences
    }
  }
`);

export const UPDATE_ASSISTANT = graphql(`
  mutation UpdateAssistant($input: UpdateAssistantInput!) {
    updateAssistant(input: $input) {
      id
      name
      contextPreferences
    }
  }
`);

export const GET_USER_ASSISTANTS = graphql(`
  query GetUserAssistants {
    getUserAssistants {
      id
      name
      contextPreferences
    }
  }
`);

export const CREATE_MESSAGE = graphql(`
  mutation CreateMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      id
      assistantId
      text
    }
  }
`);

export const GET_MESSAGE_HISTORY = graphql(`
  query GetMessageHistory($assistantId: ID!) {
    getMessageHistory(assistantId: $assistantId) {
      id
      assistantId
      text
    }
  }
`);
