import { Link, usePage } from '@inertiajs/react';
import {
    Bell,
    CalendarDays,
    FileText,
    FolderGit2,
    LayoutGrid,
    ScrollText,
    Shuffle,
    Users,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

type SidebarNavItem = NavItem & {
    allowedRoles?: string[];
};

const mainNavItems: SidebarNavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Notifications',
        href: '/notifications',
        icon: Bell,
    },
    {
        title: 'PDL Profiles',
        href: '/pdl-profiles',
        icon: Users,
    },
    {
        title: 'Sentence Tracker',
        href: '/sentence-tracker',
        icon: ScrollText,
    },
    {
        title: 'Transfers',
        href: '/transfers',
        icon: Shuffle,
    },
    {
        title: 'Court Calendar',
        href: '/court-calendar',
        icon: CalendarDays,
    },
    {
        title: 'Reports',
        href: '/reports',
        icon: FileText,
    },
    {
        title: 'Backup Tools',
        href: '/backup-tools',
        icon: FolderGit2,
        allowedRoles: ['superadmin'],
    },
];

export function AppSidebar() {
    const page = usePage<{
        auth?: {
            roles?: string[];
        };
    }>();
    const roles = page.props.auth?.roles ?? [];
    const visibleNavItems = mainNavItems.filter((item) => {
        if (! item.allowedRoles || item.allowedRoles.length === 0) {
            return true;
        }

        return item.allowedRoles.some((role) => roles.includes(role));
    });

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={visibleNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
