import { Avatar, AvatarFallback, AvatarImage } from '@webapp/src/components/ui/avatar';

export default function ChatIcon({ init1, init2, avatarURL }: { init1: string; init2?: string; avatarURL?: string }) {
   return (
      <Avatar>
         {avatarURL ? <AvatarImage src={avatarURL} /> : null}
         <AvatarFallback>{`${init1[0]}${init2 ? init2[0] : null}`}</AvatarFallback>
      </Avatar>
   );
}
