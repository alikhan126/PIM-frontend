import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '', title: 'Views', icon: 'ft-layout', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/products/view', title: 'Products', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/brands/view', title: 'Brands', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/categories/view', title: 'Categories', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/websites/view', title: 'Websites', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/tags/view', title: 'Tags', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/manufacturer/view', title: 'Manufacturer', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    {
        path: '', title: 'Edits', icon: 'ft-layout', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '', title: 'Products', icon: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, 
            submenu: [
                { path: '/products', title: 'Edit Products', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/products/import', title: 'Import Products', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            ]},
            { path: '/brands', title: 'Brands', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/categories', title: 'Categories', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/websites', title: 'Websites', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/tags', title: 'Tags', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/manufacturer', title: 'Manufacturer', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '', title: 'Roles', icon: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, 
            submenu: [
                { path: '/roles', title: 'Permission', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/fields/product', title: 'Product Fields', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/fields/brand', title: 'Brand Fields', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/fields/category', title: 'Category Fields', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/fields/manufacturer', title: 'Manufacturer Fields', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/fields/catalog', title: 'Catalog Fields', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/fields/tag', title: 'Tag Fields', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/fields/adapter', title: 'Adapter Fields', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/fields/website', title: 'Website Fields', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            ]},
        ]
    }
];
