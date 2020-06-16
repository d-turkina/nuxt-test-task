import Cookies from 'js-cookie';

export default ({ $axios, req, redirect }) => {
	let token;
	
	if (process.server) {
		const cookieString = req.headers.cookie || '';
		const tokenCookie = cookieString.split(';').map(c => c.trim()).find(c => c.startsWith('token='));
		
		token = tokenCookie && tokenCookie.split('=')[1];
	} else {
		token = Cookies.get('token');
	}
	
	if (!token) {
		return redirect('/login');
	}
	
	return $axios.get(`/auth/init`, { headers: { 'Authorization': `Bearer ${token}` } })
	.catch(() => redirect('/login'));
}