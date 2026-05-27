'use client';

import React, { ChangeEvent, DragEvent, FC, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useMutation, useQuery } from '@apollo/client/react';
import { Button, ButtonBorderDash, Icon, Input, Title, toast } from '@/components/ui';
import { ConfirmModal } from '@/components/common';
import { ADD_MEMBER, GET_COMPANY, REMOVE_MEMBER } from '@/lib/company/operations';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  photoUrl?: string;
}

type Tab = 'upload' | 'embed';

const ALLOWED_MIME = ['image/png', 'image/jpeg', 'image/jpg'];
const IMAGE_URL_RE = /\.(jpe?g|png|gif|webp|svg)(\?.*)?$/i;

// ─── Popover ──────────────────────────────────────────────────────────────────

interface MemberPopoverProps {
  className?: string;
  editMember?: TeamMember | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onSubmit: (data: Omit<TeamMember, 'id'>) => void;
  loading?: boolean;
}

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

const MemberPopover: FC<MemberPopoverProps> = ({ className, editMember, containerRef, onClose, onSubmit, loading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [tab, setTab] = useState<Tab>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [embedError, setEmbedError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    if (editMember) {
      setName(editMember.name);
      setPosition(editMember.position ?? '');
      if (editMember.photoUrl?.startsWith('http')) {
        setTab('embed');
        setEmbedUrl(editMember.photoUrl);
      } else {
        setTab('upload');
        setFile(null);
      }
    }
  }, [editMember]);

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
    if (!ALLOWED_MIME.includes(f.type)) {
      setFile(null);
      setFileError('Only the following formats are allowed: .png .jpg .jpeg');
      return;
    }
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
      setNameError('Enter full name');
      return;
    }
    let photoUrl: string | undefined;
    if (tab === 'upload' && file) {
      photoUrl = URL.createObjectURL(file);
    } else if (tab === 'embed') {
      if (embedUrl.trim() && !IMAGE_URL_RE.test(embedUrl.trim())) {
        setEmbedError('The link does not lead to media content');
        return;
      }
      photoUrl = embedUrl.trim() || undefined;
    }
    onSubmit({ name: name.trim(), position: position.trim(), photoUrl });
  };

  return (
    <div
      className={clsx(
        'absolute top-1/3 left-1/3 z-50 mt-1 w-[328px] md:w-110 bg-white rounded-xl border border-stroke-primary shadow-[0_4px_24px_rgba(0,0,0,0.08)]',
        className
      )}
    >
      {/* Tabs */}
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
        {/* Upload tab */}
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
                  <span className={'text-xs text-blue'}>Successfully downloaded</span>
                </>
              ) : (
                <>
                  <FileIcon className={fileError ? 'text-red-bright' : 'text-label-tertiary'} />
                  <span className={clsx('text-sm font-medium', fileError ? 'text-red-bright' : 'text-grey-dark')}>
                    {fileError ? 'Error when uploading' : 'Choose a file'}
                  </span>
                  <span className={'text-xs text-label-tertiary'}>The maximum size per file is 5 MB</span>
                </>
              )}
            </div>
            {fileError && <p className={'text-xs text-red-bright mt-1.5'}>{fileError}</p>}
            <input ref={fileInputRef} type={'file'} accept={'.png,.jpg,.jpeg'} className={'hidden'} onChange={handleInputChange} />
          </div>
        )}

        {/* Embed link tab */}
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

        {/* Name */}
        <div className={'mb-2'}>
          <div className={'text-sm font-medium mb-1.5'}>
            {tab === 'embed' ? 'Full name' : 'Name'}<span className={'text-red-bright'}>*</span>
          </div>
          <Input
            placeholder={'Ivan Ivanov'}
            size={'sm'}
            colorScheme={'light'}
            errorMessage={nameError}
            value={name}
            onChange={e => { setName(e.target.value); if (e.target.value.trim()) setNameError(''); }}
          />
        </div>

        {/* Position */}
        <div className={'mb-3'}>
          <div className={'text-sm font-medium mb-1.5'}>Position</div>
          <Input
            placeholder={'CEO'}
            size={'sm'}
            colorScheme={'light'}
            value={position}
            onChange={e => setPosition(e.target.value)}
          />
        </div>

        <div className={'flex justify-end'}>
          <Button visualType={'quaternary'} type={'button'} onClick={handleSubmit} disabled={loading}>
            {editMember ? 'Update' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  );
};

// ─── Member card ─────────────────────────────────────────────────────────────

interface MemberCardProps {
  member: TeamMember;
  onEdit: () => void;
  onDelete: () => void;
  canEdit?: boolean;
}

const MemberCard: FC<MemberCardProps> = ({ member, onEdit, onDelete, canEdit }) => (
  <div className={'w-full flex flex-col gap-2 p-4 border-stroke-primary border-1 rounded-xl'}>
    <div className={'w-full aspect-[0.855] rounded-xl overflow-hidden bg-grey-light'}>
      {member.photoUrl ? (
        <img src={member.photoUrl} alt={member.name} className={'w-full h-full object-cover'} />
      ) : (
        <div
          className={'w-full h-full'}
          style={{
            backgroundImage: 'repeating-conic-gradient(#e5e7eb 0% 25%, #fff 0% 50%)',
            backgroundSize: '20px 20px',
          }}
        />
      )}
    </div>
    <div className={'flex gap-2 justify-between items-center'}>
      <div>
        <div className={'text-lg font-semibold leading-tight'}>{member.name}</div>
        {member.position && <div className={'text-base text-label-tertiary truncate mt-2'}>{member.position}</div>}
      </div>
      {canEdit && (
        <div className={'flex items-center gap-2 shrink-0'}>
          <button
            type={'button'}
            onClick={onEdit}
            className={
              'cursor-pointer flex items-center justify-center size-10.5 p-1 text-black bg-bg-tertiary rounded-[10px] tr-d-all'
            }
            aria-label={'Edit member'}
          >
            <Icon name={'edit'} className={'size-5'} />
          </button>
          <button
            type={'button'}
            onClick={onDelete}
            className={
              'cursor-pointer flex items-center justify-center size-10.5 p-1 text-black bg-bg-tertiary rounded-[10px] tr-d-all'
            }
            aria-label={'Delete member'}
          >
            <Icon name={'trash'} className={'size-5'} />
          </button>
        </div>
      )}
    </div>
  </div>
);

