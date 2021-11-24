<template>
	<div class="columns is-centered">
		<div class="column is-narrow">
			<b-tooltip label="Europe">
				<div
					class="box cursor-pointer"
					:class="getClass('region', 'eu')"
					@click="$emit('click', 'eu')">
					<img
						src="/images/flags/eu.png"
						alt="eu">
				</div>
			</b-tooltip>
		</div>
		<div class="column is-narrow">
			<b-tooltip label="Not available yet">
				<div
					class="box cursor-pointer"
					:class="getClass('region', 'cis')"
					@click="$emit('click', 'cis')">
					<img
						src="/images/flags/cc.png"
						alt="cis">
				</div>
			</b-tooltip>
		</div>
		<div class="column is-narrow">
			<b-tooltip label="Not available yet">
				<div
					class="box not-available"
					:class="getClass('region', 'us')"
					@click="$emit('click', 'us')">
					<img
						src="/images/flags/us.png"
						alt="us">
				</div>
			</b-tooltip>
		</div>
	</div>
</template>