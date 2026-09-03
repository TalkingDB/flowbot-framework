import { Dispatch, SetStateAction, ReactNode } from 'react';

export interface HeaderProps {
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export interface SidebarProps {
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export interface AdminLayoutProps {
    children: ReactNode;
}