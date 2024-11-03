<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatDate(date: number) {
		return new Date(date).toLocaleDateString('de-DE', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		});
	}

	function formatAmount(amount: number) {
		return new Intl.NumberFormat('de-DE', {
			style: 'currency',
			currency: 'EUR'
		}).format(amount / 100);
	}
</script>

<table class="table-auto">
	<thead>
		<tr class="bg-gray-300">
			<th class="px-4 text-left py-2">Label</th>
			<th class="text-right px-4 py-2">Amount</th>
			<th class="text-right px-4 py-2">Date</th>
		</tr>
	</thead>
	<tbody>
		{#each data.transactions as transaction}
			<tr class="even:bg-gray-100 hover:bg-gray-200">
				<td class="px-4 py-2">{transaction.label}</td>
				<td class="text-right px-4 py-2">{formatAmount(transaction.amount)}</td>
				<td class="text-right px-4 py-2">{formatDate(transaction.date)}</td>
			</tr>
		{/each}
	</tbody>
</table>
