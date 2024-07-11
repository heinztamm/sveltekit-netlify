import { redirect, type Actions, type Cookies } from '@sveltejs/kit';
import type { Result } from '$lib/types/types';
import { GetQuery } from '$lib/utils/queryfunc';
import { userDetailsQuery } from '$lib/queries/name.ts'
import { auditAmount } from '$lib/queries/audits.ts';
import { XpQuery } from '$lib/queries/xp';

const url = 'https://01.kood.tech/api/graphql-engine/v1/graphql';

export async function load({ cookies }: { cookies: Cookies }) {
	const token = cookies.get('token');
	if (!token) throw redirect(303, '/');

	const result: Result = {
		user: null,
		auditRatio: 0,
		auditSumUp: 0,
		auditSumDown: 0,
		totalXP: 0,
		XP_Transfers: [],
	};

	try {
		const data = await GetQuery(url, token, userDetailsQuery);
		const upAudits = await GetQuery(url, token, auditAmount('up'));
		const downAudits = await GetQuery(url, token, auditAmount('down'));
		const projectsAndXp = await GetQuery(url, token, XpQuery);

			const user = data.data.user[0];
			const name = `${user.firstName} ${user.lastName}`;

			result.user = { name, auditRatio: user.auditRatio}; // Properly initialize the user object with the name property
			result.auditSumUp = upAudits.data.transaction_aggregate.aggregate.sum.amount;
			result.auditSumDown = downAudits.data.transaction_aggregate.aggregate.sum.amount;
			result.totalXP = projectsAndXp.data.transaction_aggregate.aggregate.sum.amount;
			result.XP_Transfers = projectsAndXp.data.transaction;
			return result;
	} catch (error) {
		console.error('Error fetching user data:', error);
		throw redirect(303, '/');
	}
}

export const actions: Actions = {
	logout: async ({ cookies }) => {
		cookies.delete('token', { path: '/'});
		throw redirect(303, '/');
	}
};
