<template>
	<div
		class="box cursor-pointer has-text-centered is-outlined"
		:title="title"
		:class="{ 'selected': selected === type, 'unselected': selected !== type && selected !== null}"
		@click="$emit('update:selected', type)">
		<p
			class="title"
			style="word-break: inherit; text-overflow: ellipsis; overflow: hidden;">
			{{ title }}
		</p>
		<img
			:src="image"
			:alt="title">
	</div>
</template>

<script>
export default {
	name: "TypeBox",
	props: {
		type: {
			type: String,
			required: true,
		},
		selected: [String, null],
		title: String,
		image: String,
	},
};
</script>
