export type BookInterface = {
    id: number;
    title: string;
    writer: string;
    coverImage: string | null;
    point: number;
    tags: string[];
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}