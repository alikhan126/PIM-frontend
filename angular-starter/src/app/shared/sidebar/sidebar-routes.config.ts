import { RouteInfo } from './sidebar.metadata';

export const ADMIN_ROUTES: RouteInfo[] = [
    {
        path: '', title: 'Views', icon: 'ft-layout', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/products/view', title: 'Products', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/brands/view', title: 'Brands', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/categories/view', title: 'Categories', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/websites/view', title: 'Websites', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/tags/view', title: 'Tags', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/manufacturer/view', title: 'Manufacturer', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/catalogs/view', title: 'Catalogs', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    {
        path: '', title: 'Edits', icon: 'ft-layout', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '', title: 'Products', icon: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, 
            submenu: [
                { path: '/products', title: 'Edit Products', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/products/import', title: 'Import Products', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/products/export', title: 'Export Products', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

            ]},

            { path: '', title: 'Brands', icon: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, 
            submenu: [
                { path: '/brands', title: 'Approved', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/brands/unapproved', title: 'Unapproved', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

            ] },

            { path: '', title: 'Categories', icon: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
               { path: '/categories', title: 'Approved', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
               { path: '/categories/unapproved', title: 'Unapproved', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

            ] },

            { path: '', title: 'Websites', icon: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
                { path: '/websites', title: 'Approved', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/websites/unapproved', title: 'Unapproved', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

            ] },
            { path: '', title: 'Tags', icon: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
                { path: '/tags', title: 'Approved', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/tags/unapproved', title: 'Unapproved', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

            ] },

            { path: '', title: 'Manufacturer', icon: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
                { path: '/manufacturer', title: 'Approved', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/manufacturer', title: 'Unapproved', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

            ] },
            { path: '/catalogs', title: 'Catalogs', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    { 
        path: '', title: 'Roles', icon: 'ft-layout', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, 
        submenu: [
            { path: '', title: 'Roles', icon: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, 
            submenu: [
                { path: '/role', title: 'Roles', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/assignroles', title: 'Assign Roles', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },  
            ]},
            { path: '/permissions', title: 'Permission', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/fields/product', title: 'Product Fields', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/fields/brand', title: 'Brand Fields', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/fields/category', title: 'Category Fields', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/fields/manufacturer', title: 'Manufacturer Fields', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/fields/catalog', title: 'Catalog Fields', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/fields/tag', title: 'Tag Fields', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/fields/adapter', title: 'Adapter Fields', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/fields/website', title: 'Website Fields', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    }
];

export const USER_ROUTES: RouteInfo[] = [
    {
        path: '', title: 'Views', icon: 'ft-layout', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/products/view', title: 'Products', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/brands/view', title: 'Brands', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/categories/view', title: 'Categories', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/websites/view', title: 'Websites', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/tags/view', title: 'Tags', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/manufacturer/view', title: 'Manufacturer', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/catalogs/view', title: 'Catalogs', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    {
        path: '', title: 'Edits', icon: 'ft-layout', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '', title: 'Products', icon: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, 
            submenu: [
                { path: '/products', title: 'Edit Products', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/products/import', title: 'Import Products', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/products/export', title: 'Export Products', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

            ]},
            { path: '', title: 'Brands', icon: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, 
            submenu: [
                { path: '/brands', title: 'Approved', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/brands/unapproved', title: 'Unapproved', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

            ] },

            { path: '', title: 'Categories', icon: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
               { path: '/categories', title: 'Approved', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
               { path: '/categories/unapproved', title: 'Unapproved', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

            ] },

            { path: '', title: 'Websites', icon: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
                { path: '/websites', title: 'Approved', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/websites/unapproved', title: 'Unapproved', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

            ] },
            { path: '', title: 'Tags', icon: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
                { path: '/tags', title: 'Approved', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/tags/unapproved', title: 'Unapproved', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

            ] },

            { path: '', title: 'Manufacturer', icon: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
                { path: '/manufacturer', title: 'Approved', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/manufacturer', title: 'Unapproved', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

            ] },
            { path: '/catalogs', title: 'Catalogs', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    }
];
