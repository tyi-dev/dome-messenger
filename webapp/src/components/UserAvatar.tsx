import { Avatar, AvatarFallback, AvatarImage } from '@webapp/src/components/ui/avatar';
import { twMerge } from 'tailwind-merge';

export default function UserAvatar({
   firstWord,
   secondWord,
   avatarURL,
   className,
}: {
   firstWord: string;
   secondWord?: string;
   avatarURL?: string;
   className?: string;
}) {
   const generateHSL = () => {
      const hue =
         ((firstWord.charCodeAt(0) + firstWord.charCodeAt(1) + firstWord.charCodeAt(2) + firstWord.charCodeAt(3)) * 4) %
         360;
      const saturation = secondWord
         ? secondWord.charCodeAt(0) +
           secondWord.charCodeAt(1) +
           secondWord.charCodeAt(2) +
           ((secondWord.charCodeAt(3) * 5) % 100)
         : 50;
      const lightness = 70;

      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
   };

   return (
      <Avatar className={twMerge('shadow-sm shadow-general-dark rounded-full m-0.5', className)}>
         {avatarURL ? <AvatarImage src={avatarURL} /> : null}
         <AvatarFallback
            className="text-black bg-general-orange"
            style={{ backgroundColor: generateHSL() }}
         >{`${firstWord[0]}${secondWord ? secondWord[0] : ''}`}</AvatarFallback>
      </Avatar>
   );
}
