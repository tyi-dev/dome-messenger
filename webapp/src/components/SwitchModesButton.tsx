import SwapImage from '@shared/src/images/switch-modes-icon.svg?react';
import { Button } from '@webapp/src/components/ui/button';

export default function SwitchModesButton({ callback }: { callback: () => void }) {
   return (
      <Button className="w-10 h-10 p-0 bg-general-dark" onClick={callback}>
         <SwapImage className="w-5 h-5 text-general-light" />
      </Button>
   );
}
