import { Avatar, AvatarFallback, AvatarImage } from '@webapp/src/components/ui/avatar';

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
   return (
      <Avatar className={className}>
         {avatarURL ? <AvatarImage src={avatarURL} /> : null}
         <AvatarFallback className="text-black bg-general-orange">{`${firstWord[0]}${secondWord ? secondWord[0] : ''}`}</AvatarFallback>
      </Avatar>
   );
}
