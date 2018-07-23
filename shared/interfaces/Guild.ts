export interface IGuild {
    name?: string;
    gid: string;
    options: {
        channels: {
            log?: string,
            default?: string,
            commands?: string,
        },
        prefix?: string
    };
    updatedAt?: Date;
}
