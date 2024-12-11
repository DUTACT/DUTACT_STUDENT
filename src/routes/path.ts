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
    link: (id: number, postId?: number, feedbackId?: number) => {
      const queryParams = new URLSearchParams()
      if (postId) queryParams.append('postId', postId.toString())
      if (feedbackId) queryParams.append('feedbackId', feedbackId.toString())
      return `/event/${id}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    }
  },
  notification: '/notification'
}
