import SwapImage from '@shared/src/images/switch-modes-icon.svg?react';
import { Button } from '@webapp/src/components/ui/button';

export default function SwitchModesButton(props: { callback: () => void }) {
   return (
      <Button className="w-10 h-10 p-0" variant="outline" onClick={props.callback}>
         <SwapImage className="w-5 h-5" />
      </Button>
   );
}
