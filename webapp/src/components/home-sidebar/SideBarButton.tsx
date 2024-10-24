import { Button } from '@webapp/src/components/ui/button';

type buttonDataSetType = {
   icon?: JSX.Element;
   title: string;
   callback?: () => void;
};

export default function SideBarButton({ icon, title, callback }: buttonDataSetType) {
   return (
      <Button
         className="w-full flex flex-row gap-3 justify-start rounded-none p-3 bg-general-light border-none hover:bg-general-blue"
         onClick={callback}
      >
         {icon}
         <div className="w-full text-general-dark text-left">{title}</div>
      </Button>
   );
}
