import { Button } from '@/components/ui';

export default function Home() {
  return (
    <>
      <section className={'p-4'}>
        <div className={'bg-grey-dark p-4 text-white rounded-md'}>
          Buttons
          <div className={'flex flex-wrap gap-5'}>
            <div className={'flex flex-col gap-2 items-start'}>
              <div>Primary button</div>
              <Button visualType={'primary'}>Start trading</Button>
              <Button visualType={'primary'} disabled={true}>
                Primary disabled
              </Button>
            </div>
            <div className={'flex flex-col gap-2 items-start'}>
              <div>Secondary button</div>
              <Button visualType={'secondary'}>Secondary normal</Button>
              <Button visualType={'secondary'} disabled={true}>
                Secondary disabled
              </Button>
            </div>
            <div className={'flex flex-col gap-2 items-start'}>
              <div>Tertiary button</div>
              <Button visualType={'tertiary'}>Tertiary normal</Button>
              <Button visualType={'tertiary'} disabled={true}>
                Tertiary disabled
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
