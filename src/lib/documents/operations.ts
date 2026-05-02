import { gql } from '@apollo/client';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { ParentTypes } from '@/gql/graphql';

export interface DocumentItem {
  id: string;
  folderId: string;
  name: string;
  link: string;
  ownerId: string;
  ownerType: string;
  creator: string;
  parentId: string;
  grandParentId: string;
  createdAt: number;
  updatedAt: number;
}

export interface FolderItem {
  id: string;
  name: string;
  parentId: string;
  ownerId: string;
  ownerType: string;
}

interface GetFoldersData {
  getFolders: FolderItem[];
}
interface GetFoldersVars {
  input?: { filter?: Record<string, unknown> };
}

interface CreateFolderData {
  createFolder: FolderItem;
}
interface CreateFolderVars {
  input: { name: string; parentId: string; type: ParentTypes };
}

interface GetDocumentsData {
  getDocuments: DocumentItem[];
}
interface GetDocumentsVars {
  input?: { filter?: Record<string, unknown> };
}

interface DeleteDocumentData {
  deleteDocument: string;
}
interface DeleteDocumentVars {
  id: string;
}

interface UpdateDocumentData {
  updateDocument: DocumentItem;
}
interface UpdateDocumentVars {
  input: { id: string; updateData: { name?: string; link?: string } };
}

export const GET_FOLDERS: TypedDocumentNode<GetFoldersData, GetFoldersVars> = gql`
  query GetFoldersForDocs($input: GetFoldersFilterInput) {
    getFolders(input: $input) {
      id
      name
      parentId
      ownerId
      ownerType
    }
  }
`;

export const CREATE_FOLDER: TypedDocumentNode<CreateFolderData, CreateFolderVars> = gql`
  mutation CreateFolderForDocs($input: CreateFolderInput!) {
    createFolder(input: $input) {
      id
      name
      parentId
      ownerId
      ownerType
    }
  }
`;

export const GET_DOCUMENTS: TypedDocumentNode<GetDocumentsData, GetDocumentsVars> = gql`
  query GetDocuments($input: GetDocumentsFilterInput) {
    getDocuments(input: $input) {
      id
      folderId
      name
      link
      ownerId
      ownerType
      creator
      parentId
      grandParentId
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_DOCUMENT: TypedDocumentNode<DeleteDocumentData, DeleteDocumentVars> = gql`
  mutation DeleteDocument($id: ID!) {
    deleteDocument(id: $id)
  }
`;

export const UPDATE_DOCUMENT: TypedDocumentNode<UpdateDocumentData, UpdateDocumentVars> = gql`
  mutation UpdateDocumentMeta($input: UpdateDocumentInput!) {
    updateDocument(input: $input) {
      id
      folderId
      name
      link
      ownerId
      ownerType
      creator
      parentId
      grandParentId
      createdAt
      updatedAt
    }
  }
`;

export const uploadDocumentMultipart = async (
  folderId: string,
  name: string,
  file: File
): Promise<DocumentItem> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:443/gateway/graphql';

  const formData = new FormData();
  formData.append(
    'operations',
    JSON.stringify({
      query: `mutation CreateDocument($input: CreateDocumentInput!) { createDocument(input: $input) { id folderId name link ownerId ownerType creator parentId grandParentId createdAt updatedAt } }`,
      variables: { input: { folderId, name, file: null } },
    })
  );
  formData.append('map', JSON.stringify({ '0': ['variables.input.file'] }));
  formData.append('0', file);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  const json = await response.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json.data.createDocument as DocumentItem;
};