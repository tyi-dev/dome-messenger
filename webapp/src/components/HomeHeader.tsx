import LogoImage from '@shared/src/images/logo.svg?react';
import { User } from '@shared/types/user';
import { Button } from './ui/button.tsx';
import { LuSettings, LuUser } from 'react-icons/lu';
import Spinner from '@webapp/src/components/Spinner.tsx';

type buttonDataSetType = {
   icon?: JSX.Element;
   title: string;
   onButtonClick?: () => void;
};

export default function HomeSidebar(props: { user: User }) {
   const { user } = props;
   function SideBarButton({ icon, title, onButtonClick }: buttonDataSetType) {
      return (
         <Button
            className="w-full flex flex-row gap-1 justify-start rounded-none py-4 mb-[1px] border-none"
            variant="outline"
            onClick={onButtonClick}
         >
            {icon}
            <div className="w-full">{title}</div>
         </Button>
      );
   }

   const buttonsSet: buttonDataSetType[] = [
      {
         icon: <LuUser className="w-7 h-7" />,
         title: `${user.firstName} ${user.lastName}`,
      },
      {
         icon: <LuSettings className="w-7 h-7" />,
         title: 'Settings',
      },
   ];

   return (
      <div className="flex flex-col w-52">
         <LogoImage className="mx-auto my-8" />
         {buttonsSet.map((item, index) => (
            <SideBarButton {...item} key={index} />
         ))}
      </div>
   );
}
