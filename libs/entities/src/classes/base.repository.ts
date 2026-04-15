import { EntitiesService } from "../entities.service";

export abstract class BaseRepository<T> {
    
    constructor(
        protected readonly entityService: EntitiesService,
        protected readonly model: string
    ) {}

    async findAll(): Promise<T[]> {
        return this.entityService[this.model].findMany();
    }

    async findById(id: string): Promise<T> {
        return this.entityService[this.model].findUnique({ where: { id } });
    }

    async create(data: T): Promise<T> {
        return this.entityService[this.model].create({ data });
    }

    async update(id: string, data: T): Promise<T> {
        return this.entityService[this.model].update({ where: { id }, data });
    }

    async delete(id: string): Promise<T> {
        return this.entityService[this.model].delete({ where: { id } });
    }
}