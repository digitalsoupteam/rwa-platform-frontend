import React, { FC, HTMLAttributes } from 'react';

import PlusSVG from '../../../public/icons/plus.svg';
import BellSVG from '../../../public/icons/bell.svg';
import BurgerSVG from '../../../public/icons/burger.svg';
import PersonSVG from '../../../public/icons/person.svg';
import LogoutSVG from '../../../public/icons/logout.svg';
import EditSVG from '../../../public/icons/edit.svg';
import TickSVG from '../../../public/icons/tick.svg';
import TrashSVG from '../../../public/icons/trash.svg';
import ShareSVG from '../../../public/icons/share.svg';
import InfoSVG from '../../../public/icons/info.svg';
import USDTSVG from '../../../public/icons/usdt.svg';
import TriangleSVG from '../../../public/icons/triangle.svg';
import CheckSVG from '../../../public/icons/check.svg';
import ChartSVG from '../../../public/icons/chart.svg';
import ChartSquaredSVG from '../../../public/icons/chart-squared.svg';
import CoinsSVG from '../../../public/icons/coins.svg';
import FinishSVG from '../../../public/icons/finish.svg';
import FlashSVG from '../../../public/icons/flash.svg';
import GiftSVG from '../../../public/icons/gift.svg';
import HandCoinsSVG from '../../../public/icons/hand-coins.svg';
import HandSVG from '../../../public/icons/hand.svg';
import JudgeHammerSVG from '../../../public/icons/judge-hammer.svg';
import PercentSVG from '../../../public/icons/percent.svg';
import PlusTightSVG from '../../../public/icons/plus-tight.svg';
import ProvenSVG from '../../../public/icons/proven.svg';
import RocketSVG from '../../../public/icons/rocket.svg';
import SparklesSVG from '../../../public/icons/sparkles.svg';
import StarSVG from '../../../public/icons/star.svg';
import TickSquaredSVG from '../../../public/icons/tick-squared.svg';
import WalletSVG from '../../../public/icons/wallet.svg';
import ArrowUpSVG from '../../../public/icons/arrow-up.svg';
import ArrowDownSVG from '../../../public/icons/arrow-down.svg';
import TimeSVG from '../../../public/icons/time.svg';
import InProgressSVG from '../../../public/icons/in-progress.svg';
import CompletedSVG from '../../../public/icons/completed.svg';
import FailedSVG from '../../../public/icons/failed.svg';
import DocumentSVG from '../../../public/icons/document.svg';
import ExternalLinkSVG from '../../../public/icons/external-link.svg';
import CopySVG from '../../../public/icons/copy.svg';

const ICONS = {
  plus: PlusSVG,
  bell: BellSVG,
  burger: BurgerSVG,
  person: PersonSVG,
  logout: LogoutSVG,
  edit: EditSVG,
  tick: TickSVG,
  trash: TrashSVG,
  share: ShareSVG,
  info: InfoSVG,
  usdt: USDTSVG,
  triangle: TriangleSVG,
  check: CheckSVG,
  time: TimeSVG,
  inProgress: InProgressSVG,
  completed: CompletedSVG,
  failed: FailedSVG,
  document: DocumentSVG,
  chart: ChartSVG,
  chartSquared: ChartSquaredSVG,
  coins: CoinsSVG,
  finish: FinishSVG,
  flash: FlashSVG,
  gift: GiftSVG,
  handCoins: HandCoinsSVG,
  hand: HandSVG,
  judgeHammer: JudgeHammerSVG,
  percent: PercentSVG,
  plusTight: PlusTightSVG,
  proven: ProvenSVG,
  rocket: RocketSVG,
  sparkles: SparklesSVG,
  star: StarSVG,
  tickSquared: TickSquaredSVG,
  wallet: WalletSVG,
  arrowUp: ArrowUpSVG,
  arrowDown: ArrowDownSVG,
  externalLink: ExternalLinkSVG,
  copy: CopySVG,
} as const;

export type IconType = keyof typeof ICONS;

interface IconProps extends HTMLAttributes<SVGAElement> {
  name: IconType;
}

const Icon: FC<IconProps> = ({ name, className }) => {
  const IconComponent = ICONS[name];

  return <IconComponent className={className} />;
};

export default Icon;
