<template>
	<div>
		<b-tooltip :label="disabled ? 'Not available yet' : label">
			<span
				v-if="disabled"
				title="Badge top right"
				class="badge is-bottom is-danger navbar-badge">disabled</span>
			<span
				v-if="isNew"
				title="Badge top right"
				class="badge is-top-right is-success navbar-badge">new</span>
			<div
				class="box is-region"
				:class="{ 'selected': selected === region, 'unselected': selected !== region && selected !== null, 'not-available': disabled, 'cursor-pointer': !disabled }"
				@click="!disabled ? $emit('update:selected', region) : null">
				<img
					:src="`/images/flags/regions/${region}.png`"
					:alt="label">
			</div>
		</b-tooltip>
		<!-- <p class="m-top-1 has-text-grey">{{ label }}</p> -->
	</div>
</template>

<script>
export default {
	name: "RegionBox",
	props: {
		region: {
			type: String,
			required: true,
		},
		selected: [String, null],
		label: String,
		isNew: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style>
.is-region {
	min-width: 72px;
	min-height: 65px;
}

.not-available {
	cursor: not-allowed;
}
</style>