// ─── TeamSection ──────────────────────────────────────────────────────────────

type PopoverTarget = 'add-button' | { memberId: string } | null;

interface TeamSectionProps {
  companyId: string;
  canEdit?: boolean;
}

const TeamSection: FC<TeamSectionProps> = ({ companyId, canEdit = false }) => {
  const { data: companyData, refetch } = useQuery(GET_COMPANY, {
    variables: { id: companyId },
    skip: !companyId,
  });

  const [addMember, { loading: adding }] = useMutation(ADD_MEMBER);
  const [removeMember, { loading: removing }] = useMutation(REMOVE_MEMBER);

  // Local state extends backend members with position + photo (not yet in backend)
  const [localExtras, setLocalExtras] = useState<Record<string, { position: string; photoUrl?: string }>>({});

  const [popoverTarget, setPopoverTarget] = useState<PopoverTarget>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const addContainerRef = useRef<HTMLDivElement>(null);
  const emptyContainerRef = useRef<HTMLDivElement>(null);
  const memberContainerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const backendMembers = companyData?.getCompany.users ?? [];

  const members: TeamMember[] = backendMembers.map(u => ({
    id: u.id,
    name: u.name,
    position: localExtras[u.id]?.position ?? '',
    photoUrl: localExtras[u.id]?.photoUrl,
  }));

  const editingMember =
    popoverTarget && typeof popoverTarget === 'object'
      ? (members.find(m => m.id === popoverTarget.memberId) ?? null)
      : null;

  const closePopover = () => setPopoverTarget(null);

  const handleSubmit = async (data: Omit<TeamMember, 'id'>) => {
    if (editingMember) {
      setLocalExtras(prev => ({
        ...prev,
        [editingMember.id]: { position: data.position, photoUrl: data.photoUrl },
      }));
      toast('Team member updated!');
      closePopover();
      return;
    }

    try {
      await addMember({
        variables: {
          input: {
            companyId,
            userId: crypto.randomUUID(),
            name: data.name,
          },
        },
      });
      const { data: fresh } = await refetch();
      // Apply local extras to the newly created member (last in list)
      const newUsers = fresh?.getCompany.users ?? [];
      const newest = newUsers[newUsers.length - 1];
      if (newest) {
        setLocalExtras(prev => ({
          ...prev,
          [newest.id]: { position: data.position, photoUrl: data.photoUrl },
        }));
      }
      toast('Team member added!');
      closePopover();
    } catch {
      toast('Failed to add team member.', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await removeMember({ variables: { input: { id: deleteTarget, companyId } } });
      setLocalExtras(prev => { const next = { ...prev }; delete next[deleteTarget]; return next; });
      await refetch();
      toast('Team member removed!');
      closePopover();
    } catch {
      toast('Failed to remove team member.', 'error');
    } finally {
      setDeleteTarget(null);
    }
  };

  if (members.length === 0 && !canEdit) return null;

  return (
    <>
      <div className={'flex items-center justify-between mb-6'}>
        <Title size={'xs'} level={2}>Team</Title>
        {members.length > 0 && canEdit && (
          <div ref={addContainerRef} className={'relative'}>
            <Button
              visualType={'quaternary'}
              onClick={() => setPopoverTarget(t => (t === 'add-button' ? null : 'add-button'))}
            >
              <Icon name={'plus'} />
              Add team member
            </Button>
            {popoverTarget === 'add-button' && (
              <MemberPopover
                className={'top-full right-0 left-auto'}
                editMember={null}
                containerRef={addContainerRef}
                onClose={closePopover}
                onSubmit={handleSubmit}
                loading={adding}
              />
            )}
          </div>
        )}
      </div>

      {members.length === 0 && canEdit && (
        <div ref={emptyContainerRef} className={'relative max-w-110'}>
          <ButtonBorderDash
            className={'min-h-74.5'}
            onClick={() => setPopoverTarget(t => (t === 'add-button' ? null : 'add-button'))}
          >
            Add team member
          </ButtonBorderDash>
          {popoverTarget === 'add-button' && (
            <MemberPopover
              editMember={null}
              containerRef={emptyContainerRef}
              onClose={closePopover}
              onSubmit={handleSubmit}
              loading={adding}
            />
          )}
        </div>
      )}

      {members.length > 0 && (
        <div className={'grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}>
          {members.map(member => (
            <div
              key={member.id}
              ref={el => { memberContainerRefs.current[member.id] = el; }}
              className={'relative'}
            >
              <MemberCard
                member={member}
                onEdit={() => setPopoverTarget(t => typeof t === 'object' && t?.memberId === member.id ? null : { memberId: member.id })}
                onDelete={() => setDeleteTarget(member.id)}
                canEdit={canEdit}
              />
              {typeof popoverTarget === 'object' && popoverTarget?.memberId === member.id && (
                <MemberPopover
                  editMember={member}
                  containerRef={{ current: memberContainerRefs.current[member.id] }}
                  onClose={closePopover}
                  onSubmit={handleSubmit}
                  loading={removing}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteTarget}
        description={'This action cannot be undone.'}
        loading={removing}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
};

export default TeamSection;