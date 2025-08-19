import { Button, Card, Socials, Title } from '@/components/ui';

export default function Home() {
  return (
    <>
      <section className={'p-4'}>
        <div className={'text-white bg-grey-dark p-4 rounded-md'}>
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
        <div className={'text-white bg-grey-dark p-4 rounded-md'}>
          <Title className={'mb-2'} size={'xl'} level={1}>
            Title
          </Title>
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
      </section>
      <section className={'p-4'}>
        <div className={'bg-grey-dark p-4 rounded-md'}>
          <Title className={'mb-2 text-white'} size={'xl'} level={1}>
            Socials
          </Title>
          <Socials />
        </div>
      </section>
      <section className={'p-4'}>
        <div className={'bg-grey-dark p-4 rounded-md'}>
          <Title className={'mb-2 text-white'} size={'xl'} level={1}>
            Cards
          </Title>
          <Title className={'mb-2 text-white'} size={'md'} level={3}>
            Sizes
          </Title>
          <div className={'flex flex-wrap gap-2 items-start mb-4'}>
            <Card size={'xl'}>
              padding 24 / border-radius 24 <br /> md: padding 40 / border-radius 40
            </Card>
            <Card size={'lg'}>
              padding 24 / border-radius 24 <br /> md: padding 32 / border-radius 40
            </Card>
            <Card size={'md'}>
              padding 24 / border-radius 24 <br /> md: padding 24 / border-radius 40
            </Card>
            <Card size={'sm'}>padding 24 / border-radius 24</Card>
            <Card size={'xs'}>padding 16 / border-radius 20</Card>
          </div>
          <Title className={'mb-2 text-white'} size={'md'} level={3}>
            Colors
          </Title>
          <div className={'flex flex-wrap gap-2 items-start mb-4'}>
            <Card className={'!bg-grey flex gap-4'}>
              <Card size={'md'} color={'white'}>
                white
              </Card>
              <Card size={'md'} color={'greyLight'}>
                light-grey
              </Card>
              <Card size={'md'} color={'blueDim'}>
                dim-blue
              </Card>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
