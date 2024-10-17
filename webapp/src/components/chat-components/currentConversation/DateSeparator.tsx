import { format } from 'date-fns';

export default function DateSeparator({ date }: { date: string }) {
   return (
      <div className="rounded-xl px-4 py-2 text-general-dark text-sm font-semibold flex mx-auto bg-general-dark/[0.3]">
         {format(date, 'dd MMM yyyy')}
      </div>
   );
}
