<template>
	<b-tooltip
		type="is-light"
		class="columns"
		:label="variable[0].toUpperCase() + variable.slice(1)">
		<div class="column is-12">
			<div
				class="box cursor-pointer has-text-centered black-image option-box is-secondary"
				:class="getOptionClass()"
				@click="toggleOption">
				<div class="is-flex is-flex-direction-column is-fullheight">
					<div
						class="is-flex-1"
						style="white-space: nowrap;">
						<p class="title is-4">{{ this.title }}</p>
					</div>
					<div class="is-flex-1">
						<img :src="`/images/${this.image}`">
					</div>
				</div>
			</div>
		</div>
	</b-tooltip>
</template>

<script>
export default {
	props: {
		variable: {
			type: String,
			required: true,
			validator: (value) => ["all", "only", "none"].includes(value),
		},
		title: String,
		image: String,
	},
	methods: {
		toggleOption() {
			this.$emit("update:variable", this.variable === "none" ? "only" : this.variable === "only" ? "all" : "none");
		},
		getOptionClass() {
			return { "selected is-danger": this.variable === "none", "selected": this.variable === "only", "unselected": this.variable === "all" };
		},
	},
};
</script>

<style>
.option-box {
	height: 125px;
}
</style>
