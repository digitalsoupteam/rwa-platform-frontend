import React, { FC, HTMLAttributes } from 'react';

import PlusSVG from '../../../../public/icons/plus.svg';
import BellSVG from '../../../../public/icons/bell.svg';
import BurgerSVG from '../../../../public/icons/burger.svg';
import PersonSVG from '../../../../public/icons/person.svg';
import LogoutSVG from '../../../../public/icons/logout.svg';
import EditSVG from '../../../../public/icons/edit.svg';
import TickSVG from '../../../../public/icons/tick.svg';
import TrashSVG from '../../../../public/icons/trash.svg';

const ICONS = {
  plus: PlusSVG,
  bell: BellSVG,
  burger: BurgerSVG,
  person: PersonSVG,
  logout: LogoutSVG,
  edit: EditSVG,
  tick: TickSVG,
  trash: TrashSVG,
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
