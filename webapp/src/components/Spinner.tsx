import { twMerge } from 'tailwind-merge';

export default function Spinner(props: { spinnerClassName?: string; containerClassName?: string }) {
   const { spinnerClassName, containerClassName } = props;
   return (
      <div className={twMerge('w-full h-full flex items-center justify-center', containerClassName)}>
         <div
            className={twMerge(
               'w-8 h-8 border-4 border-general-light border-t-0 rounded-full animate-ping',
               spinnerClassName,
            )}
         />
      </div>
   );
}
