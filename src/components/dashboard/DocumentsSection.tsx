'use client';

import React, { ChangeEvent, DragEvent, FC, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useMutation, useQuery } from '@apollo/client/react';
import { Button, ButtonBorderDash, Icon, Input, Title, toast } from '@/components/ui';
import { ConfirmModal } from '@/components/common';
import { ParentTypes } from '@/gql/graphql';
import {
  DocumentItem,
  CREATE_FOLDER,
  GET_FOLDERS,
  GET_DOCUMENTS,
  DELETE_DOCUMENT,
  UPDATE_DOCUMENT,
  uploadDocumentMultipart,
} from '@/lib/documents/operations';
import Link from 'next/link';

const ALLOWED_MIME = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/png',
  'image/jpeg',
  'text/plain',
];

type Tab = 'upload' | 'embed';

// ─── File icon ────────────────────────────────────────────────────────────────

const FileIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    width={'20'}
    height={'20'}
    viewBox={'0 0 20 20'}
    fill={'none'}
    xmlns={'http://www.w3.org/2000/svg'}
    stroke={'currentColor'}
    strokeWidth={'1.5'}
    strokeLinecap={'round'}
    strokeLinejoin={'round'}
    className={className}
  >
    <path d={'M11.667 1.667H5a1.667 1.667 0 0 0-1.667 1.666v13.334A1.667 1.667 0 0 0 5 18.333h10a1.667 1.667 0 0 0 1.667-1.666V7.5l-5-5.833Z'} />
    <path d={'M11.667 1.667V7.5H17.5'} />
  </svg>
);

// ─── Popover ─────────────────────────────────────────────────────────────────

interface DocumentPopoverProps {
  className?: string;
  editDoc?: DocumentItem | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onSubmit: (data: { name: string; file?: File; embedUrl?: string }) => void;
  loading?: boolean;
}

const DocumentPopover: FC<DocumentPopoverProps> = ({ className, editDoc, containerRef, onClose, onSubmit, loading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [tab, setTab] = useState<Tab>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [embedError, setEmbedError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    if (editDoc) {
      setName(editDoc.name);
      if (editDoc.link?.startsWith('http')) {
        setTab('embed');
        setEmbedUrl(editDoc.link);
      } else {
        setTab('upload');
      }
    }
  }, [editDoc]);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [onClose, containerRef]);

  const applyFile = (f: File) => {
    if (f.size > 5 * 1024 * 1024) {
      setFile(null);
      setFileError('File size exceeds 5 MB');
      return;
    }
    setFile(f);
    setFileError('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) applyFile(f);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) applyFile(f);
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setNameError('Enter document name');
      return;
    }

    if (tab === 'upload' && !editDoc) {
      if (!file) {
        setFileError('Please select a file');
        return;
      }
      onSubmit({ name: name.trim(), file });
    } else if (tab === 'embed') {
      if (!editDoc && !embedUrl.trim()) {
        setEmbedError('Enter a URL');
        return;
      }
      onSubmit({ name: name.trim(), embedUrl: embedUrl.trim() || undefined });
    } else {
      onSubmit({ name: name.trim(), file: file ?? undefined });
    }
  };

  return (
    <div
      className={clsx(
        'absolute top-1/3 left-1/3 z-50 mt-1 w-[328px] md:w-110 bg-white rounded-xl border border-stroke-primary shadow-[0_4px_24px_rgba(0,0,0,0.08)]',
        className
      )}
    >
      <div className={'flex border-b border-stroke-primary'}>
        {(['upload', 'embed'] as const).map(t => (
          <button
            key={t}
            type={'button'}
            onClick={() => setTab(t)}
            className={clsx(
              'relative px-4 py-3 text-sm font-medium transition-colors',
              tab === t ? 'text-blue' : 'text-label-tertiary hover:text-grey-dark'
            )}
          >
            {t === 'upload' ? 'Upload' : 'Embed link'}
            {tab === t && <span className={'absolute bottom-0 left-0 right-0 h-0.5 bg-blue rounded-t-sm'} />}
          </button>
        ))}
      </div>

      <div className={'p-3'}>
        {tab === 'upload' && (
          <div className={'mb-3'}>
            <div
              className={clsx(
                'flex flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed py-8 cursor-pointer transition-colors',
                fileError
                  ? 'border-red-bright bg-red-bright/5'
                  : isDragging
                    ? 'border-blue bg-blue-light/40'
                    : 'border-stroke-primary hover:border-blue hover:bg-blue-light/30'
              )}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              {file ? (
                <>
                  <FileIcon className={'text-blue'} />
                  <span className={'text-sm text-blue font-medium'}>{file.name}</span>
                  <span className={'text-xs text-blue'}>Successfully selected</span>
                </>
              ) : (
                <>
                  <FileIcon className={fileError ? 'text-red-bright' : 'text-label-tertiary'} />
                  <span className={clsx('text-sm font-medium', fileError ? 'text-red-bright' : 'text-grey-dark')}>
                    Choose a file
                  </span>
                  <span className={'text-xs text-label-tertiary'}>The maximum size per file is 5 MB</span>
                </>
              )}
            </div>
            {fileError && <p className={'text-xs text-red-bright mt-1.5'}>{fileError}</p>}
            <input ref={fileInputRef} type={'file'} className={'hidden'} onChange={handleInputChange} />
          </div>
        )}

        {tab === 'embed' && (
          <div className={'mb-3'}>
            <input
              type={'text'}
              placeholder={'https://...'}
              value={embedUrl}
              onChange={e => { setEmbedUrl(e.target.value); setEmbedError(''); }}
              className={clsx(
                'w-full rounded-lg border px-3 py-2 text-sm outline-none placeholder:text-label-tertiary tr-d-all',
                embedError ? 'border-red-bright text-red-bright focus:border-red-bright' : 'border-stroke-primary focus:border-blue'
              )}
            />
            {embedError && <p className={'text-xs text-red-bright mt-1.5'}>{embedError}</p>}
          </div>
        )}

        <div className={'mb-3'}>
          <div className={'text-sm font-medium mb-1.5'}>
            Name<span className={'text-red-bright'}>*</span>
          </div>
          <Input
            placeholder={'For example «Our certificates»'}
            size={'sm'}
            colorScheme={'light'}
            errorMessage={nameError}
            value={name}
            onChange={e => { setName(e.target.value); if (e.target.value.trim()) setNameError(''); }}
          />
        </div>

        <div className={'flex justify-end'}>
          <Button visualType={'quaternary'} type={'button'} onClick={handleSubmit} disabled={loading}>
            {editDoc ? 'Update' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  );
};

