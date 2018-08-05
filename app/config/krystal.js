module.exports = {
	defaults: {
		prefix: "o!"
	},
	bot: {
        token: "NDI5NjMxNjI1ODQwNjg5MTUy.DkdIdQ.1DpzSVQlpla-ZIpjA8PByZZOkNs",
        plugins: [
            'CorePlugin',
            'TestPlugin'
        ]
	},
	db: {
        url: "mongodb://krystal:krystalbot1@ds263161.mlab.com:63161/krystal"
	}
};
