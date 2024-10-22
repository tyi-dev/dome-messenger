import LogoImage from '@shared/src/images/logo.svg?react';
/*import { UserDialog } from '@webapp/src/components/home-sidebar/UserDialog';
import NewConversationDialog from '@webapp/src/components/home-sidebar/NewConversationDialog.tsx';*/
/*import { useTheme } from '@webapp/src/components/theme/Theme';*/
import {
   Sidebar,
   SidebarContent,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   useSidebar,
} from '@webapp/src/components/ui/sidebar';

export default function HomeSidebar() {
   /*   const { changeTheme } = useTheme();*/
   const { toggleSidebar } = useSidebar();

   /*   const items = [
      {
         title: 'User',
         url: '#',
         icon: LuUser,
      },
      {
         title: 'NewConvo',
         url: '#',
         icon: LuPlus,
      },
   ];*/

   return (
      <Sidebar collapsible="icon">
         <SidebarContent>
            <SidebarGroup>
               <SidebarGroupLabel className="text-general-dark">Aegis</SidebarGroupLabel>
               <SidebarGroupContent>
                  <SidebarMenu>
                     <SidebarMenuItem className="flex justify-start">
                        <SidebarMenuButton asChild>
                           <LogoImage className="text-general-dark w-16" onClick={toggleSidebar} />
                        </SidebarMenuButton>
                     </SidebarMenuItem>
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
         </SidebarContent>
      </Sidebar>
   );
}
