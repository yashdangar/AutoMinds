import { Connection } from "./types";

export const CONNECTIONS: Connection[] = [
    {
      title: 'Google Drive',
      description: 'Connect your google drive to listen to folder changes',
      image: '/googleDrive.png'
    },
    {
        title: 'G-Mail',
        description: 'Connect your google mail to send / recieve to mails on particular events',
        image: '/gmail.png'
    },
    {
      title: 'Discord',
      description: 'Connect your discord to send notification and messages',
      image: '/discord.png'
    },
    {
      title: 'Notion',
      description: 'Create entries in your notion dashboard and automate tasks.',
      image: '/notion.png',
    },
    {
      title: 'Slack',
      description:
        'Use slack to send notifications to team members through your own custom bot.',
      image: '/slack.png'
    },
    {
      title: 'Github',
      description:
        'Use github to check for multiple things like PRs, issues, etc.',
      image: '/github.png'
    }
]