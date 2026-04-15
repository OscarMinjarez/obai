import { Injectable } from "@nestjs/common";
import { EntitiesService } from "../entities.service";
import { BaseRepository } from "./base.repository";
import { UserEntity } from "./user/user.entity";

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
    constructor(entitiesService: EntitiesService) {
        super(entitiesService, 'user');
    }

    async findByEmail(email: string) {
        return this.entityService.user.findUnique({ where: { email } });
    }
}
