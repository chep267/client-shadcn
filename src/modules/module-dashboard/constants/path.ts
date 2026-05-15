/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const DashboardApiPath = {
    root: '/app',
    tickets: '/tickets',
    ticket: '/ticket',
    ticketStatus: '/ticket-status',
} as const;

export const DashboardRouterPath = {
    root: '/dashboard/*',
    home: '/dashboard',
    ageCalculator: '/age-calculator',
} as const;