// ─── Document card ────────────────────────────────────────────────────────────

interface DocumentCardProps {
  doc: DocumentItem;
  onEdit: () => void;
  onDelete: () => void;
  canEdit?: boolean;
}

const getFilename = (link: string) => {
  if (!link) return '';
  try {
    const url = new URL(link);
    return url.pathname.split('/').pop() ?? link;
  } catch {
    return link.split('/').pop() ?? link;
  }
};

const DocumentCard: FC<DocumentCardProps> = ({ doc, onEdit, onDelete, canEdit }) => (
  <div className={'w-full flex flex-col gap-2 p-4 border-stroke-primary border-1 rounded-xl'}>
    <Link
      href={process.env.NEXT_PUBLIC_FILE_ENDPOINT + doc.link}
      target={'_blank'}
      rel={'noopener noreferrer'}
      className={'w-full aspect-[0.855] rounded-xl overflow-hidden bg-grey-light block'}
    >
      <div
        className={'w-full h-full'}
        style={{
          backgroundImage: 'repeating-conic-gradient(#e5e7eb 0% 25%, #fff 0% 50%)',
          backgroundSize: '20px 20px',
        }}
      />
    </Link>
    <div className={'flex gap-2 justify-between items-center'}>
      <div className={'min-w-0'}>
        <div className={'text-lg font-semibold leading-tight truncate'}>{doc.name}</div>
        {doc.link && <div className={'text-base text-label-tertiary truncate mt-1'}>{getFilename(doc.link)}</div>}
      </div>
      {canEdit && (
        <div className={'flex items-center gap-2 shrink-0'}>
          <button
            type={'button'}
            onClick={onEdit}
            className={
              'cursor-pointer flex items-center justify-center size-10.5 p-1 text-black bg-bg-tertiary rounded-[10px] tr-d-all'
            }
            aria-label={'Edit document'}
          >
            <Icon name={'edit'} className={'size-5'} />
          </button>
          <button
            type={'button'}
            onClick={onDelete}
            className={
              'cursor-pointer flex items-center justify-center size-10.5 p-1 text-black bg-bg-tertiary rounded-[10px] tr-d-all'
            }
            aria-label={'Delete document'}
          >
            <Icon name={'trash'} className={'size-5'} />
          </button>
        </div>
      )}
    </div>
  </div>
);

// ─── DocumentsSection ─────────────────────────────────────────────────────────

type PopoverTarget = 'add-button' | { docId: string } | null;

interface DocumentsSectionProps {
  projectId: string;
  companyId: string;
  canEdit?: boolean;
}

