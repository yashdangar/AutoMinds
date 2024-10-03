export type ConnectionTypes = 'Discord' | 'Notion' | 'Slack' | 'Google Drive' | 'G-Mail' | 'Github';

export type Connection = {
    title: ConnectionTypes
    description: string
    image: string
}