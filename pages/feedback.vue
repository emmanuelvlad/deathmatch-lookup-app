<template>
	<section class="section container">
		<div class="columns is-multiline is-centered">
			<div class="column is-12 has-text-centered">
				<h1 class="title has-text-grey-lighter">Feedback</h1>
			</div>

			<div class="column is-6">
				<form
					class="columns is-multiline form"
					netlify
					netlify-honeypot="bot-field"
					action="/"
					name="feedback"
					method="POST"
					@submit.prevent="submitForm">
					<input
						type="hidden"
						name="form-name"
						value="feedback">
					<p class="is-hidden">
						<label>Don’t fill this out if you're human: <input name="bot-field"></label>
					</p>
					<div class="column is-12">
						<b-field label="Message">
							<b-input
								v-model="messageText"
								maxlength="400"
								name="message"
								type="textarea"></b-input>
						</b-field>
					</div>
					<div class="column is-12">
						<p>Please provide enough information (region, filters, options...) 🙏</p>
					</div>
					<div class="column">
						<b-button
							:type="{ 'is-success': formSent, 'is-primary': !formSent }"
							:disabled="formSent"
							native-type="submit">
							{{ formSent ? "Feedback sent!" : "Send feedback" }}
						</b-button>
					</div>
				</form>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			messageText: "",
			isLoading: false,
			formSent: false,
			error: null,
		};
	},

	methods: {
		encode(data) {
			return Object.keys(data)
				.map(
					key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
				)
				.join("&");
		},
		async submitForm(e) {
			if (this.messageText.trim().length < 8) {
				return this.$buefy.toast.open({
					duration: 5000,
					message: "The message should be at least 8 characters long.",
					position: "is-bottom",
					type: "is-danger",
				});
			}
			this.isLoading = true;
			try {
				await this.$axios.post("https://dm.evlad.me/", this.encode({
					"form-name": e.target.getAttribute("name"),
					message: this.messageText,
				}), { header: { "Content-Type": "application/x-www-form-urlencoded" } });

				this.formSent = true;
				this.$buefy.toast.open({
					duration: 5000,
					message: "Feedback sent, thank you!",
					position: "is-bottom",
					type: "is-success",
				});
				this.messageText = "";
			} catch (_) {
				this.$buefy.toast.open({
					duration: 5000,
					message: "Error occured",
					position: "is-bottom",
					type: "is-danger",
				});
			} finally {
				this.isLoading = false;
			}
		},
	},

	head: {
		title: "Feedback",
	},
};
</script>
