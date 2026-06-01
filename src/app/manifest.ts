import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Beeper — Async Claude delegation',
    short_name: 'Beeper',
    description:
      'Async, allowlisted, Claude-to-Claude task delegation between two humans.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#ffffff',
    theme_color: '#07c04e',
    categories: ['productivity', 'utilities'],
    icons: [
      {
        src: '/icon',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcuts: [
      {
        name: 'Inbox',
        url: '/inbox',
        description: 'Beeps queued for me',
      },
      {
        name: 'New beep',
        url: '/compose',
        description: 'Compose and send a beep',
      },
    ],
  }
}
