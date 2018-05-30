const settings = {
	options: {
		headers: {
			authorization: "Client-ID d957cd89bbfd69b"
		}
	},
	url: (d = 1, a = "hot", b = "top", c = "day") =>
		`https://api.imgur.com/3/gallery/${a}/${b}/${c}/${d}?album_previews=true&mature=true`
};
export default settings;
