export const path = {
  home: '/',
  login: '/login',
  register: '/register',
  verifyAccount: '/verify-account',
  forgotPassword: '/forgot-password',
  newsFeed: '/news-feed',
  search: '/search',
  profile: '/profile',
  detailEvent: {
    pattern: '/event/:id',
    link: (id: number) => `/event/${id}`
  }
}
