import { Button, Title } from '@/components/ui';

export default function Home() {
  return (
    <>
      <section className={'p-4'}>
        <div className={'bg-grey-dark p-4 text-white rounded-md'}>
          <Title className={'mb-2'} size={'xl'} level={1}>
            Buttons
          </Title>
          <div className={'flex flex-wrap gap-5'}>
            <div className={'flex flex-col gap-2 items-start'}>
              <Title className={'mb-2'} size={'md'} level={3}>
                Primary
              </Title>
              <Button visualType={'primary'}>Primary normal</Button>
              <Button visualType={'primary'} disabled={true}>
                Primary disabled
              </Button>
            </div>
            <div className={'flex flex-col gap-2 items-start'}>
              <Title className={'mb-2'} size={'md'} level={3}>
                Secondary
              </Title>
              <Button visualType={'secondary'}>Secondary normal</Button>
              <Button visualType={'secondary'} disabled={true}>
                Secondary disabled
              </Button>
            </div>
            <div className={'flex flex-col gap-2 items-start'}>
              <Title className={'mb-2'} size={'md'} level={3}>
                Secondary
              </Title>
              <Button visualType={'tertiary'}>Tertiary normal</Button>
              <Button visualType={'tertiary'} disabled={true}>
                Tertiary disabled
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className={'p-4'}>
        <div className={'bg-grey-dark p-4 text-white rounded-md'}>
          <Title className={'mb-2'} size={'xl'} level={1}>
            Title
          </Title>
          <div className={'flex flex-wrap gap-5'}>
            <div className={'flex flex-col gap-2 items-start'}>
              <Title className={'mb-2'} size={'sm'} level={3}>
                sm - H4 Heading
              </Title>
              <Title className={'mb-2'} size={'md'} level={3}>
                md - H5/H3 Heading
              </Title>
              <Title className={'mb-2'} size={'lg'} level={3}>
                lg - H3/H2 Heading
              </Title>
              <Title className={'mb-2'} size={'xl'} level={3}>
                xl - H1 Heading
              </Title>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
