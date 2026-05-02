import { gql } from '@apollo/client';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { GalleryParentTypes } from '@/gql/graphql';

interface GalleryItem {
  id: string;
  name: string;
  parentId: string;
}

interface GetGalleriesData {
  getGalleries: GalleryItem[];
}

interface GetGalleriesVars {
  input?: { filter?: Record<string, unknown> };
}

interface CreateGalleryData {
  createGallery: GalleryItem;
}

interface CreateGalleryVars {
  input: { name: string; parentId: string; type: GalleryParentTypes };
}

export const GET_GALLERIES: TypedDocumentNode<GetGalleriesData, GetGalleriesVars> = gql`
  query GetGalleries($input: GetGalleriesFilterInput) {
    getGalleries(input: $input) {
      id
      name
      parentId
    }
  }
`;

export const CREATE_GALLERY: TypedDocumentNode<CreateGalleryData, CreateGalleryVars> = gql`
  mutation CreateGallery($input: CreateGalleryInput!) {
    createGallery(input: $input) {
      id
      name
      parentId
    }
  }
`;