const DocumentsSection: FC<DocumentsSectionProps> = ({ projectId, companyId, canEdit = false }) => {
  const [folderId, setFolderId] = useState<string | null>(null);
  const [popoverTarget, setPopoverTarget] = useState<PopoverTarget>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const addContainerRef = useRef<HTMLDivElement>(null);
  const emptyContainerRef = useRef<HTMLDivElement>(null);
  const docContainerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const { data: foldersData, refetch: refetchFolders } = useQuery(GET_FOLDERS, {
    variables: { input: { filter: { parentId: { $in: [projectId] } } } },
    skip: !projectId,
  });

  const { data: documentsData, refetch: refetchDocuments } = useQuery(GET_DOCUMENTS, {
    variables: { input: { filter: { folderId: { $in: [folderId] } } } },
    skip: !folderId,
  });

  const [createFolder] = useMutation(CREATE_FOLDER);
  const [deleteDocument, { loading: deleting }] = useMutation(DELETE_DOCUMENT);
  const [updateDocument, { loading: updating }] = useMutation(UPDATE_DOCUMENT);

  useEffect(() => {
    if (!foldersData) return;
    const folders = foldersData.getFolders;
    if (folders.length > 0) {
      setFolderId(folders[0].id);
    } else if (projectId && companyId) {
      createFolder({
        variables: {
          input: {
            name: 'Documents',
            parentId: projectId,
            type: ParentTypes.Business,
          },
        },
      }).then(res => {
        if (res.data?.createFolder.id) {
          setFolderId(res.data.createFolder.id);
        }
      }).catch(() => {
        toast('Failed to initialize documents folder.', 'error');
      });
    }
  }, [foldersData, projectId, companyId, createFolder]);

  const documents = documentsData?.getDocuments ?? [];
  const editingDoc =
    popoverTarget && typeof popoverTarget === 'object'
      ? (documents.find(d => d.id === popoverTarget.docId) ?? null)
      : null;

  const closePopover = () => setPopoverTarget(null);

  const handleSubmit = async (data: { name: string; file?: File; embedUrl?: string }) => {
    if (!folderId) return;

    if (editingDoc) {
      try {
        await updateDocument({
          variables: {
            input: {
              id: editingDoc.id,
              updateData: {
                name: data.name,
                ...(data.embedUrl !== undefined ? { link: data.embedUrl } : {}),
              },
            },
          },
        });
        await refetchDocuments();
        toast('Document updated!');
        closePopover();
      } catch {
        toast('Failed to update document.', 'error');
      }
      return;
    }

    setUploading(true);
    try {
      if (data.file) {
        await uploadDocumentMultipart(folderId, data.name, data.file);
      } else if (data.embedUrl) {
        const blob = new Blob([data.embedUrl], { type: 'text/plain' });
        const placeholderFile = new File([blob], data.name + '.txt', { type: 'text/plain' });
        const created = await uploadDocumentMultipart(folderId, data.name, placeholderFile);
        await updateDocument({
          variables: {
            input: { id: created.id, updateData: { link: data.embedUrl } },
          },
        });
      }
      await refetchDocuments();
      toast('Document added!');
      closePopover();
    } catch {
      toast('Failed to add document.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteDocument({ variables: { id: deleteTarget } });
      await refetchDocuments();
      toast('Document deleted!');
      closePopover();
    } catch {
      toast('Failed to delete document.', 'error');
    } finally {
      setDeleteTarget(null);
    }
  };

  if (documents.length === 0 && !canEdit) return null;

  return (
    <>
      <div className={'flex items-center justify-between mb-6'}>
        <Title size={'xs'} level={2}>Documents</Title>
        {documents.length > 0 && canEdit && (
          <div ref={addContainerRef} className={'relative'}>
            <Button
              visualType={'quaternary'}
              onClick={() => setPopoverTarget(t => (t === 'add-button' ? null : 'add-button'))}
            >
              <Icon name={'plus'} />
              Add document
            </Button>
            {popoverTarget === 'add-button' && (
              <DocumentPopover
                className={'top-full right-0 left-auto'}
                editDoc={null}
                containerRef={addContainerRef}
                onClose={closePopover}
                onSubmit={handleSubmit}
                loading={uploading}
              />
            )}
          </div>
        )}
      </div>

      {documents.length === 0 && canEdit && (
        <div ref={emptyContainerRef} className={'relative max-w-110'}>
          <ButtonBorderDash
            className={'min-h-74.5'}
            onClick={() => setPopoverTarget(t => (t === 'add-button' ? null : 'add-button'))}
          >
            Add document
          </ButtonBorderDash>
          {popoverTarget === 'add-button' && (
            <DocumentPopover
              editDoc={null}
              containerRef={emptyContainerRef}
              onClose={closePopover}
              onSubmit={handleSubmit}
              loading={uploading}
            />
          )}
        </div>
      )}

      {documents.length > 0 && (
        <div className={'grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}>
          {documents.map(doc => (
            <div
              key={doc.id}
              ref={el => { docContainerRefs.current[doc.id] = el; }}
              className={'relative'}
            >
              <DocumentCard
                doc={doc}
                onEdit={() => setPopoverTarget(t => typeof t === 'object' && t?.docId === doc.id ? null : { docId: doc.id })}
                onDelete={() => setDeleteTarget(doc.id)}
                canEdit={canEdit}
              />
              {typeof popoverTarget === 'object' && popoverTarget?.docId === doc.id && (
                <DocumentPopover
                  editDoc={doc}
                  containerRef={{ current: docContainerRefs.current[doc.id] }}
                  onClose={closePopover}
                  onSubmit={handleSubmit}
                  loading={updating}
                />
              )}
            </div>
          ))}
        </div>
      )}
      <ConfirmModal
        isOpen={!!deleteTarget}
        description={'This action cannot be undone.'}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
};

export default DocumentsSection;