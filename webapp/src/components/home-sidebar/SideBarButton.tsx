import { Button } from '@webapp/src/components/ui/button';

type buttonDataSetType = {
   icon?: JSX.Element;
   title: string;
};

export default function SideBarButton({ icon, title }: buttonDataSetType) {
   return (
      <Button
         className="w-full flex flex-row gap-1 justify-start rounded-none py-4 mb-[1px] border-none"
         variant="outline"
      >
         {icon}
         <div className="w-full">{title}</div>
      </Button>
   );
}
